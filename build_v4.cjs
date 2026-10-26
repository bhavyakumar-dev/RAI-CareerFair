const fs = require('fs');
const path = require('path');

const v3Content = fs.readFileSync(path.join(__dirname, 'public', 'v3.html'), 'utf-8');

// Replace Title
let v4Content = v3Content.replace(
  '<title>ROBOVERSE v3 — Teachable Vision Studio & Edge AI</title>',
  '<title>ROBOVERSE v4 — Cybernetic Sensor Telemetry & PID Controls</title>'
);

// Update Header Version Badge and Links
v4Content = v4Content.replace(
  '<button class="version-badge-btn" id="versionBadgeBtn" type="button" aria-expanded="false" aria-label="Select Suite Edition">v3 ▾</button>',
  '<button class="version-badge-btn" id="versionBadgeBtn" type="button" aria-expanded="false" aria-label="Select Suite Edition">v4 ▾</button>'
);
v4Content = v4Content.replace(
  '<a href="/v3" class="version-item active" data-v="v3"><b>v3</b> Teachable Vision Studio</a>',
  '<a href="/v3" class="version-item" data-v="v3"><b>v3</b> Teachable Vision Studio</a>'
);
v4Content = v4Content.replace(
  '<a href="/v4" class="version-item" data-v="v4"><b>v4</b> LIDAR Radar & PID Tuner</a>',
  '<a href="/v4" class="version-item active" data-v="v4"><b>v4</b> LIDAR Radar & PID Tuner</a>'
);

// Update Nav Links
v4Content = v4Content.replace(
  '<a href="#teachable">Teachable Studio</a>',
  '<a href="#teachable">Teachable Studio</a>\n    <a href="#cybernetics">LIDAR & PID</a>'
);

// Define Cybernetics CSS
const cyberneticsStyles = `
/* Cybernetics LIDAR & PID Section Styles */
.cyber-sec { padding: clamp(48px, 7vh, 84px) 0; border-top: 1px solid var(--line); background: #0e1715; color: #fff; }
.cyber-sec .note-label { color: var(--lime); }
.cyber-sec .note-label:before { background: var(--lime); }
.cyber-sec h2 { color: #fff; }
.cyber-sec p { color: #b2c2b6; }
.cyber-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 32px; }
@media (max-width: 960px) { .cyber-grid { grid-template-columns: 1fr; } }

.cyber-card { background: #13201c; border: 1px solid rgba(201,243,106,0.2); border-radius: 20px; padding: 24px; display: flex; flex-direction: column; gap: 16px; box-shadow: 0 12px 30px rgba(0,0,0,0.3); }
.cyber-card-head { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; }
.cyber-card-head h3 { margin: 0; font-size: 17px; color: var(--lime); font-weight: 800; }
.cyber-badge { font-family: var(--mono); font-size: 11px; padding: 3px 8px; border-radius: 6px; background: rgba(201,243,106,0.15); color: var(--lime); }

.lidar-canvas-wrap { position: relative; width: 100%; aspect-ratio: 1/1; max-width: 440px; margin: 0 auto; background: #080f0d; border-radius: 50%; overflow: hidden; border: 2px solid #233830; box-shadow: inset 0 0 40px rgba(0,0,0,0.8), 0 0 20px rgba(40,79,232,0.15); }
.lidar-canvas-wrap canvas { width: 100%; height: 100%; display: block; cursor: crosshair; }
.lidar-hud { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); font-family: var(--mono); font-size: 12px; }
.lidar-hud-item { display: flex; flex-direction: column; gap: 2px; }
.lidar-hud-val { font-size: 16px; font-weight: 800; color: #fff; }

.pid-plot-wrap { width: 100%; height: 210px; background: #080f0d; border-radius: 12px; border: 1px solid #233830; overflow: hidden; position: relative; }
.pid-plot-wrap canvas { width: 100%; height: 100%; display: block; }
.pid-controls { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.pid-slider-group { display: flex; flex-direction: column; gap: 6px; }
.pid-slider-label { display: flex; justify-content: space-between; font-size: 12px; font-family: var(--mono); color: #cbd5e1; }
.pid-slider { width: 100%; accent-color: var(--lime); cursor: pointer; }

.pid-stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; font-family: var(--mono); font-size: 11px; background: rgba(255,255,255,0.04); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); }
.pid-stat-box { display: flex; flex-direction: column; gap: 2px; }
.pid-stat-val { font-size: 13px; font-weight: 700; color: var(--lime); }

.presets-bar { display: flex; gap: 8px; flex-wrap: wrap; }
.preset-chip { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #e2e8f0; border-radius: 999px; padding: 5px 12px; font-size: 11px; cursor: pointer; transition: all 0.15s; }
.preset-chip:hover { background: var(--lime); color: #000; border-color: var(--lime); }
`;

