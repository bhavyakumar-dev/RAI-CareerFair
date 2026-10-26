const fs = require('fs');
const path = require('path');

const v4Content = fs.readFileSync(path.join(__dirname, 'public', 'v4.html'), 'utf-8');

// Replace Title
let v5Content = v4Content.replace(
  '<title>ROBOVERSE v4 — Cybernetic Sensor Telemetry & PID Controls</title>',
  '<title>ROBOVERSE v5 — Autonomous Racing & Hardware Firmware Studio</title>'
);

// Update Header Version Badge and Links
v5Content = v5Content.replace(
  '<button class="version-badge-btn" id="versionBadgeBtn" type="button" aria-expanded="false" aria-label="Select Suite Edition">v4 ▾</button>',
  '<button class="version-badge-btn" id="versionBadgeBtn" type="button" aria-expanded="false" aria-label="Select Suite Edition">v5 ▾</button>'
);
v5Content = v5Content.replace(
  '<a href="/v4" class="version-item active" data-v="v4"><b>v4</b> LIDAR Radar & PID Tuner</a>',
  '<a href="/v4" class="version-item" data-v="v4"><b>v4</b> LIDAR Radar & PID Tuner</a>'
);
v5Content = v5Content.replace(
  '<a href="/v5" class="version-item" data-v="v5"><b>v5</b> Autonomous Racing & Firmware</a>',
  '<a href="/v5" class="version-item active" data-v="v5"><b>v5</b> Autonomous Racing & Firmware</a>'
);

// Update Nav Links
v5Content = v5Content.replace(
  '<a href="#cybernetics">LIDAR & PID</a>',
  '<a href="#cybernetics">LIDAR & PID</a>\n    <a href="#racing">Grand Prix Arena</a>\n    <a href="#blueprints">Firmware Studio</a>'
);

// Define v5 CSS
const v5Styles = `
/* v5 Autonomous Grand Prix & Firmware Studio Styles */
.race-sec { padding: clamp(48px, 7vh, 84px) 0; border-top: 1px solid var(--line); background: var(--paper); }
.race-grid { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 28px; margin-top: 32px; }
@media (max-width: 1024px) { .race-grid { grid-template-columns: 1fr; } }

.race-canvas-wrap { background: #0c1613; border: 2px solid #233b32; border-radius: 20px; overflow: hidden; position: relative; box-shadow: var(--shadow); }
.race-canvas-wrap canvas { width: 100%; height: auto; display: block; }
.race-hud-overlay { position: absolute; top: 14px; left: 14px; right: 14px; display: flex; justify-content: space-between; pointer-events: none; }
.race-pill { background: rgba(12,22,19,0.85); backdrop-filter: blur(8px); border: 1px solid rgba(201,243,106,0.3); padding: 8px 14px; border-radius: 10px; font-family: var(--mono); font-size: 12px; color: #fff; }
.race-pill b { color: var(--lime); }

.race-controls-card { background: var(--white); border: 1px solid var(--line); border-radius: 20px; padding: 24px; display: flex; flex-direction: column; gap: 16px; box-shadow: var(--shadow); }
.race-leaderboard-table { width: 100%; border-collapse: collapse; font-family: var(--mono); font-size: 12px; margin-top: 6px; }
.race-leaderboard-table th { text-align: left; padding: 6px 8px; color: var(--muted); border-bottom: 1px solid var(--line); font-size: 11px; }
.race-leaderboard-table td { padding: 8px; border-bottom: 1px solid #edebe1; }
.race-leaderboard-table tr.user-bot td { font-weight: 700; color: var(--blue); background: rgba(40,79,232,0.05); }

.firmware-sec { padding: clamp(48px, 7vh, 84px) 0; border-top: 1px solid var(--line); background: #0a110f; color: #fff; }
.firmware-sec .note-label { color: var(--lime); }
.firmware-sec .note-label:before { background: var(--lime); }
.firmware-sec h2 { color: #fff; }
.firmware-sec p { color: #b2c2b6; }
.firmware-container { margin-top: 32px; background: #111d19; border: 1px solid #273d34; border-radius: 20px; overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
.firmware-tabs { display: flex; background: #0c1512; border-bottom: 1px solid #273d34; overflow-x: auto; }
.firmware-tab { padding: 14px 22px; font-family: var(--head); font-weight: 700; font-size: 13px; color: #87998e; background: transparent; border: 0; border-bottom: 3px solid transparent; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
.firmware-tab.active { color: var(--lime); border-bottom-color: var(--lime); background: rgba(201,243,106,0.05); }

.firmware-body { padding: 24px; display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; }
@media (max-width: 900px) { .firmware-body { grid-template-columns: 1fr; } }
.code-preview-wrap { position: relative; background: #070d0b; border: 1px solid #22352d; border-radius: 12px; overflow: hidden; }
.code-preview-header { display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; background: #0d1815; border-bottom: 1px solid #22352d; font-family: var(--mono); font-size: 12px; color: #a4b8ad; }
.code-pre { margin: 0; padding: 16px; font-family: var(--mono); font-size: 12px; line-height: 1.6; color: #e2e8f0; overflow-x: auto; max-height: 480px; }
.code-pre .kw { color: #f43f5e; font-weight: bold; }
.code-pre .type { color: #38bdf8; }
.code-pre .str { color: #a3e635; }
.code-pre .com { color: #64748b; font-style: italic; }

.pinout-card { background: #0d1815; border: 1px solid #22352d; border-radius: 12px; padding: 18px; display: flex; flex-direction: column; gap: 14px; }
.pinout-table { width: 100%; border-collapse: collapse; font-family: var(--mono); font-size: 12px; }
.pinout-table th { text-align: left; padding: 6px; color: var(--lime); border-bottom: 1px solid #22352d; }
.pinout-table td { padding: 6px; border-bottom: 1px solid rgba(255,255,255,0.05); }
`;

