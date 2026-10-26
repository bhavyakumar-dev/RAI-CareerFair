const fs = require('fs');
const path = require('path');

const v2Content = fs.readFileSync(path.join(__dirname, 'public', 'v2.html'), 'utf-8');

// Replace Title
let v3Content = v2Content.replace(
  '<title>ROBOVERSE v2 — Secure Dataset Vault & Robot Kinematics</title>',
  '<title>ROBOVERSE v3 — Teachable Vision Studio & Edge AI</title>'
);

// Update Header Version Badge and Links
v3Content = v3Content.replace(
  '<button class="version-badge-btn" id="versionBadgeBtn" type="button" aria-expanded="false" aria-label="Select Suite Edition">v2 ▾</button>',
  '<button class="version-badge-btn" id="versionBadgeBtn" type="button" aria-expanded="false" aria-label="Select Suite Edition">v3 ▾</button>'
);
v3Content = v3Content.replace(
  '<a href="/v2" class="version-item active" data-v="v2"><b>v2</b> Secure Suite & Kinematics</a>',
  '<a href="/v2" class="version-item" data-v="v2"><b>v2</b> Secure Suite & Kinematics</a>'
);
v3Content = v3Content.replace(
  '<a href="/v3" class="version-item" data-v="v3"><b>v3</b> Teachable Vision Studio</a>',
  '<a href="/v3" class="version-item active" data-v="v3"><b>v3</b> Teachable Vision Studio</a>'
);

// Update Nav Links to include Teachable Studio
v3Content = v3Content.replace(
  '<nav class="nav-links" id="navLinks" aria-label="Main navigation">\n    <a href="#vision">Vision Lab</a>',
  '<nav class="nav-links" id="navLinks" aria-label="Main navigation">\n    <a href="#vision">Vision Lab</a>\n    <a href="#teachable">Teachable Studio</a>'
);

// Include KNN Classifier script in head/scripts
const knnScriptTag = '<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/knn-classifier@1.2.2/dist/knn-classifier.min.js"></script>\n';
v3Content = v3Content.replace(
  '<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js"></script>',
  '<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3/dist/coco-ssd.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/knn-classifier@1.2.2/dist/knn-classifier.min.js"></script>'
);

// Define Teachable Section CSS
const teachableStyles = `
/* Teachable Vision Studio Styles */
.teachable-sec { padding: clamp(48px, 7vh, 84px) 0; border-top: 1px solid var(--line); background: var(--paper); }
.teachable-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 32px; }
@media (max-width: 900px) { .teachable-grid { grid-template-columns: 1fr; } }
.teachable-monitor { background: var(--dark); border-radius: 18px; padding: 22px; color: #fff; box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 16px; }
.monitor-viewport { position: relative; width: 100%; aspect-ratio: 4/3; background: #0c1412; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.monitor-viewport video, .monitor-viewport canvas { width: 100%; height: 100%; object-fit: cover; }
.monitor-overlay-hud { position: absolute; inset: 0; pointer-events: none; border: 1px dashed rgba(201,243,106,0.3); display: flex; flex-direction: column; justify-content: space-between; padding: 12px; }
.hud-corner { display: flex; justify-content: space-between; font-family: var(--mono); font-size: 11px; color: var(--lime); }
.hud-pred-pill { background: rgba(0,0,0,0.75); border: 1px solid var(--lime); color: var(--lime); border-radius: 8px; padding: 8px 14px; font-weight: 700; align-self: flex-start; backdrop-filter: blur(8px); display: flex; align-items: center; gap: 8px; }
.hud-pred-pill .pulsing-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--lime); animation: pulseDot 1s infinite alternate; }
@keyframes pulseDot { from { transform: scale(0.8); opacity: 0.6; } to { transform: scale(1.3); opacity: 1; } }

.gauge-wrap { display: flex; flex-direction: column; gap: 6px; }
.gauge-meta { display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; }
.gauge-bar-track { height: 12px; border-radius: 999px; background: rgba(255,255,255,0.1); overflow: hidden; position: relative; }
.gauge-bar-fill { height: 100%; width: 0%; border-radius: 999px; background: linear-gradient(90deg, var(--blue), var(--lime)); transition: width 0.15s ease-out; }

.hardware-led-row { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; background: rgba(255,255,255,0.05); padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); }
.led-node { display: flex; flex-direction: column; align-items: center; gap: 4px; font-family: var(--mono); font-size: 10px; color: #a4b2a8; }
.led-bulb { width: 14px; height: 14px; border-radius: 50%; background: #33443c; border: 1px solid rgba(255,255,255,0.2); transition: all 0.15s ease; }
.led-node.active .led-bulb { background: var(--lime); box-shadow: 0 0 12px var(--lime); border-color: #fff; }
.led-node.active { color: #fff; font-weight: bold; }

.terminal-readout { background: #080f0d; border-radius: 8px; padding: 10px 14px; font-family: var(--mono); font-size: 11px; color: #7ee0b4; border: 1px solid rgba(126,224,180,0.2); min-height: 44px; display: flex; align-items: center; }

.teachable-deck { display: flex; flex-direction: column; gap: 14px; }
.port-card { background: var(--white); border: 1px solid var(--line); border-radius: 14px; padding: 14px 18px; display: grid; grid-template-columns: 1.2fr 1fr auto; align-items: center; gap: 14px; transition: border-color 0.2s; }
.port-card.active-port { border-color: var(--blue); box-shadow: 0 4px 14px rgba(40,79,232,0.15); }
.port-label-box { display: flex; flex-direction: column; gap: 4px; }
.port-title { font-size: 13px; font-weight: 800; display: flex; align-items: center; gap: 6px; }
.port-input { border: 1px solid var(--line); border-radius: 6px; padding: 4px 8px; font-size: 12px; background: var(--paper); }
.port-samples-badge { font-family: var(--mono); font-size: 11px; color: var(--muted); background: rgba(0,0,0,0.05); padding: 2px 8px; border-radius: 999px; align-self: flex-start; }
.port-actions { display: flex; align-items: center; gap: 8px; }
.train-hold-btn { background: var(--blue); color: #fff; border: 0; border-radius: 8px; padding: 8px 14px; font-size: 12px; font-weight: 700; user-select: none; transition: transform 0.1s, background 0.1s; display: inline-flex; align-items: center; gap: 6px; }
.train-hold-btn:active, .train-hold-btn.training { background: var(--orange); transform: scale(0.96); box-shadow: 0 0 10px var(--orange); }
.clear-port-btn { background: transparent; border: 1px solid var(--line); border-radius: 6px; padding: 6px 10px; font-size: 11px; color: var(--muted); }
.clear-port-btn:hover { background: #fee2e2; color: #dc2626; border-color: #fca5a5; }

.model-io-bar { display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap; }
`;