v4Content = v4Content.replace('</style>', `${cyberneticsStyles}\n</style>`);

// Define Cybernetics HTML
const cyberneticsHtml = `
<!-- v4 Sensor Telemetry & Cybernetics Section -->
<section class="cyber-sec" id="cybernetics">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="note-label">Autonomous Sensor Telemetry & Cybernetics</span>
        <h2>See the Invisible.<br>Tune the Response.</h2>
      </div>
      <p>Simulate 360-degree LIDAR raycasting with dynamic acoustic sonar pings, and calibrate closed-loop PID motor controllers in real-time right inside your browser.</p>
    </div>

    <div class="cyber-grid">
      <!-- Card 1: 360 LIDAR Radar -->
      <div class="cyber-card">
        <div class="cyber-card-head">
          <h3>360° LIDAR Raycast Radar</h3>
          <span class="cyber-badge" id="lidarScanRate">RPM: 300 | 180 RAYS</span>
        </div>

        <div class="lidar-canvas-wrap">
          <canvas id="lidarCanvas" width="440" height="440"></canvas>
        </div>

        <div class="lidar-hud">
          <div class="lidar-hud-item">
            <span style="color:#94a3b8;">CLOSEST TARGET</span>
            <span class="lidar-hud-val" id="hudClosestDist">-- cm</span>
          </div>
          <div class="lidar-hud-item">
            <span style="color:#94a3b8;">BEARING</span>
            <span class="lidar-hud-val" id="hudBearing">--°</span>
          </div>
          <div class="lidar-hud-item">
            <span style="color:#94a3b8;">COLLISION ZONE</span>
            <span class="lidar-hud-val" id="hudZone" style="color:var(--lime);">CLEAR</span>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;gap:8px;">
            <button class="button small paper" id="toggleSonarAudio" style="background:#1f332c;color:var(--lime);border-color:#2a453c;">🔊 Sonar Audio: ON</button>
            <button class="button small paper" id="randomizeObstacles" style="background:#1f332c;color:#fff;border-color:#2a453c;">Scramble Obstacles</button>
          </div>
          <span style="font-size:11px;color:#94a3b8;font-family:var(--mono);">Click radar to spawn box</span>
        </div>
      </div>

      <!-- Card 2: Interactive PID Motor Controller Tuner -->
      <div class="cyber-card">
        <div class="cyber-card-head">
          <h3>Closed-Loop PID Motor Tuner</h3>
          <span class="cyber-badge">40 Hz CONTROL LOOP</span>
        </div>

        <!-- Oscilloscope Plot -->
        <div class="pid-plot-wrap">
          <canvas id="pidCanvas" width="560" height="210"></canvas>
        </div>

        <!-- Metric Readouts -->
        <div class="pid-stats-row">
          <div class="pid-stat-box">
            <span style="color:#94a3b8;">RISE TIME (tr)</span>
            <span class="pid-stat-val" id="statRise">142 ms</span>
          </div>
          <div class="pid-stat-box">
            <span style="color:#94a3b8;">OVERSHOOT (Mp)</span>
            <span class="pid-stat-val" id="statOvershoot">4.2%</span>
          </div>
          <div class="pid-stat-box">
            <span style="color:#94a3b8;">SETTLING (ts)</span>
            <span class="pid-stat-val" id="statSettling">310 ms</span>
          </div>
          <div class="pid-stat-box">
            <span style="color:#94a3b8;">STEADY ERR</span>
            <span class="pid-stat-val" id="statError">0.0%</span>
          </div>
        </div>

        <!-- PID Sliders -->
        <div class="pid-controls">
          <div class="pid-slider-group">
            <div class="pid-slider-label"><span>Kp (Proportional)</span><b id="valKp">2.40</b></div>
            <input type="range" class="pid-slider" id="sliderKp" min="0" max="6.0" step="0.05" value="2.40">
          </div>
          <div class="pid-slider-group">
            <div class="pid-slider-label"><span>Ki (Integral)</span><b id="valKi">0.15</b></div>
            <input type="range" class="pid-slider" id="sliderKi" min="0" max="1.0" step="0.01" value="0.15">
          </div>
          <div class="pid-slider-group">
            <div class="pid-slider-label"><span>Kd (Derivative)</span><b id="valKd">0.85</b></div>
            <input type="range" class="pid-slider" id="sliderKd" min="0" max="3.0" step="0.05" value="0.85">
          </div>
        </div>

        <!-- Presets -->
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span style="font-size:11px;color:#94a3b8;font-family:var(--mono);">TUNING PRESETS:</span>
          <div class="presets-bar">
            <button class="preset-chip" id="presetIdeal">Ideal Critical Damped</button>
            <button class="preset-chip" id="presetOscillate">Underdamped Oscillation</button>
            <button class="preset-chip" id="presetSluggish">Overdamped Sluggish</button>
            <button class="preset-chip" id="presetZN">Ziegler-Nichols Heuristic</button>
            <button class="preset-chip" id="bumpLoad" style="border-color:var(--orange);color:var(--orange);">⚡ Apply Torque Bump</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

// Insert Cybernetics section right after Teachable section
v4Content = v4Content.replace('</section>\n\n<section class="gesture-arena"', `</section>\n\n${cyberneticsHtml}\n\n<section class="gesture-arena"`);

// Define Cybernetics JS logic
const cyberneticsScript = `
// ==========================================
// 360° LIDAR Raycasting & Web Audio Sonar
// ==========================================
let lidarCanvas = $('#lidarCanvas');
let lCtx = lidarCanvas ? lidarCanvas.getContext('2d') : null;
let lidarSweepAngle = 0;
let sonarAudioEnabled = true;
let audioCtx = null;
let lastPingTime = 0;