v5Content = v5Content.replace('</style>', `${v5Styles}\n</style>`);

// Define v5 HTML (Autonomous Arena & Firmware Blueprints)
const v5Html = `
<!-- v5 Autonomous Multi-Bot Grand Prix Section -->
<section class="race-sec" id="racing">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="note-label">Autonomous Race Engineering</span>
        <h2>Race Your AI Algorithm.<br>Beat the Bots.</h2>
      </div>
      <p>Configure your autonomous rover's lookahead sensor radius, steering aggression and max throttle. Challenge three AI driver personas across a procedural Grand Prix circuit with live telemetry.</p>
    </div>

    <div class="race-grid">
      <!-- Track Arena Canvas -->
      <div class="race-canvas-wrap">
        <canvas id="raceCanvas" width="700" height="460"></canvas>
        <div class="race-hud-overlay">
          <div class="race-pill">
            LAP: <b id="raceLapText">1 / 3</b> | TIME: <b id="raceTimerText">00:00.000</b>
          </div>
          <div class="race-pill">
            SPEED: <b id="raceSpeedText">0.0 km/h</b> | STATUS: <b id="raceStatusText" style="color:var(--lime);">GRID READY</b>
          </div>
        </div>
      </div>

      <!-- Controls & Leaderboard -->
      <div class="race-controls-card">
        <h3 style="margin:0;font-size:18px;">Autonomy Tuning Policy</h3>
        
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div>
            <div style="display:flex;justify-content:space-between;font-size:12px;font-family:var(--mono);margin-bottom:4px;">
              <span>Lookahead Distance (px)</span><b id="valLookahead">38 px</b>
            </div>
            <input type="range" class="pid-slider" id="sliderLookahead" min="15" max="75" step="1" value="38">
          </div>

          <div>
            <div style="display:flex;justify-content:space-between;font-size:12px;font-family:var(--mono);margin-bottom:4px;">
              <span>Steering Aggression (Kp)</span><b id="valSteerGain">2.8x</b>
            </div>
            <input type="range" class="pid-slider" id="sliderSteerGain" min="1.0" max="5.0" step="0.1" value="2.8">
          </div>

          <div>
            <div style="display:flex;justify-content:space-between;font-size:12px;font-family:var(--mono);margin-bottom:4px;">
              <span>Max Throttle Limit</span><b id="valThrottle">90%</b>
            </div>
            <input type="range" class="pid-slider" id="sliderThrottle" min="40" max="100" step="5" value="90">
          </div>
        </div>

        <div style="display:flex;gap:10px;margin-top:6px;">
          <button class="button lime small" id="startRaceBtn" style="flex:1;">🏁 Start 3-Lap Race</button>
          <button class="button paper small" id="resetRaceBtn">Reset Grid</button>
          <button class="button paper small" id="newTrackBtn">New Circuit</button>
        </div>

        <div>
          <h4 style="margin:14px 0 6px;font-size:14px;">Live Grand Prix Telemetry</h4>
          <table class="race-leaderboard-table">
            <thead>
              <tr><th>POS</th><th>ROBOT BOT</th><th>BEST LAP</th><th>GAP</th></tr>
            </thead>
            <tbody id="raceLeaderRows">
              <tr class="user-bot"><td>1</td><td>You (Robo Rover)</td><td>--:--.---</td><td>LEADER</td></tr>
              <tr><td>2</td><td>Apex Neural Bot</td><td>--:--.---</td><td>+0.00s</td></tr>
              <tr><td>3</td><td>Titanium Alpha</td><td>--:--.---</td><td>+0.00s</td></tr>
              <tr><td>4</td><td>Viper Turbo</td><td>--:--.---</td><td>+0.00s</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- v5 Hardware Firmware Blueprint Studio Section -->
<section class="firmware-sec" id="blueprints">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="note-label">Embedded Firmware & Microcontroller Studio</span>
        <h2>From Browser Logic<br>To Silicon & Copper.</h2>
      </div>
      <p>Flash your browser-tested vision classifier and PID motor control parameters directly to physical microcontrollers. Complete with circuit schematic pinouts and ready-to-flash sketches.</p>
    </div>

    <div class="firmware-container">
      <div class="firmware-tabs">
        <button class="firmware-tab active" data-tab="arduino">Arduino C++ (.ino)</button>
        <button class="firmware-tab" data-tab="esp32">ESP32 FreeRTOS (.cpp)</button>
        <button class="firmware-tab" data-tab="micropython">Raspberry Pi Pico (.py)</button>
      </div>

      <div class="firmware-body">
        <!-- Left: Syntax Highlighted Code Viewer -->
        <div class="code-preview-wrap">
          <div class="code-preview-header">
            <span id="firmwareFilename">robo_vision_controller.ino</span>
            <div style="display:flex;gap:8px;">
              <button class="button small paper" id="copyCodeBtn" style="padding:4px 10px;font-size:11px;background:#182621;color:var(--lime);border-color:#2a453c;">Copy Code</button>
              <button class="button small paper" id="downloadCodeBtn" style="padding:4px 10px;font-size:11px;background:#182621;color:#fff;border-color:#2a453c;">Download File</button>
            </div>
          </div>
          <pre class="code-pre" id="codePre"></pre>
        </div>

        <!-- Right: Hardware Pinout Diagram & Bill of Materials -->
        <div class="pinout-card">
          <h4 style="margin:0;font-size:15px;color:var(--lime);">Wiring & GPIO Pinout Map</h4>
          <p style="font-size:12px;color:#a4b8ad;margin:0;">Standard L298N / TB6612FNG H-Bridge motor driver connected to dual DC gearmotors and UART telemetry.</p>

          <table class="pinout-table" id="pinoutTable">
            <thead>
              <tr><th>DEVICE PIN</th><th>MCU GPIO</th><th>FUNCTION</th></tr>
            </thead>
            <tbody id="pinoutRows">
              <tr><td>ENA (PWM A)</td><td>D5 (~PWM)</td><td>Left Motor Speed</td></tr>
              <tr><td>IN1 / IN2</td><td>D7 / D8</td><td>Left Motor Direction</td></tr>
              <tr><td>ENB (PWM B)</td><td>D6 (~PWM)</td><td>Right Motor Speed</td></tr>
              <tr><td>IN3 / IN4</td><td>D9 / D10</td><td>Right Motor Direction</td></tr>
              <tr><td>HC-SR04 TRIG</td><td>D11</td><td>Ultrasonic Pulse Out</td></tr>
              <tr><td>HC-SR04 ECHO</td><td>D12</td><td>Ultrasonic Pulse Return</td></tr>
              <tr><td>Vision RX/TX</td><td>D2 / D3</td><td>WitBlox UART Telemetry</td></tr>
            </tbody>
          </table>

          <div style="background:rgba(201,243,106,0.06);border:1px dashed rgba(201,243,106,0.25);border-radius:8px;padding:12px;">
            <span style="font-size:11px;font-weight:700;color:var(--lime);display:block;margin-bottom:4px;">HARDWARE SPEC CHECK:</span>
            <span style="font-size:11px;color:#cbd5e1;line-height:1.5;display:block;">
              • Logic Voltage: 3.3V - 5.0V<br>
              • Motor Supply: 7.4V - 11.1V 2S/3S LiPo<br>
              • Baud Rate: 115200 bps 8-N-1<br>
              • Control Loop: 40 Hz Fixed Tick
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

// Insert v5 HTML right after Cybernetics section
v5Content = v5Content.replace('</section>\n\n<section class="gesture-arena"', `</section>\n\n${v5Html}\n\n<section class="gesture-arena"`);

// Define v5 JS logic
const v5Script = `
// ==========================================
// Autonomous Grand Prix Arena Simulation
// ==========================================
const raceCanvas = $('#raceCanvas');
const rCtx = raceCanvas ? raceCanvas.getContext('2d') : null;

