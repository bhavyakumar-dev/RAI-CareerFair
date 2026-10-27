(() => {
  const { el, loadScript, mount, Points } = RAI;

  const PLAN = {
    stages: {
      'Class 8 to 10': [
        'Keep maths and science strong. Practise algebra, geometry and basic physics every week.',
        'Learn Python basics: variables, loops and functions. Finish one small program a week.'
      ],
      'Class 11 and 12': [
        'Choose your entrance route (JEE Main, JEE Advanced, BITSAT or a state CET) and take a weekly mock.',
        'Start calculus and linear algebra early. Both appear in every robotics and AI course.'
      ],
      College: [
        'Join a lab or club in your first semester and ask for a small part of a project.',
        'Aim for one internship or research project before the end of your second year.'
      ],
      'Still exploring': [
        'Try one tiny robotics project and one tiny AI project, then keep the one you lose track of time in.',
        'Ask one working engineer or senior student what a normal day looks like.'
      ]
    },
    fields: {
      Robotics: [
        'Build a line-following or obstacle-avoiding robot and log every failure.',
        'Learn how a PID controller works, then tune one in a simulator.',
        'Run a simulated robot with a ROS 2 tutorial.'
      ],
      AI: [
        'Train a small image classifier on photos you take yourself.',
        'Finish one free machine learning course, including every exercise.',
        'Write down three ways your model fails and test a fix for one.'
      ],
      Research: [
        'Read one short paper a week and write three lines on what it claims.',
        'Reproduce a small result from a paper, even a simple one.',
        'Learn enough probability to explain overfitting in your own words.'
      ],
      Hardware: [
        'Blink an LED, then read a sensor, then show the reading on a screen.',
        'Learn what a microcontroller does in one clock cycle, in plain words.',
        'Measure how long your project runs on one battery, then try to double it.'
      ]
    },
    kits: {
      'Phone only': 'Use free simulators and browser tools, and film your experiments.',
      Laptop: 'Install Python and run notebooks on your own machine.',
      'Arduino or ESP32 kit': 'Start with the sensor examples that come with the kit.',
      'Robot kit or 3D printer': 'Design one custom part and test it on the robot.'
    },
    pace: { '1 to 2 hours': 4, '3 to 4 hours': 2, '5 to 7 hours': 1, '8 or more hours': 1 }
  };

  const picker = (label, options) => {
    const select = el('select', { 'aria-label': label }, ...options.map((option) => el('option', { value: option, textContent: option })));
    return { select, field: el('label', { className: 'field' }, label, select) };
  };

  mount('plan', (root) => {
    const career = picker('Career to explore', RAI.careers.map((entry) => entry[0]));
    const stage = picker('Your stage', Object.keys(PLAN.stages));
    const hours = picker('Time each week', Object.keys(PLAN.pace));
    const kit = picker('What you have', Object.keys(PLAN.kits));
    const output = el('div', { className: 'panel', hidden: true });
    const status = el('p', { className: 'note' });

    const build = () => {
      const field = RAI.careers.find((entry) => entry[0] === career.select.value)[1];
      const weeks = PLAN.pace[hours.select.value];
      const steps = [...PLAN.stages[stage.select.value], PLAN.kits[kit.select.value], ...PLAN.fields[field]];
      const text = steps.map((step, index) => `${index + 1}. ${step}`).join('\n');
      const copy = el('button', {
        className: 'btn alt', type: 'button', textContent: 'Copy plan',
        onclick: () => navigator.clipboard.writeText(text).then(() => { status.textContent = 'Copied.'; }, () => { status.textContent = 'Copy is blocked in this browser. Select the text instead.'; })
      });
      output.replaceChildren(
        el('h3', {}, `Your plan for ${career.select.value}`),
        el('p', { className: 'note' }, `At ${hours.select.value} a week, aim for one milestone every ${weeks === 1 ? 'week' : `${weeks} weeks`}.`),
        el('ol', { className: 'steps' }, ...steps.map((step) => el('li', {}, el('label', { className: 'switch' }, el('input', { type: 'checkbox' }), step)))),
        copy
      );
      output.hidden = false;
      Points.add('plan', 10);
    };

    root.append(
      el('div', { className: 'form-grid' }, career.field, stage.field, hours.field, kit.field),
      el('button', { className: 'btn', type: 'button', textContent: 'Build my roadmap', onclick: build }),
      status, output
    );
  });

  const QR_SCRIPT = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js';
  const QR_COLOURS = ['#17191f', '#4a2fd1', '#c23d12', '#0f6b55'];
  const FINDER_COLOURS = ['#17191f', '#4a2fd1', '#c23d12'];

  const roundRect = (ctx, x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  const drawCard = (canvas, address) => {
    const qr = qrcode(0, 'H');
    qr.addData(address);
    qr.make();
    const count = qr.getModuleCount();
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    ctx.fillStyle = '#f4f1e9';
    ctx.fillRect(0, 0, width, height);
    [['#ff6b3d', 90, 70, 150], ['#b5a6ff', 470, 60, 120], ['#c9e5cf', 520, 520, 140], ['#b8d9ed', 30, 560, 110]].forEach(([colour, x, y, r]) => {
      ctx.fillStyle = colour;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = '#17191f';
    ctx.font = '800 34px Syne, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scan to explore robotics and AI', width / 2, 62);

    const panel = 480;
    const panelX = (width - panel) / 2;
    const panelY = 92;
    ctx.fillStyle = '#fffdf7';
    roundRect(ctx, panelX, panelY, panel, panel, 28);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#17191f';
    ctx.stroke();

    const cell = Math.floor((panel - 40) / count);
    const originX = panelX + (panel - cell * count) / 2;
    const originY = panelY + (panel - cell * count) / 2;
    const inFinder = (row, col) => (row < 7 && col < 7 ? 0 : row < 7 && col >= count - 7 ? 1 : row >= count - 7 && col < 7 ? 2 : -1);

    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        if (!qr.isDark(row, col)) continue;
        const finder = inFinder(row, col);
        const x = originX + col * cell;
        const y = originY + row * cell;
        if (finder >= 0) {
          ctx.fillStyle = FINDER_COLOURS[finder];
          ctx.fillRect(x, y, cell, cell);
        } else {
          ctx.fillStyle = QR_COLOURS[(row * 3 + col * 5) % QR_COLOURS.length];
          ctx.beginPath();
          ctx.arc(x + cell / 2, y + cell / 2, cell * 0.46, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const centreX = width / 2;
    const centreY = panelY + panel / 2;
    const logo = cell * count * 0.105;
    ctx.fillStyle = '#fffdf7';
    ctx.beginPath();
    ctx.arc(centreX, centreY, logo + cell * 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#17191f';
    ctx.beginPath();
    ctx.arc(centreX, centreY, logo, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff6b3d';
    ctx.font = `800 ${Math.round(logo * 1.25)}px Syne, sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.fillText('R', centreX, centreY + 2);

    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#17191f';
    ctx.font = '600 20px "DM Sans", sans-serif';
    const label = address.length > 46 ? `${address.slice(0, 43)}...` : address;
    ctx.fillText(label, width / 2, panelY + panel + 52);
    ctx.font = '500 16px "DM Sans", sans-serif';
    ctx.fillText('Robotics and AI Lab', width / 2, panelY + panel + 82);
  };

  mount('share', (root) => {
    const canvas = el('canvas', { className: 'qr', width: 600, height: 700 });
    const input = el('input', { value: location.href.split('#')[0], 'aria-label': 'Address for the QR code', maxLength: 200 });
    const status = el('p', { className: 'note' }, 'Use the final live address before you print this.');
    const redraw = async () => {
      if (!input.value.trim()) { status.textContent = 'Enter an address first.'; return; }
      try {
        await loadScript(QR_SCRIPT);
        drawCard(canvas, input.value.trim());
        status.textContent = 'Ready. Test it with your phone before printing.';
      } catch (error) {
        status.textContent = `Could not make the code: ${error.message}`;
      }
    };
    const download = () => canvas.toBlob((blob) => {
      const link = el('a', { href: URL.createObjectURL(blob), download: 'robotics-ai-qr.png' });
      link.click();
      URL.revokeObjectURL(link.href);
    });
    input.addEventListener('change', redraw);
    root.append(
      canvas,
      el('label', { className: 'field' }, 'Address', input),
      el('div', { className: 'row' },
        el('button', { className: 'btn', type: 'button', textContent: 'Update code', onclick: redraw }),
        el('button', { className: 'btn alt', type: 'button', textContent: 'Download PNG', onclick: download }),
        el('button', {
          className: 'btn alt', type: 'button', textContent: 'Copy link',
          onclick: () => navigator.clipboard.writeText(input.value).then(() => { status.textContent = 'Copied.'; }, () => { status.textContent = 'Copy is blocked in this browser.'; })
        })),
      status
    );
    redraw();
  });
})();