// Obstacles in radar space (coordinates relative to center [-150, 150])
let obstacles = [
  { x: -70, y: -80, r: 24 },
  { x: 80, y: -50, r: 30 },
  { x: 30, y: 90, r: 20 },
  { x: -90, y: 60, r: 25 },
  { x: 0, y: -120, r: 18 }
];

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
}

function playSonarPing(freq, dur) {
  if (!sonarAudioEnabled || !audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.7, audioCtx.currentTime + dur);
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
  } catch(e){}
}

if ($('#toggleSonarAudio')) {
  $('#toggleSonarAudio').onclick = () => {
    initAudio();
    sonarAudioEnabled = !sonarAudioEnabled;
    $('#toggleSonarAudio').textContent = sonarAudioEnabled ? '🔊 Sonar Audio: ON' : '🔇 Sonar Audio: MUTED';
    $('#toggleSonarAudio').style.color = sonarAudioEnabled ? 'var(--lime)' : '#94a3b8';
  };
}

if ($('#randomizeObstacles')) {
  $('#randomizeObstacles').onclick = () => {
    obstacles = [];
    const count = 4 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 110;
      obstacles.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        r: 14 + Math.random() * 20
      });
    }
  };
}

if (lidarCanvas) {
  lidarCanvas.onclick = (e) => {
    initAudio();
    const rect = lidarCanvas.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const scale = 440 / rect.width;
    const x = ((e.clientX - rect.left) - cx) * scale;
    const y = ((e.clientY - rect.top) - cy) * scale;
    if (Math.hypot(x, y) < 180) {
      obstacles.push({ x, y, r: 16 + Math.random() * 10 });
      if (obstacles.length > 9) obstacles.shift();
    }
  };
}