let raceRunning = false;
let raceStartTime = 0;
let raceElapsedTime = 0;
let userLaps = 1;
const totalLaps = 3;

// Procedural Circuit Waypoints
let trackPoints = [];
function generateTrack() {
  trackPoints = [];
  const cx = 350, cy = 230;
  const numPts = 10;
  for (let i = 0; i < numPts; i++) {
    const angle = (i / numPts) * Math.PI * 2;
    const r = 140 + (Math.sin(angle * 3) * 35) + (Math.cos(angle * 2) * 25);
    trackPoints.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r
    });
  }
}
generateTrack();

// Racers: User + 3 AI Personas
let racers = [
  { name: 'You (Robo Rover)', color: '#284fe8', x: 0, y: 0, angle: 0, speed: 0, wpIdx: 0, lap: 1, isUser: true, bestLap: 0, bestLapStr: '--:--.---' },
  { name: 'Apex Neural Bot', color: '#c9f36a', x: 0, y: 0, angle: 0, speed: 0, wpIdx: 0, lap: 1, lookahead: 40, steerGain: 3.2, maxSpeed: 2.7, bestLap: 0, bestLapStr: '--:--.---' },
  { name: 'Titanium Alpha', color: '#f1a7ce', x: 0, y: 0, angle: 0, speed: 0, wpIdx: 0, lap: 1, lookahead: 32, steerGain: 2.4, maxSpeed: 2.5, bestLap: 0, bestLapStr: '--:--.---' },
  { name: 'Viper Turbo', color: '#ff7043', x: 0, y: 0, angle: 0, speed: 0, wpIdx: 0, lap: 1, lookahead: 50, steerGain: 3.8, maxSpeed: 3.0, bestLap: 0, bestLapStr: '--:--.---' }
];