v3Content = v3Content.replace('</style>', `${teachableStyles}\n</style>`);

// Define Teachable Section HTML
const teachableHtml = `
<!-- v3 Teachable Vision Studio Section -->
<section class="teachable-sec" id="teachable">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="note-label">WitBlox Edge AI Framework</span>
        <h2>Train in Browser.<br>Deploy to Hardware.</h2>
      </div>
      <p>Train custom visual models in real time using MobileNet activation embeddings and KNN transfer learning. Mapped directly to 6 hardware control ports for robotics actuators.</p>
    </div>

    <div class="teachable-grid">
      <!-- Left: Real-time Monitor & Hardware Bus -->
      <div class="teachable-monitor">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <h3 style="margin:0;font-size:16px;">Live Inference & Bus Telemetry</h3>
          <span style="font-size:11px;font-family:var(--mono);color:var(--lime);">STATUS: STREAM ACTIVE</span>
        </div>

        <div class="monitor-viewport">
          <video id="teachableVideo" autoplay playsinline muted></video>
          <canvas id="teachableCanvas" style="position:absolute;inset:0;pointer-events:none;"></canvas>
          <div class="monitor-overlay-hud">
            <div class="hud-corner">
              <span>RES: 640x480</span>
              <span id="hudFps">30.0 FPS</span>
            </div>
            <div class="hud-pred-pill" id="hudPredPill">
              <span class="pulsing-dot"></span>
              <span id="hudPredText">Awaiting trained examples...</span>
            </div>
          </div>
        </div>

        <!-- Confidence Gauge -->
        <div class="gauge-wrap">
          <div class="gauge-meta">
            <span>Prediction Confidence</span>
            <span id="gaugePct">0%</span>
          </div>
          <div class="gauge-bar-track">
            <div class="gauge-bar-fill" id="gaugeFill"></div>
          </div>
        </div>

        <!-- Virtual Hardware Port Output LEDs -->
        <div>
          <div style="font-size:12px;font-weight:700;margin-bottom:6px;display:flex;justify-content:space-between;">
            <span>WitBlox Hardware GPIO Output States</span>
            <span style="color:#7ee0b4;font-size:11px;font-family:var(--mono);">BAUD: 115200</span>
          </div>
          <div class="hardware-led-row">
            <div class="led-node" id="led-0"><div class="led-bulb"></div><span>PORT 1</span></div>
            <div class="led-node" id="led-1"><div class="led-bulb"></div><span>PORT 2</span></div>
            <div class="led-node" id="led-2"><div class="led-bulb"></div><span>PORT 3</span></div>
            <div class="led-node" id="led-3"><div class="led-bulb"></div><span>PORT 4</span></div>
            <div class="led-node" id="led-4"><div class="led-bulb"></div><span>RED 1</span></div>
            <div class="led-node" id="led-5"><div class="led-bulb"></div><span>RED 2</span></div>
          </div>
        </div>

        <!-- Serial Terminal Readout -->
        <div class="terminal-readout" id="serialTerminal">
          &gt; SERIAL READY. Hold button to train Port 1-4 or Reducer 1-2.
        </div>

        <!-- Camera Start / Stop & Weights Export/Import -->
        <div class="model-io-bar">
          <button class="button lime small" id="startTeachableCam">Turn on Camera</button>
          <button class="button paper small" id="exportWeightsBtn">Export Weights (JSON)</button>
          <button class="button paper small" id="importWeightsBtn">Import Weights</button>
          <input type="file" id="weightsFileInput" accept=".json" style="display:none;">
          <button class="button paper small" id="resetAllBtn" style="color:#ef4444;">Reset All</button>
        </div>
      </div>

      <!-- Right: 6-Port Training Deck -->
      <div class="teachable-deck">
        <!-- Port 1 -->
        <div class="port-card" id="portCard-0">
          <div class="port-label-box">
            <div class="port-title"><span style="color:var(--blue)">●</span> Port 1 (inp1)</div>
            <input class="port-input" id="label-0" value="Gesture: Wave / Item A">
            <span class="port-samples-badge" id="badge-0">0 samples</span>
          </div>
          <div class="port-actions">
            <button class="train-hold-btn" data-class="0" id="train-0"><span>📷</span> Hold to Train</button>
            <button class="clear-port-btn" data-class="0" id="clear-0">Clear</button>
          </div>
        </div>

        <!-- Port 2 -->
        <div class="port-card" id="portCard-1">
          <div class="port-label-box">
            <div class="port-title"><span style="color:var(--orange)">●</span> Port 2 (inp2)</div>
            <input class="port-input" id="label-1" value="Gesture: Thumbs Up / Item B">
            <span class="port-samples-badge" id="badge-1">0 samples</span>
          </div>
          <div class="port-actions">
            <button class="train-hold-btn" data-class="1" id="train-1"><span>📷</span> Hold to Train</button>
            <button class="clear-port-btn" data-class="1" id="clear-1">Clear</button>
          </div>
        </div>

        <!-- Port 3 -->
        <div class="port-card" id="portCard-2">
          <div class="port-label-box">
            <div class="port-title"><span style="color:#10b981)">●</span> Port 3 (inp3)</div>
            <input class="port-input" id="label-2" value="Gesture: Peace Sign / Item C">
            <span class="port-samples-badge" id="badge-2">0 samples</span>
          </div>
          <div class="port-actions">
            <button class="train-hold-btn" data-class="2" id="train-2"><span>📷</span> Hold to Train</button>
            <button class="clear-port-btn" data-class="2" id="clear-2">Clear</button>
          </div>
        </div>

        <!-- Port 4 -->
        <div class="port-card" id="portCard-3">
          <div class="port-label-box">
            <div class="port-title"><span style="color:#ec4899)">●</span> Port 4 (inp4)</div>
            <input class="port-input" id="label-3" value="Gesture: Open Palm / Item D">
            <span class="port-samples-badge" id="badge-3">0 samples</span>
          </div>
          <div class="port-actions">
            <button class="train-hold-btn" data-class="3" id="train-3"><span>📷</span> Hold to Train</button>
            <button class="clear-port-btn" data-class="3" id="clear-3">Clear</button>
          </div>
        </div>

        <!-- Reducer 1 -->
        <div class="port-card" id="portCard-4">
          <div class="port-label-box">
            <div class="port-title"><span style="color:#eab308)">●</span> Reducer 1 (inp5)</div>
            <input class="port-input" id="label-4" value="Trim: Slow Speed (50%)">
            <span class="port-samples-badge" id="badge-4">0 samples</span>
          </div>
          <div class="port-actions">
            <button class="train-hold-btn" data-class="4" id="train-4"><span>📷</span> Hold to Train</button>
            <button class="clear-port-btn" data-class="4" id="clear-4">Clear</button>
          </div>
        </div>

        <!-- Reducer 2 -->
        <div class="port-card" id="portCard-5">
          <div class="port-label-box">
            <div class="port-title"><span style="color:#ef4444)">●</span> Reducer 2 (inp6)</div>
            <input class="port-input" id="label-5" value="Safety: Emergency Halt">
            <span class="port-samples-badge" id="badge-5">0 samples</span>
          </div>
          <div class="port-actions">
            <button class="train-hold-btn" data-class="5" id="train-5"><span>📷</span> Hold to Train</button>
            <button class="clear-port-btn" data-class="5" id="clear-5">Clear</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

// Insert Teachable Section right after the Vision Workbench section
v3Content = v3Content.replace('</section>\n\n<section class="gesture-arena"', `</section>\n\n${teachableHtml}\n\n<section class="gesture-arena"`);

// Define Teachable JavaScript logic
const teachableScript = `
// ==========================================
// WitBlox KNN Classifier & Teachable Studio
// ==========================================
let knn = null;
let teachableStream = null;
let teachableLoopActive = false;
const portSampleCounts = [0, 0, 0, 0, 0, 0];
let trainInterval = null;