function renderLidar() {
  if (!lCtx) return;
  const w = 440, h = 440;
  const cx = w / 2, cy = h / 2;
  const maxR = 190;

  lCtx.fillStyle = '#07100e';
  lCtx.fillRect(0, 0, w, h);

  // Concentric Radar Rings (50cm, 100cm, 150cm, 200cm)
  lCtx.strokeStyle = 'rgba(70, 160, 120, 0.2)';
  lCtx.lineWidth = 1;
  [45, 90, 135, maxR].forEach((r, idx) => {
    lCtx.beginPath();
    lCtx.arc(cx, cy, r, 0, Math.PI * 2);
    lCtx.stroke();
    lCtx.fillStyle = 'rgba(126, 224, 180, 0.4)';
    lCtx.font = '9px "DM Mono"';
    lCtx.fillText((idx + 1) * 50 + 'cm', cx + 4, cy - r + 11);
  });

  // Crosshairs
  lCtx.beginPath();
  lCtx.moveTo(cx, 15); lCtx.lineTo(cx, h - 15);
  lCtx.moveTo(15, cy); lCtx.lineTo(w - 15, cy);
  lCtx.stroke();

  // Raycasting (180 rays)
  let closestDist = 999;
  let closestAngle = 0;
  const numRays = 180;

  for (let i = 0; i < numRays; i++) {
    const angle = (i / numRays) * Math.PI * 2;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    let hitDist = maxR;

    // Check intersection with circular obstacles
    for (const obs of obstacles) {
      // Vector from origin (0,0) to circle center
      const proj = obs.x * cosA + obs.y * sinA;
      if (proj > 0) {
        const perpSq = (obs.x * obs.x + obs.y * obs.y) - (proj * proj);
        if (perpSq <= obs.r * obs.r) {
          const d = proj - Math.sqrt(Math.max(0, obs.r * obs.r - perpSq));
          if (d > 0 && d < hitDist) {
            hitDist = d;
          }
        }
      }
    }

    if (hitDist < closestDist) {
      closestDist = hitDist;
      closestAngle = Math.round(angle * (180 / Math.PI));
    }

    // Draw point cloud hit
    if (hitDist < maxR) {
      const px = cx + cosA * hitDist;
      const py = cy + sinA * hitDist;
      lCtx.fillStyle = hitDist < 60 ? '#ef4444' : (hitDist < 110 ? '#eab308' : '#38bdf8');
      lCtx.fillRect(px - 1.5, py - 1.5, 3, 3);
    }
  }

  // Draw obstacles
  obstacles.forEach(obs => {
    lCtx.fillStyle = 'rgba(255,255,255,0.08)';
    lCtx.strokeStyle = 'rgba(255,255,255,0.25)';
    lCtx.beginPath();
    lCtx.arc(cx + obs.x, cy + obs.y, obs.r, 0, Math.PI * 2);
    lCtx.fill();
    lCtx.stroke();
  });

  // Draw Rotating Sweep Beam
  lidarSweepAngle += 0.045;
  if (lidarSweepAngle > Math.PI * 2) lidarSweepAngle -= Math.PI * 2;

  const grad = lCtx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
  grad.addColorStop(0, 'rgba(201,243,106,0.3)');
  grad.addColorStop(1, 'rgba(40,79,232,0)');

  lCtx.save();
  lCtx.beginPath();
  lCtx.moveTo(cx, cy);
  lCtx.arc(cx, cy, maxR, lidarSweepAngle - 0.35, lidarSweepAngle);
  lCtx.closePath();
  lCtx.fillStyle = grad;
  lCtx.fill();

  lCtx.strokeStyle = 'var(--lime)';
  lCtx.lineWidth = 1.5;
  lCtx.beginPath();
  lCtx.moveTo(cx, cy);
  lCtx.lineTo(cx + Math.cos(lidarSweepAngle) * maxR, cy + Math.sin(lidarSweepAngle) * maxR);
  lCtx.stroke();
  lCtx.restore();

  // Central Robot Dot
  lCtx.fillStyle = '#fff';
  lCtx.beginPath();
  lCtx.arc(cx, cy, 5, 0, Math.PI * 2);
  lCtx.fill();

  // Update HUD values
  const scaledDistCm = Math.round((closestDist / maxR) * 200);
  if ($('#hudClosestDist')) $('#hudClosestDist').textContent = scaledDistCm + ' cm';
  if ($('#hudBearing')) $('#hudBearing').textContent = closestAngle + '°';
  
  const zoneEl = $('#hudZone');
  if (zoneEl) {
    if (scaledDistCm < 40) {
      zoneEl.textContent = 'DANGER CRITICAL';
      zoneEl.style.color = '#ef4444';
      // High urgency acoustic ping
      const now = Date.now();
      if (now - lastPingTime > 180) {
        playSonarPing(1100, 0.08);
        lastPingTime = now;
      }
    } else if (scaledDistCm < 90) {
      zoneEl.textContent = 'WARNING PROX';
      zoneEl.style.color = '#eab308';
      const now = Date.now();
      if (now - lastPingTime > 450) {
        playSonarPing(650, 0.12);
        lastPingTime = now;
      }
    } else {
      zoneEl.textContent = 'CLEAR PATH';
      zoneEl.style.color = 'var(--lime)';
      const now = Date.now();
      if (now - lastPingTime > 1100) {
        playSonarPing(420, 0.15);
        lastPingTime = now;
      }
    }
  }

  requestAnimationFrame(renderLidar);
}
renderLidar();

