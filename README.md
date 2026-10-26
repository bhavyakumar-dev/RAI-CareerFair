# ROBOVERSE — Robotics & AI Discovery Lab

A colorful, mobile-friendly Robotics & AI exhibition website and neural computer vision laboratory with interactive engineering games, a career quiz, college pathways, a roadmap builder, and advanced on-device AI tools.

## Multi-Version Cumulative Suite ($v_{n+1} \supset v_n$)

Every subsequent edition cumulatively inherits every single feature of previous editions while introducing specialized advanced engineering laboratories:

1. **v1 — Classic Pavilion (`/` or `index.html`)**:
   - 3D Three.js interactive robot with cursor tracking and gesture modes.
   - Continuous live on-device vision powered by **COCO-SSD v2.2.3** (80-class real-time bounding boxes with percentage confidence).
   - Official **WitBlox MobileNet v2.1.1** model (`https://ai.witblox.com/witblox-ai-vision/app1.html`) for instant deep categorization.
   - Real numerical age and gender estimation via **Face-API `AgeGenderNet`** (`~17 years`, `~24 years`).
   - 4 engineering simulation games, career quiz, college pathway directory, and roadmap planner.
   - Background neural pre-warming upon site visit for zero-lag detection.
   - Admin site control room with Suite Version Lock (`Dynamic`, `v1`, `v2`, `v3`, `v4`, `v5`).
   - Experimental laptop relay ping (`http://127.0.0.1:8765`).

2. **v2 — Secure Suite & Kinematics (`/v2`)**:
   - *Everything in v1*, plus:
   - **Client-Side AES-GCM (256-bit) Encrypted Dataset Vault**: Encrypts captured frames and classifications before storage; supports dispatching to Telegram Bot or GitHub repository without exposing images to unauthorized visitors.
   - **Live Broadcast Video Recorder**: WebM broadcast stream capture with lower-third telemetry and relay forwarding.
   - **Interactive AI Hand-Gesture Rover & Arm Arena**: Steer a simulated rover and clamp robotic grippers in real-time using webcam hand gestures or touch/mouse.
   - **Global Robotics Competitions Directory**: Searchable, filterable calendar covering WRO, FIRST FRC/FTC, VEX, RoboCup, NASA Lunabotics, University Rover Challenge, and Technoxian.
   - **Terms of Service & Privacy Policy**: Dedicated modal sheets detailing student data protection and ethical AI use.

3. **v3 — Teachable Vision Studio (`/v3`)**:
   - *Everything in v2*, plus:
   - **WitBlox In-Browser AI Vision Trainer**: Modeled after `https://ai.witblox.com/witblox-ai-vision/app1.html`.
   - **6-Port Robotics Bus**: Port 1 (`inp1`), Port 2 (`inp2`), Port 3 (`inp3`), Port 4 (`inp4`), Reducer 1 (`inp5` - 50% Speed Trim), Reducer 2 (`inp6` - E-Brake Halt).
   - **Hold-to-Train Burst Collector**: Train custom classes in seconds using MobileNet deep activation embeddings (`net.infer(video, true)`) and `@tensorflow-models/knn-classifier`.
   - **Real-Time Confidence Gauge & Virtual Hardware LEDs**: 0–100% animated confidence meter and virtual GPIO indicator lights.
   - **Classifier Weights Export/Import**: Download or upload complete model weight tensors as JSON.

4. **v4 — Cybernetic Sensor Telemetry & PID Controls (`/v4`)**:
   - *Everything in v3*, plus:
   - **Cyberpunk 360° LIDAR Raycast Radar**: HTML5 canvas casting 180 distance rays against obstacles in a room with a rotating sweep beam, phosphorescent point clouds, and obstacle collision zones.
   - **Web Audio API Acoustic Sonar Pings**: Frequency-modulated acoustic pings (420 Hz clear, 650 Hz warning, 1100 Hz critical danger) synthesized in real-time.
   - **Closed-Loop PID Motor Controller Tuner**: Calibrate Proportional ($K_p$), Integral ($K_i$), and Derivative ($K_d$) gains on a live oscilloscope step-response chart with real-time Rise Time ($t_r$), Overshoot ($M_p$), and Settling Time ($t_s$) calculations.

5. **v5 — Autonomous Racing & Hardware Firmware Studio (`/v5`)**:
   - *Everything in v4*, plus:
   - **Autonomous Multi-Bot Grand Prix Arena**: 2D physics racetrack where visitors tune sensor lookahead radius, steering aggression, and max throttle to race their autonomous rover against 3 AI driver personas (*Apex Neural*, *Titanium Alpha*, *Viper Turbo*) with live lap timing and telemetry.
   - **Embedded Firmware Blueprint Studio**: Generates production-ready, ready-to-flash sketches for physical microcontrollers:
     - **Arduino C++ (`.ino`)**: PWM motor driver (L298N/TB6612) + UART vision telemetry listener.
     - **ESP32 FreeRTOS (`.cpp`)**: Dual-core architecture pinning vision telemetry to Core 0 and PID motor loop to Core 1.
     - **Raspberry Pi Pico / MicroPython (`.py`)**: PWM motor channels and ultrasonic interrupt routines.
   - Hardware Pinout Schematic & Bill of Materials table.

---

## Universal Version Switcher & Admin Control Room

- **Brand Switcher Badge**: Every edition displays a sleek `[v ▾]` badge directly beside the `roboverse.` brand mark. Clicking it opens a dropdown allowing instant navigation between **v1, v2, v3, v4, and v5**.
- **Admin Lock Protection**: Secret 5-click easter egg on the brand mark or the footer secret link opens the **Site Control Room**. Administrators can set **Locked Suite Edition** to lock the website to a single edition (e.g. `Lock to v3`). When locked, the switcher badge is hidden from visitors and any foreign URL automatically redirects to the chosen version.

---

## Deploying to Cloudflare (2 Easy Options)

### Option A: Cloudflare Pages (Recommended — 1-click & fastest)

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) ➔ **Workers & Pages** ➔ **Create application** ➔ **Pages** ➔ **Connect to Git**.
2. Select your repository: `bhavyakumar-dev/RAI-CareerFair`.
3. Set the build settings:
   - **Framework preset**: `None`
   - **Build command**: `npm run build` *(or leave empty)*
   - **Build output directory**: `public`
   - **Root directory**: `/` *(leave default)*
4. Click **Save and Deploy**. Your site will be live instantly on `*.pages.dev`!

---

### Option B: Cloudflare Workers (Native Git Integration)

1. Open the [Cloudflare dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** ➔ **Create application** ➔ **Workers** ➔ **Connect to Git**.
2. Select your repository (`bhavyakumar-dev/RAI-CareerFair`).
3. Configure build settings:
   - **Root directory**: `/`
   - **Build command**: `npm install`
   - **Deploy command**: `npm run deploy`
   - **Build output directory**: *(leave empty — `wrangler.jsonc` automatically serves `./public` through Static Assets)*
4. Click **Deploy**. Cloudflare will deploy and assign a `*.workers.dev` URL. All subsequent git pushes will auto-deploy.

---

## Local Development

Install Node.js 20 or newer, then open a terminal at the folder root and run:

```bash
npm install
npx wrangler dev
```
Open `http://localhost:8787` in your browser.