async function initKNN() {
  if (!knn && typeof knnClassifier !== 'undefined') {
    knn = knnClassifier.create();
  }
}

async function startTeachableCamera() {
  await ensureVisionModels();
  await initKNN();
  const v = $('#teachableVideo');
  if (teachableStream) {
    teachableStream.getTracks().forEach(t => t.stop());
  }
  try {
    teachableStream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
      audio: false
    });
    v.srcObject = teachableStream;
    await v.play();
    $('#startTeachableCam').textContent = 'Camera Active';
    $('#startTeachableCam').classList.add('paper');
    $('#startTeachableCam').classList.remove('lime');
    teachableLoopActive = true;
    runTeachableLoop();
    toast('Teachable Vision camera online.');
  } catch (err) {
    console.error('Camera error:', err);
    toast('Could not access camera for Teachable Studio: ' + err.message);
  }
}
$('#startTeachableCam').onclick = startTeachableCamera;

function addExample(classId) {
  const v = $('#teachableVideo');
  if (!v || !v.videoWidth || !mobilenetModel || !knn) return;
  try {
    const logits = mobilenetModel.infer(v, true);
    knn.addExample(logits, classId);
    logits.dispose();
    portSampleCounts[classId]++;
    $('#badge-' + classId).textContent = portSampleCounts[classId] + ' samples';
    $('#serialTerminal').textContent = '> SAMPLE CAPTURED for ' + ($('#label-' + classId)?.value || 'Class ' + classId) + ' (Total: ' + portSampleCounts[classId] + ')';
  } catch (e) {
    console.error('Add example error:', e);
  }
}