// ==========================================
// Closed-Loop PID Motor Controller Engine
// ==========================================
let pidCanvas = $('#pidCanvas');
let pCtx = pidCanvas ? pidCanvas.getContext('2d') : null;

let Kp = 2.40, Ki = 0.15, Kd = 0.85;
let setpoint = 100; // Target motor RPM
let currentVel = 0;
let integral = 0;
let lastError = 0;
let simTime = 0;
let history = []; // array of { t, target, actual }
let maxHistory = 220;

function updatePidSliders() {
  $('#sliderKp').value = Kp; $('#valKp').textContent = Kp.toFixed(2);
  $('#sliderKi').value = Ki; $('#valKi').textContent = Ki.toFixed(2);
  $('#sliderKd').value = Kd; $('#valKd').textContent = Kd.toFixed(2);
}

if ($('#sliderKp')) {
  $('#sliderKp').oninput = e => { Kp = parseFloat(e.target.value); $('#valKp').textContent = Kp.toFixed(2); };
  $('#sliderKi').oninput = e => { Ki = parseFloat(e.target.value); $('#valKi').textContent = Ki.toFixed(2); };
  $('#sliderKd').oninput = e => { Kd = parseFloat(e.target.value); $('#valKd').textContent = Kd.toFixed(2); };
}

$('#presetIdeal').onclick = () => { Kp = 2.40; Ki = 0.15; Kd = 0.85; updatePidSliders(); resetPidSim(); toast('Applied: Critically Damped Ideal'); };
$('#presetOscillate').onclick = () => { Kp = 4.80; Ki = 0.60; Kd = 0.05; updatePidSliders(); resetPidSim(); toast('Applied: Underdamped Ringing'); };
$('#presetSluggish').onclick = () => { Kp = 0.80; Ki = 0.02; Kd = 1.90; updatePidSliders(); resetPidSim(); toast('Applied: Overdamped Sluggish'); };
$('#presetZN').onclick = () => { Kp = 1.90; Ki = 0.35; Kd = 0.55; updatePidSliders(); resetPidSim(); toast('Applied: Ziegler-Nichols Heuristic'); };
$('#bumpLoad').onclick = () => {
  currentVel -= 45; // Sudden motor torque shock
  toast('Torque disturbance applied to drive wheel.');
};