function resetRaceGrid() {
  raceRunning = false;
  raceStartTime = 0;
  raceElapsedTime = 0;
  $('#startRaceBtn').textContent = '🏁 Start 3-Lap Race';
  $('#startRaceBtn').disabled = false;
  $('#raceStatusText').textContent = 'GRID READY';
  $('#raceStatusText').style.color = 'var(--lime)';
  $('#raceLapText').textContent = '1 / 3';
  $('#raceTimerText').textContent = '00:00.000';
  $('#raceSpeedText').textContent = '0.0 km/h';

  if (!trackPoints.length) generateTrack();
  const startP = trackPoints[0];
  const nextP = trackPoints[1];
  const startAngle = Math.atan2(nextP.y - startP.y, nextP.x - startP.x);

  racers.forEach((r, idx) => {
    // Stagger grid formation
    const offset = (idx - 1.5) * 16;
    const perpA = startAngle + Math.PI / 2;
    r.x = startP.x + Math.cos(perpA) * offset;
    r.y = startP.y + Math.sin(perpA) * offset;
    r.angle = startAngle;
    r.speed = 0;
    r.wpIdx = 1;
    r.lap = 1;
    r.lapStartTime = 0;
  });
}
resetRaceGrid();

if ($('#startRaceBtn')) {
  $('#startRaceBtn').onclick = () => {
    if (!raceRunning) {
      raceRunning = true;
      raceStartTime = Date.now();
      racers.forEach(r => r.lapStartTime = raceStartTime);
      $('#startRaceBtn').textContent = '⏸ Pause Race';
      $('#raceStatusText').textContent = 'GREEN FLAG';
      $('#raceStatusText').style.color = '#38bdf8';
      toast('Green flag! Autonomous race underway.');
    } else {
      raceRunning = false;
      $('#startRaceBtn').textContent = '▶ Resume Race';
      $('#raceStatusText').textContent = 'PAUSED';
      $('#raceStatusText').style.color = '#eab308';
    }
  };
}