// Hold to train listeners
for (let i = 0; i < 6; i++) {
  const btn = $('#train-' + i);
  if (!btn) continue;
  
  const startTrain = (e) => {
    e.preventDefault();
    if (!teachableStream) {
      startTeachableCamera().then(() => {
        btn.classList.add('training');
        addExample(i);
        trainInterval = setInterval(() => addExample(i), 120);
      });
      return;
    }
    btn.classList.add('training');
    addExample(i);
    clearInterval(trainInterval);
    trainInterval = setInterval(() => addExample(i), 120);
  };

  const stopTrain = () => {
    btn.classList.remove('training');
    clearInterval(trainInterval);
  };

  btn.addEventListener('mousedown', startTrain);
  btn.addEventListener('mouseup', stopTrain);
  btn.addEventListener('mouseleave', stopTrain);
  btn.addEventListener('touchstart', startTrain, { passive: false });
  btn.addEventListener('touchend', stopTrain);

  $('#clear-' + i).onclick = () => {
    if (knn) {
      try { knn.clearClass(i); } catch(e){}
    }
    portSampleCounts[i] = 0;
    $('#badge-' + i).textContent = '0 samples';
    $('#portCard-' + i).classList.remove('active-port');
    $('#led-' + i).classList.remove('active');
    toast('Cleared samples for Port ' + (i < 4 ? (i + 1) : ('Reducer ' + (i - 3))));
  };
}

$('#resetAllBtn').onclick = () => {
  if (knn) {
    try { knn.clearAllClasses(); } catch(e){}
  }
  for (let i = 0; i < 6; i++) {
    portSampleCounts[i] = 0;
    $('#badge-' + i).textContent = '0 samples';
    $('#portCard-' + i).classList.remove('active-port');
    $('#led-' + i).classList.remove('active');
  }
  $('#gaugePct').textContent = '0%';
  $('#gaugeFill').style.width = '0%';
  $('#hudPredText').textContent = 'Awaiting trained examples...';
  toast('Classifier reset to initial state.');
};

