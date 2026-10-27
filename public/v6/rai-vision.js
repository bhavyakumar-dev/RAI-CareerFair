(() => {
  const { el, Points, loadScript, mount } = RAI;

  const CDN = 'https://cdn.jsdelivr.net/npm/';
  const TF_SCRIPTS = [
    `${CDN}@tensorflow/tfjs@4.22.0/dist/tf.min.js`,
    `${CDN}@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js`,
    `${CDN}@tensorflow-models/knn-classifier@1.2.6/dist/knn-classifier.min.js`
  ];
  const COCO_SCRIPTS = [`${CDN}@tensorflow/tfjs@4.22.0/dist/tf.min.js`, `${CDN}@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js`];
  const FACE_SCRIPT = `${CDN}@vladmandic/face-api@1.7.13/dist/face-api.js`;
  const FACE_MODELS = `${CDN}@vladmandic/face-api@1.7.13/model/`;
  const ORT_BASE = `${CDN}onnxruntime-web@1.17.1/dist/`;
  const OPENCV = 'https://docs.opencv.org/4.x/opencv.js';
  const YOLO_CANDIDATES = [
    '/models/yolov8n.onnx',
    '../models/yolov8n.onnx',
    './models/yolov8n.onnx',
    'models/yolov8n.onnx',
    '/yolov8n.onnx',
    './yolov8n.onnx',
    '../v6/yolov8n.onnx',
    'v6/yolov8n.onnx'
  ];
  let activeYoloUrl = null;
  const YOLO_SIZE = 640;
  const COCO = ('person bicycle car motorcycle airplane bus train truck boat traffic-light fire-hydrant stop-sign parking-meter bench bird cat dog horse sheep cow elephant bear zebra giraffe backpack umbrella handbag tie suitcase frisbee skis snowboard sports-ball kite baseball-bat baseball-glove skateboard surfboard tennis-racket bottle wine-glass cup fork knife spoon bowl banana apple sandwich orange broccoli carrot hot-dog pizza donut cake chair couch potted-plant bed dining-table toilet tv laptop mouse remote keyboard cell-phone microwave oven toaster sink refrigerator book clock vase scissors teddy-bear hair-drier toothbrush')
    .split(' ').map((name) => name.replace(/-/g, ' '));

  const loadAll = async (urls) => { for (const url of urls) await loadScript(url); };

  let liveCamera = null;
  const makeCamera = (video) => ({
    stream: null,
    get on() { return this.stream !== null; },
    async start() {
      liveCamera?.stop();
      this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 } }, audio: false });
      video.srcObject = this.stream;
      video.muted = true;
      video.playsInline = true;
      await video.play();
      liveCamera = this;
    },
    stop() {
      this.stream?.getTracks().forEach((track) => track.stop());
      this.stream = null;
      video.srcObject = null;
      if (liveCamera === this) liveCamera = null;
    }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) liveCamera?.stop(); });

  const tint = (label) => {
    let hash = 0;
    for (const char of label) hash = (hash * 31 + char.charCodeAt(0)) % 360;
    return `hsl(${hash} 85% 55%)`;
  };

  const drawBoxes = (canvas, video, boxes) => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = Math.max(3, canvas.width / 160);
    ctx.font = `${Math.max(16, canvas.width / 30)}px sans-serif`;
    boxes.forEach(({ x, y, w, h, text, label }) => {
      ctx.strokeStyle = tint(label);
      ctx.fillStyle = tint(label);
      ctx.strokeRect(x, y, w, h);
      const width = ctx.measureText(text).width + 12;
      ctx.fillRect(x, Math.max(0, y - 26), width, 26);
      ctx.fillStyle = '#fff';
      ctx.fillText(text, x + 6, Math.max(20, y - 6));
    });
  };

  const overlap = (a, b) => {
    const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
    const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    if (w <= 0 || h <= 0) return 0;
    return (w * h) / (a.w * a.h + b.w * b.h - w * h);
  };

  const suppress = (boxes) => {
    const kept = [];
    boxes.sort((a, b) => b.score - a.score).forEach((box) => {
      if (kept.every((other) => other.label !== box.label || overlap(other, box) < 0.5)) kept.push(box);
    });
    return kept;
  };

  const loadYolo = async () => {
    activeYoloUrl = null;
    for (const cand of YOLO_CANDIDATES) {
      try {
        const probe = await fetch(cand, { method: 'HEAD' });
        if (probe && (probe.ok || probe.status === 200 || probe.status === 304)) {
          activeYoloUrl = cand;
          break;
        }
      } catch (e) {}
    }
    if (!activeYoloUrl) return null;
    await loadScript(`${ORT_BASE}ort.min.js`);
    if (window.ort) {
      ort.env.wasm.wasmPaths = ORT_BASE;
      ort.env.wasm.numThreads = 1;
      return await ort.InferenceSession.create(activeYoloUrl, { executionProviders: ['wasm'] });
    }
    return null;
  };

  const runYolo = async (session, video, scratch) => {
    const area = YOLO_SIZE * YOLO_SIZE;
    const ctx = scratch.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(video, 0, 0, YOLO_SIZE, YOLO_SIZE);
    const pixels = ctx.getImageData(0, 0, YOLO_SIZE, YOLO_SIZE).data;
    const input = new Float32Array(3 * area);
    for (let i = 0; i < area; i++) {
      input[i] = pixels[i * 4] / 255;
      input[area + i] = pixels[i * 4 + 1] / 255;
      input[2 * area + i] = pixels[i * 4 + 2] / 255;
    }
    const feeds = { [session.inputNames[0]]: new ort.Tensor('float32', input, [1, 3, YOLO_SIZE, YOLO_SIZE]) };
    const output = (await session.run(feeds))[session.outputNames[0]];
    const anchors = output.dims[2];
    const flat = output.data;
    const sx = video.videoWidth / YOLO_SIZE;
    const sy = video.videoHeight / YOLO_SIZE;
    const found = [];
    for (let i = 0; i < anchors; i++) {
      let score = 0;
      let cls = 0;
      for (let k = 0; k < 80; k++) {
        const value = flat[(4 + k) * anchors + i];
        if (value > score) { score = value; cls = k; }
      }
      if (score < 0.45) continue;
      const w = flat[2 * anchors + i] * sx;
      const h = flat[3 * anchors + i] * sy;
      found.push({ x: flat[i] * sx - w / 2, y: flat[anchors + i] * sy - h / 2, w, h, score, label: COCO[cls] });
    }
    const suppressed = suppress(found).map((box) => ({ ...box, text: `${box.label} ${Math.round(box.score * 100)}%` }));
    if (window.latestDetectionSummary) {
      window.latestDetectionSummary = {
        topLabel: suppressed.length ? suppressed[0].label.toUpperCase() : 'None',
        topConf: suppressed.length ? Math.round(suppressed[0].score * 100) : 0,
        items: suppressed.map(b => ({ class: b.label, score: b.score, bbox: [b.x, b.y, b.w, b.h] }))
      };
    }
    return suppressed;
  };

  mount('trainer', (root) => {
    const video = el('video', { className: 'feed', playsInline: true, muted: true });
    const status = el('p', { className: 'note' }, 'Start the camera, then hold a button while showing each object.');
    const readout = el('p', { className: 'stat' }, 'Waiting for examples.');
    const names = [el('input', { value: 'Object A', maxLength: 14, 'aria-label': 'Name for first object' }),
      el('input', { value: 'Object B', maxLength: 14, 'aria-label': 'Name for second object' })];
    const counts = [0, 0];
    const camera = makeCamera(video);
    let net;
    let classifier;

    const teachButton = (slot) => {
      const button = el('button', { className: 'btn', type: 'button', disabled: true }, 'Hold to teach');
      let timer;
      const stopTeaching = () => clearInterval(timer);
      button.addEventListener('pointerdown', () => {
        timer = setInterval(() => {
          classifier.addExample(net.infer(video, true), names[slot].value || `Object ${slot + 1}`);
          counts[slot] += 1;
          button.textContent = `Hold to teach (${counts[slot]})`;
        }, 100);
      });
      ['pointerup', 'pointerleave', 'pointercancel'].forEach((name) => button.addEventListener(name, stopTeaching));
      return button;
    };
    const teachers = [teachButton(0), teachButton(1)];

    const guessLoop = async () => {
      while (camera.on) {
        if (counts[0] >= 8 && counts[1] >= 8) {
          const activation = net.infer(video, true);
          const { label, confidences } = await classifier.predictClass(activation);
          activation.dispose();
          readout.textContent = `I think this is: ${label} (${Math.round(confidences[label] * 100)}% sure)`;
          Points.add('trainer', Math.min(100, Math.round((counts[0] + counts[1]) / 2)));
        }
        await new Promise((done) => setTimeout(done, 250));
      }
    };

    const toggle = el('button', {
      className: 'btn', type: 'button', textContent: 'Start camera',
      onclick: async () => {
        if (camera.on) {
          camera.stop();
          toggle.textContent = 'Start camera';
          teachers.forEach((button) => { button.disabled = true; });
          return;
        }
        try {
          status.textContent = 'Loading the vision model. This takes a few seconds.';
          await loadAll(TF_SCRIPTS);
          net ??= await mobilenet.load({ version: 2, alpha: 1.0 });
          classifier ??= knnClassifier.create();
          await camera.start();
          teachers.forEach((button) => { button.disabled = false; });
          toggle.textContent = 'Stop camera';
          status.textContent = 'Hold each button while showing that object. Eight examples each is enough to start.';
          guessLoop();
        } catch (error) {
          status.textContent = error.name === 'NotAllowedError' ? 'Camera permission was denied.' : `Could not start: ${error.message}`;
        }
      }
    });

    root.append(
      video,
      el('div', { className: 'row' }, names[0], names[1]),
      el('div', { className: 'row' }, teachers[0], teachers[1]),
      toggle, readout, status,
      el('p', { className: 'note' }, 'Everything runs on this device. No pictures are saved or sent.')
    );
  });

  mount('vision', (root) => {
    const video = el('video', { className: 'feed', playsInline: true, muted: true });
    const overlay = el('canvas', { className: 'overlay' });
    const scratch = el('canvas', { width: YOLO_SIZE, height: YOLO_SIZE });
    const readout = el('p', { className: 'stat' }, 'Pick a mode and press start.');
    const status = el('p', { className: 'note' });
    const consent = el('input', { type: 'checkbox' });
    const camera = makeCamera(video);
    const modes = ['Objects', 'Faces', 'Edges'];
    const trials = [];
    let mode = 'Objects';
    let engines = {};
    let ages = [];
    let guess = null;
    let frozen = null;

    const verdict = el('p', { className: 'stat' });
    const ageInput = el('input', { type: 'number', min: 5, max: 90, placeholder: 'Your real age', 'aria-label': 'Your real age' });
    const summary = el('p', { className: 'note' });
    const correction = el('div', { className: 'panel', hidden: true }, verdict,
      el('div', { className: 'row' }, ageInput,
        el('button', { className: 'btn alt', type: 'button', textContent: 'Gender label was right', onclick: () => record(true) }),
        el('button', { className: 'btn alt', type: 'button', textContent: 'Gender label was wrong', onclick: () => record(false) })),
      summary);

    const record = (labelRight) => {
      const actual = Number(ageInput.value);
      if (!actual) { summary.textContent = 'Enter your real age first.'; return; }
      trials.push({ miss: Math.abs(frozen.age - actual), labelRight });
      const average = trials.reduce((sum, trial) => sum + trial.miss, 0) / trials.length;
      const rightCount = trials.filter((trial) => trial.labelRight).length;
      summary.textContent = `After ${trials.length} check(s): the AI missed age by ${average.toFixed(1)} years on average and got the label right ${rightCount} time(s). Models learn from the photos they were trained on, so they err more on people those photos under-represent. Nothing here is saved.`;
      Points.add('vision', Math.min(100, trials.length * 25));
      correction.hidden = true;
    };

    const lock = el('button', {
      className: 'btn alt', type: 'button', textContent: 'Lock the AI guess', hidden: true,
      onclick: () => {
        if (!guess) { status.textContent = 'Face the camera first.'; return; }
        frozen = { ...guess };
        verdict.textContent = `The AI guessed about ${frozen.age} years and the label "${frozen.gender}". Now tell it the truth.`;
        correction.hidden = false;
      }
    });

    const prepare = async () => {
      if (engines[mode]) return;
      status.textContent = 'Loading the model. This takes a few seconds.';
      if (mode === 'Objects') {
        const yolo = await loadYolo();
        if (yolo) {
          engines.Objects = { kind: 'YOLOv8 (640x640)', session: yolo };
          status.textContent = 'Running YOLOv8 (640x640 Edge Neural Network).';
        } else {
          await loadAll(COCO_SCRIPTS);
          engines.Objects = { kind: 'COCO-SSD', model: await cocoSsd.load() };
          status.textContent = 'Running COCO-SSD (Fallback).';
        }
      } else if (mode === 'Faces') {
        await loadScript(FACE_SCRIPT);
        await Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri(FACE_MODELS), faceapi.nets.ageGenderNet.loadFromUri(FACE_MODELS)]);
        engines.Faces = { kind: 'face-api' };
      } else {
        await loadScript(OPENCV);
        if (window.cv instanceof Promise) window.cv = await window.cv;
        if (!window.cv.Mat) await new Promise((done) => { window.cv.onRuntimeInitialized = done; });
        engines.Edges = { kind: 'OpenCV Canny' };
      }
      status.textContent = `Running ${engines[mode].kind}.`;
    };

    const frame = {
      async Objects() {
        const engine = engines.Objects;
        const boxes = engine.session
          ? await runYolo(engine.session, video, scratch)
          : (await engine.model.detect(video)).map(({ bbox: [x, y, w, h], class: label, score }) => ({ x, y, w, h, label, text: `${label} ${Math.round(score * 100)}%` }));
        drawBoxes(overlay, video, boxes);
        readout.textContent = boxes.length ? `Seen: ${[...new Set(boxes.map((box) => box.label))].join(', ')}` : 'Nothing recognised yet.';
      },
      async Faces() {
        const found = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withAgeAndGender();
        const boxes = found.map(({ detection: { box }, age, gender, genderProbability }) => {
          ages = [...ages.slice(-5), age];
          const smooth = Math.round(ages.reduce((sum, value) => sum + value, 0) / ages.length);
          guess = { age: smooth, gender, confidence: genderProbability };
          return { x: box.x, y: box.y, w: box.width, h: box.height, label: 'face', text: `about ${smooth}, ${gender} ${Math.round(genderProbability * 100)}%` };
        });
        if (!boxes.length) guess = null;
        drawBoxes(overlay, video, boxes);
        readout.textContent = boxes.length ? 'These are guesses and they can be wrong. Lock one to check it.' : 'No face found.';
      },
      async Edges() {
        const ratio = video.videoHeight / video.videoWidth;
        scratch.width = 320;
        scratch.height = Math.round(320 * ratio);
        scratch.getContext('2d').drawImage(video, 0, 0, scratch.width, scratch.height);
        const source = cv.imread(scratch);
        const gray = new cv.Mat();
        cv.cvtColor(source, gray, cv.COLOR_RGBA2GRAY);
        cv.Canny(gray, gray, 80, 160);
        cv.imshow(overlay, gray);
        source.delete();
        gray.delete();
        readout.textContent = 'Classical computer vision: no learning, just maths on pixel changes.';
      }
    };

    const loop = async () => {
      while (camera.on) {
        try {
          await frame[mode]();
        } catch (error) {
          status.textContent = `Frame skipped: ${error.message}`;
        }
        await new Promise((done) => setTimeout(done, 120));
      }
    };

    const modeRow = el('div', { className: 'chips' }, ...modes.map((name) => el('button', {
      className: 'chip', type: 'button', textContent: name, 'aria-pressed': String(name === mode),
      onclick: async (event) => {
        mode = name;
        [...modeRow.children].forEach((chip) => chip.setAttribute('aria-pressed', String(chip.textContent === name)));
        lock.hidden = name !== 'Faces';
        if (!camera.on) return;
        try { await prepare(); } catch (error) { status.textContent = `Could not load: ${error.message}`; }
        event.target.blur();
      }
    })));

    const start = el('button', {
      className: 'btn', type: 'button', textContent: 'Start camera',
      onclick: async () => {
        if (camera.on) {
          camera.stop();
          start.textContent = 'Start camera';
          overlay.getContext('2d').clearRect(0, 0, overlay.width, overlay.height);
          return;
        }
        if (!consent.checked) { status.textContent = 'Tick the box to allow the camera on this device.'; return; }
        try {
          await camera.start();
          await prepare();
          start.textContent = 'Stop camera';
          lock.hidden = mode !== 'Faces';
          loop();
        } catch (error) {
          camera.stop();
          status.textContent = error.name === 'NotAllowedError' ? 'Camera permission was denied.' : `Could not start: ${error.message}`;
        }
      }
    });

    root.append(
      el('label', { className: 'switch' }, consent, 'I allow this page to use my camera. Everything runs on this device. No images are saved or sent.'),
      modeRow,
      el('div', { className: 'stage' }, video, overlay),
      el('div', { className: 'row' },
        start,
        lock,
        el('button', { className: 'btn alt small', type: 'button', textContent: '📺 Big Screen', onclick: () => window.openBigScreen && window.openBigScreen() }),
        el('button', { className: 'btn alt small', type: 'button', textContent: '🛠️ Troubleshoot', onclick: () => window.triggerTroubleshoot && window.triggerTroubleshoot() })
      ),
      readout, correction, status
    );
  });
})();