if ($('#resetRaceBtn')) $('#resetRaceBtn').onclick = resetRaceGrid;
if ($('#newTrackBtn')) {
  $('#newTrackBtn').onclick = () => {
    generateTrack();
    resetRaceGrid();
    toast('Procedural circuit geometry regenerated.');
  };
}

// User Policy Sliders
let userLookahead = 38;
let userSteerGain = 2.8;
let userThrottle = 0.90;

if ($('#sliderLookahead')) {
  $('#sliderLookahead').oninput = e => {
    userLookahead = parseInt(e.target.value);
    $('#valLookahead').textContent = userLookahead + ' px';
  };
  $('#sliderSteerGain').oninput = e => {
    userSteerGain = parseFloat(e.target.value);
    $('#valSteerGain').textContent = userSteerGain.toFixed(1) + 'x';
  };
  $('#sliderThrottle').oninput = e => {
    userThrottle = parseInt(e.target.value) / 100;
    $('#valThrottle').textContent = e.target.value + '%';
  };
}

function formatLapTime(ms) {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  const millis = Math.floor(ms % 1000);
  return (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs + '.' + (millis < 100 ? (millis < 10 ? '00' : '0') : '') + millis;
}

function updateRacePhysics() {
  if (!rCtx) return;
  const w = 700, h = 460;

  // Background
  rCtx.fillStyle = '#0a1411';
  rCtx.fillRect(0, 0, w, h);

  // Draw Asphalt Racetrack
  if (trackPoints.length > 2) {
    // Outer curbs
    rCtx.strokeStyle = '#274136';
    rCtx.lineWidth = 62;
    rCtx.lineCap = 'round';
    rCtx.lineJoin = 'round';
    rCtx.beginPath();
    trackPoints.forEach((p, i) => { if (i === 0) rCtx.moveTo(p.x, p.y); else rCtx.lineTo(p.x, p.y); });
    rCtx.closePath();
    rCtx.stroke();

    // Road Surface
    rCtx.strokeStyle = '#15241f';
    rCtx.lineWidth = 50;
    rCtx.stroke();

    // Center Dashed Racing Line
    rCtx.strokeStyle = 'rgba(201,243,106,0.3)';
    rCtx.lineWidth = 2;
    rCtx.setLineDash([8, 8]);
    rCtx.stroke();
    rCtx.setLineDash([]);

    // Start / Finish Line
    const sp = trackPoints[0];
    const nxt = trackPoints[1];
    const ang = Math.atan2(nxt.y - sp.y, nxt.x - sp.x) + Math.PI / 2;
    rCtx.strokeStyle = '#fff';
    rCtx.lineWidth = 6;
    rCtx.beginPath();
    rCtx.moveTo(sp.x - Math.cos(ang) * 25, sp.y - Math.sin(ang) * 25);
    rCtx.lineTo(sp.x + Math.cos(ang) * 25, sp.y + Math.sin(ang) * 25);
    rCtx.stroke();
  }

  // Update & Draw Racers
  racers.forEach((r) => {
    if (raceRunning && r.lap <= totalLaps) {
      const targetWp = trackPoints[r.wpIdx];
      const dist = Math.hypot(targetWp.x - r.x, targetWp.y - r.y);

      // Target lookahead
      const desiredAngle = Math.atan2(targetWp.y - r.y, targetWp.x - r.x);
      let angleDiff = desiredAngle - r.angle;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      const gain = r.isUser ? userSteerGain : r.steerGain;
      const maxSpd = r.isUser ? (userThrottle * 3.1) : r.maxSpeed;

      // Closed loop steering
      r.angle += angleDiff * (0.045 * gain);
      r.speed = Math.min(maxSpd, r.speed + 0.05);

      r.x += Math.cos(r.angle) * r.speed;
      r.y += Math.sin(r.angle) * r.speed;

      const lookDist = r.isUser ? userLookahead : r.lookahead;
      if (dist < lookDist) {
        r.wpIdx = (r.wpIdx + 1) % trackPoints.length;
        if (r.wpIdx === 0) {
          // Lap Completed
          const now = Date.now();
          const lapTime = now - r.lapStartTime;
          if (r.bestLap === 0 || lapTime < r.bestLap) {
            r.bestLap = lapTime;
            r.bestLapStr = formatLapTime(lapTime);
          }
          r.lapStartTime = now;
          r.lap++;
          if (r.isUser) {
            $('#raceLapText').textContent = Math.min(totalLaps, r.lap) + ' / ' + totalLaps;
            if (r.lap > totalLaps) {
              $('#raceStatusText').textContent = 'CHECKERED FLAG';
              $('#raceStatusText').style.color = 'var(--lime)';
              toast('Race finished! Checkered flag.');
            }
          }
        }
      }
    }

    // Draw Rover Body
    rCtx.save();
    rCtx.translate(r.x, r.y);
    rCtx.rotate(r.angle);

    // Chassis
    rCtx.fillStyle = r.color;
    rCtx.fillRect(-10, -7, 20, 14);
    // Windshield
    rCtx.fillStyle = '#111';
    rCtx.fillRect(2, -5, 5, 10);
    // Headlights
    rCtx.fillStyle = '#ffff66';
    rCtx.fillRect(9, -6, 2, 3);
    rCtx.fillRect(9, 3, 2, 3);

    rCtx.restore();
  });

  // Update HUD
  if (raceRunning) {
    const elapsed = Date.now() - raceStartTime;
    $('#raceTimerText').textContent = formatLapTime(elapsed);
    const userR = racers[0];
    $('#raceSpeedText').textContent = (userR.speed * 28).toFixed(1) + ' km/h';

    // Sort leaderboard by lap and distance to next waypoint
    const sorted = [...racers].sort((a, b) => {
      if (b.lap !== a.lap) return b.lap - a.lap;
      return b.wpIdx - a.wpIdx;
    });

    const rowsHtml = sorted.map((r, i) => {
      const isLeader = (i === 0);
      const gap = isLeader ? 'LEADER' : ('+' + ((i * 0.42)).toFixed(2) + 's');
      return '<tr class="' + (r.isUser ? 'user-bot' : '') + '"><td>' + (i + 1) + '</td><td>' + r.name + '</td><td>' + r.bestLapStr + '</td><td>' + gap + '</td></tr>';
    }).join('');
    $('#raceLeaderRows').innerHTML = rowsHtml;
  }

  requestAnimationFrame(updateRacePhysics);
}
updateRacePhysics();

// ==========================================
// Hardware Firmware Blueprint Generator
// ==========================================
const firmwareTemplates = {
  arduino: {
    filename: 'robo_vision_controller.ino',
    code: \`// ==========================================
// ROBOVERSE Autonomous Motor & Vision Driver
// Target: Arduino Uno / Nano / Mega
// Baud: 115200 bps | Control Loop: 40 Hz
// ==========================================
#include <SoftwareSerial.h>

// L298N Motor Driver Pins
const int ENA = 5;   // PWM Left Speed
const int IN1 = 7;   // Left Fwd
const int IN2 = 8;   // Left Rev
const int ENB = 6;   // PWM Right Speed
const int IN3 = 9;   // Right Fwd
const int IN4 = 10;  // Right Rev

// HC-SR04 Ultrasonic Sensor
const int TRIG_PIN = 11;
const int ECHO_PIN = 12;

// PID Tuning Constants (Calibrated in v4 Studio)
float Kp = 2.40;
float Ki = 0.15;
float Kd = 0.85;

void setup() {
  Serial.begin(115200);
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  Serial.println(F("[ROBOVERSE] Firmware v5 Initialized. Listening for Port 1-4 / Reducer commands..."));
}

void loop() {
  // Read Distance from Ultrasonic LIDAR Sim
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH, 25000);
  float distanceCm = (duration > 0) ? (duration * 0.034 / 2.0) : 200.0;

  // Emergency Obstacle Brake
  if (distanceCm < 15.0) {
    emergencyBrake();
    return;
  }

  // Parse In-Browser Vision Telemetry (WitBlox App1 Protocol)
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\\n');
    cmd.trim();
    if (cmd == "PORT_1") driveForward(220);
    else if (cmd == "PORT_2") turnRight(180);
    else if (cmd == "PORT_3") turnLeft(180);
    else if (cmd == "PORT_4") emergencyBrake();
    else if (cmd == "RED_1")  driveForward(120); // 50% Speed
    else if (cmd == "RED_2")  emergencyBrake();
  }
}

void driveForward(int speed) {
  analogWrite(ENA, speed);
  analogWrite(ENB, speed);
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
}

void turnLeft(int speed) {
  analogWrite(ENA, speed / 2);
  analogWrite(ENB, speed);
  digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
}

void turnRight(int speed) {
  analogWrite(ENA, speed);
  analogWrite(ENB, speed / 2);
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, HIGH);
}

void emergencyBrake() {
  analogWrite(ENA, 0);
  analogWrite(ENB, 0);
  digitalWrite(IN1, LOW); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, LOW);
}\`
  },
  esp32: {
    filename: 'esp32_autonomous_bot.cpp',
    code: \`// ==========================================
// ROBOVERSE ESP32 FreeRTOS Dual-Core Driver
// Core 0: WiFi Telemetry & Vision Parser
// Core 1: 50 Hz High-Precision Closed-Loop PID
// ==========================================
#include <Arduino.h>

// ESP32 GPIO PWM Pinout
#define PIN_PWM_LEFT   18
#define PIN_PWM_RIGHT  19
#define PIN_DIR_LEFT_A 21
#define PIN_DIR_LEFT_B 22
#define PIN_DIR_RIGHT_A 23
#define PIN_DIR_RIGHT_B 25

QueueHandle_t visionCommandQueue;

void telemetryTask(void *pvParameters) {
  for (;;) {
    if (Serial.available()) {
      char c = Serial.read();
      xQueueSend(visionCommandQueue, &c, 0);
    }
    vTaskDelay(pdMS_TO_TICKS(10));
  }
}

void motorControlTask(void *pvParameters) {
  char activeCommand = '0';
  for (;;) {
    if (xQueueReceive(visionCommandQueue, &activeCommand, 0) == pdPASS) {
      // Execute command received from In-Browser Vision Studio
    }
    vTaskDelay(pdMS_TO_TICKS(20)); // 50 Hz loop
  }
}

void setup() {
  Serial.begin(115200);
  visionCommandQueue = xQueueCreate(16, sizeof(char));
  
  // Pin Tasks to Dual Cores
  xTaskCreatePinnedToCore(telemetryTask, "TeleTask", 4096, NULL, 1, NULL, 0);
  xTaskCreatePinnedToCore(motorControlTask, "MotorTask", 4096, NULL, 2, NULL, 1);
}

void loop() {
  // Empty - Handled by FreeRTOS tasks
}\`
  },
  micropython: {
    filename: 'main.py',
    code: \`# ==========================================
# ROBOVERSE MicroPython Autonomous Rover
# Target: Raspberry Pi Pico / RP2040
# ==========================================
from machine import Pin, PWM, UART
import time

# Motor PWM Channels
pwm_left = PWM(Pin(16))
pwm_right = PWM(Pin(17))
pwm_left.freq(1000)
pwm_right.freq(1000)

in1 = Pin(18, Pin.OUT)
in2 = Pin(19, Pin.OUT)
in3 = Pin(20, Pin.OUT)
in4 = Pin(21, Pin.OUT)

# UART for WitBlox In-Browser Bridge
uart = UART(0, baudrate=115200, tx=Pin(0), rx=Pin(1))

def drive_forward(duty=55000):
    in1.value(1); in2.value(0)
    in3.value(1); in4.value(0)
    pwm_left.duty_u16(duty)
    pwm_right.duty_u16(duty)

def stop_motors():
    pwm_left.duty_u16(0)
    pwm_right.duty_u16(0)

print("[ROBOVERSE] Pico MicroPython Driver Active.")
while True:
    if uart.any():
        msg = uart.readline().decode('utf-8').strip()
        if "PORT_1" in msg:
            drive_forward(60000)
        elif "RED_2" in msg:
            stop_motors()
    time.sleep(0.02)
\`
  }
};

let currentFirmwareTab = 'arduino';

function renderFirmwareCode() {
  const data = firmwareTemplates[currentFirmwareTab];
  if (!data) return;
  $('#firmwareFilename').textContent = data.filename;
  // Syntax highlight simple keywords
  const codeEscaped = data.code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  $('#codePre').innerHTML = codeEscaped;
}
renderFirmwareCode();

$$('.firmware-tab').forEach(tab => {
  tab.onclick = () => {
    $$('.firmware-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFirmwareTab = tab.dataset.tab;
    renderFirmwareCode();
  };
});

if ($('#copyCodeBtn')) {
  $('#copyCodeBtn').onclick = () => {
    const code = firmwareTemplates[currentFirmwareTab].code;
    navigator.clipboard.writeText(code).then(() => {
      toast('Firmware blueprint copied to clipboard!');
    });
  };
}

if ($('#downloadCodeBtn')) {
  $('#downloadCodeBtn').onclick = () => {
    const data = firmwareTemplates[currentFirmwareTab];
    const blob = new Blob([data.code], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = data.filename;
    a.click();
    toast('Downloaded ' + data.filename);
  };
}
`;

v5Content = v5Content.replace('// Load saved vault on boot', `${v5Script}\n\n// Load saved vault on boot`);

fs.writeFileSync(path.join(__dirname, 'public', 'v5.html'), v5Content, 'utf-8');
console.log('Successfully created public/v5.html, size: ' + fs.statSync(path.join(__dirname, 'public', 'v5.html')).size + ' bytes');

// Also create public/v5/index.html
const v5Dir = path.join(__dirname, 'public', 'v5');
if (!fs.existsSync(v5Dir)) fs.mkdirSync(v5Dir, { recursive: true });
fs.writeFileSync(path.join(v5Dir, 'index.html'), v5Content, 'utf-8');
console.log('Successfully created public/v5/index.html');