function resetPidSim() {
  currentVel = 0;
  integral = 0;
  lastError = setpoint;
  history = [];
}

function stepPid() {
  const dt = 0.025; // 40 Hz simulation
  const error = setpoint - currentVel;
  integral = Math.max(-100, Math.min(100, integral + error * dt));
  const derivative = (error - lastError) / dt;
  lastError = error;

  // PID Control Output (Torque)
  const u = (Kp * error) + (Ki * integral) + (Kd * derivative);

  // Motor Dynamics (inertia + damping)
  const motorInertia = 0.85;
  const damping = 0.12;
  const accel = (u - damping * currentVel) / motorInertia;
  currentVel += accel * dt;

  history.push({ target: setpoint, actual: currentVel });
  if (history.length > maxHistory) history.shift();

  // Compute Metrics from recent step
  const peak = Math.max(...history.map(h => h.actual));
  const overshoot = Math.max(0, Math.round(((peak - setpoint) / setpoint) * 100));
  $('#statOvershoot').textContent = overshoot + '%';

  const steadyErr = Math.abs(Math.round(((setpoint - currentVel) / setpoint) * 100 * 10) / 10);
  $('#statError').textContent = steadyErr + '%';

  // Draw Oscilloscope
  if (pCtx) {
    const w = 560, h = 210;
    pCtx.fillStyle = '#080f0d';
    pCtx.fillRect(0, 0, w, h);

    // Grid lines
    pCtx.strokeStyle = 'rgba(255,255,255,0.06)';
    pCtx.lineWidth = 1;
    for (let y = 30; y < h; y += 35) {
      pCtx.beginPath(); pCtx.moveTo(0, y); pCtx.lineTo(w, y); pCtx.stroke();
    }

    // Setpoint dashed line
    const targetY = h - (setpoint / 150) * (h - 40) - 20;
    pCtx.strokeStyle = 'rgba(201,243,106,0.6)';
    pCtx.setLineDash([6, 4]);
    pCtx.beginPath();
    pCtx.moveTo(0, targetY); pCtx.lineTo(w, targetY);
    pCtx.stroke();
    pCtx.setLineDash([]);
    pCtx.fillStyle = 'var(--lime)';
    pCtx.font = '10px "DM Mono"';
    pCtx.fillText('TARGET SETPOINT: ' + setpoint + ' RPM', 10, targetY - 6);

    // Motor Velocity response curve
    if (history.length > 1) {
      pCtx.strokeStyle = '#38bdf8';
      pCtx.lineWidth = 2.5;
      pCtx.beginPath();
      history.forEach((pt, idx) => {
        const x = (idx / maxHistory) * w;
        const y = h - (pt.actual / 150) * (h - 40) - 20;
        if (idx === 0) pCtx.moveTo(x, y); else pCtx.lineTo(x, y);
      });
      pCtx.stroke();
    }
  }

  setTimeout(stepPid, 25);
}
stepPid();
`;

v4Content = v4Content.replace('// Load saved vault on boot', `${cyberneticsScript}\n\n// Load saved vault on boot`);

fs.writeFileSync(path.join(__dirname, 'public', 'v4.html'), v4Content, 'utf-8');
console.log('Successfully created public/v4.html, size: ' + fs.statSync(path.join(__dirname, 'public', 'v4.html')).size + ' bytes');

// Also create public/v4/index.html
const v4Dir = path.join(__dirname, 'public', 'v4');
if (!fs.existsSync(v4Dir)) fs.mkdirSync(v4Dir, { recursive: true });
fs.writeFileSync(path.join(v4Dir, 'index.html'), v4Content, 'utf-8');
console.log('Successfully created public/v4/index.html');