// Export Weights
$('#exportWeightsBtn').onclick = () => {
  if (!knn || knn.getNumClasses() === 0) {
    toast('No trained samples to export yet.');
    return;
  }
  const dataset = knn.getClassifierDataset();
  const datasetObj = {};
  Object.keys(dataset).forEach(key => {
    const data = dataset[key].dataSync();
    datasetObj[key] = {
      data: Array.from(data),
      shape: dataset[key].shape
    };
  });
  const labels = [0,1,2,3,4,5].map(i => $('#label-' + i)?.value || 'Class ' + i);
  const blob = new Blob([JSON.stringify({ dataset: datasetObj, labels, counts: portSampleCounts }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'witblox-trained-model.json';
  a.click();
  toast('Trained classifier weights exported as JSON.');
};

// Import Weights
$('#importWeightsBtn').onclick = () => $('#weightsFileInput').click();
$('#weightsFileInput').onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (ev) => {
    try {
      const parsed = JSON.parse(ev.target.result);
      await initKNN();
      const tensorObj = {};
      Object.keys(parsed.dataset).forEach(key => {
        tensorObj[key] = tf.tensor(parsed.dataset[key].data, parsed.dataset[key].shape);
      });
      knn.setClassifierDataset(tensorObj);
      if (parsed.counts) {
        for (let i = 0; i < 6; i++) {
          portSampleCounts[i] = parsed.counts[i] || 0;
          $('#badge-' + i).textContent = portSampleCounts[i] + ' samples';
        }
      }
      if (parsed.labels) {
        for (let i = 0; i < 6; i++) {
          if (parsed.labels[i] && $('#label-' + i)) $('#label-' + i).value = parsed.labels[i];
        }
      }
      toast('WitBlox model weights loaded successfully!');
    } catch(err) {
      toast('Failed to parse weights JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
};

// Real-time Prediction Loop
async function runTeachableLoop() {
  if (!teachableLoopActive) return;
  const v = $('#teachableVideo');
  if (v && v.readyState >= 2 && mobilenetModel && knn && knn.getNumClasses() > 0) {
    try {
      const logits = mobilenetModel.infer(v, true);
      const res = await knn.predictClass(logits);
      logits.dispose();

      const conf = Math.round((res.confidences[res.label] || 0) * 100);
      const labelIdx = parseInt(res.label, 10);
      const labelText = $('#label-' + labelIdx)?.value || 'Class ' + labelIdx;

      $('#gaugePct').textContent = conf + '%';
      $('#gaugeFill').style.width = conf + '%';

      if (conf > 40) {
        $('#hudPredText').textContent = labelText + ' (' + conf + '%)';
        // Highlight active port card and LED
        for (let i = 0; i < 6; i++) {
          const isActive = (i === labelIdx && conf >= 60);
          $('#portCard-' + i).classList.toggle('active-port', isActive);
          $('#led-' + i).classList.toggle('active', isActive);
        }
        if (conf >= 60) {
          const portName = labelIdx < 4 ? ('PORT ' + (labelIdx + 1)) : ('REDUCER ' + (labelIdx - 3));
          $('#serialTerminal').textContent = '> TX: [' + portName + ' HIGH] ' + labelText + ' | Conf: ' + conf + '%';
        }
      } else {
        $('#hudPredText').textContent = 'Uncertain (<40% conf)';
        for (let i = 0; i < 6; i++) {
          $('#portCard-' + i).classList.remove('active-port');
          $('#led-' + i).classList.remove('active');
        }
      }
    } catch(err) {
      console.error('Inference error:', err);
    }
  }
  requestAnimationFrame(runTeachableLoop);
}
`;

v3Content = v3Content.replace('// Load saved vault on boot', `${teachableScript}\n\n// Load saved vault on boot`);

fs.writeFileSync(path.join(__dirname, 'public', 'v3.html'), v3Content, 'utf-8');
console.log('Successfully created public/v3.html, size: ' + fs.statSync(path.join(__dirname, 'public', 'v3.html')).size + ' bytes');

// Also create public/v3/index.html
const v3Dir = path.join(__dirname, 'public', 'v3');
if (!fs.existsSync(v3Dir)) fs.mkdirSync(v3Dir, { recursive: true });
fs.writeFileSync(path.join(v3Dir, 'index.html'), v3Content, 'utf-8');
console.log('Successfully created public/v3/index.html');
