# ROBOVERSE — Robotics & AI Discovery Lab

A colorful, mobile-friendly Robotics & AI exhibition website and neural computer vision laboratory with interactive engineering games, a career quiz, college pathways, a roadmap builder, and advanced on-device AI tools.

## Multi-Version Experience Suite

1. **v1 — Classic Pavilion (`/` or `index.html`)**: The flagship discovery lab with 3D Three.js interactive robot, continuous live on-device vision powered by **COCO-SSD** and **WitBlox MobileNet**, real numerical age/gender estimation via **Face-API `AgeGenderNet`**, 4 engineering simulation games, and experimental laptop relay ping.
2. **v2 — Advanced Neural Suite (`/v2` or `v2.html`)**: The expanded edition featuring:
   - **Client-Side AES-GCM (256-bit) Encrypted Dataset Vault**: Encrypts captured frames and classifications before storage; supports dispatching to Telegram Bot or GitHub repository without exposing images to unauthorized visitors.
   - **Live Broadcast Video Recorder**: WebM broadcast stream capture with lower-third telemetry and relay forwarding.
   - **Interactive AI Hand-Gesture Rover & Arm Arena**: Steer a simulated rover and clamp robotic grippers in real-time using webcam hand gestures or touch/mouse.
   - **Global Robotics Competitions Directory**: Searchable, filterable calendar covering WRO, FIRST FRC/FTC, VEX, RoboCup, NASA Lunabotics, University Rover Challenge, and Technoxian.
   - **Terms of Service & Privacy Policy**: Dedicated modal sheets detailing student data protection and ethical AI use.

## Neural Vision & What Runs Where

- **Object Detection**: Runs in the visitor's browser using **TensorFlow.js COCO-SSD**, detecting 80 common object classes with real-time bounding boxes and confidence scores.
- **Scene Classification**: Powered by the official **WitBlox MobileNet** model (`https://ai.witblox.com/witblox-ai-vision/app1.html`) for instant deep categorization.
- **Age & Gender Estimation**: Uses **Face-API `AgeGenderNet`** for realistic numerical age predictions (`~17 years`, `~24 years`) and gender metrics.
- **Image Privacy**: Captured frames are processed 100% on-device in the visitor's browser. When dataset capture is enabled in `/v2`, all records are AES-256 encrypted using an Admin Passphrase before transmission.
- **Zero Secrets Required**: No server API keys, Python servers, or Docker containers required. Optional experimental relay connects to a local laptop host if running.

## Deploying to Cloudflare (2 Easy Options)

### Option A: Cloudflare Pages (Recommended — 1-click & fastest)

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Select your repository: `bhavyakumar-dev/RAI-CareerFair`.
3. Set the build settings:
   - **Framework preset**: `None`
   - **Build command**: `npm run build` *(or leave empty)*
   - **Build output directory**: `public`
   - **Root directory**: `/` *(leave default)*
4. Click **Save and Deploy**. Your site will be live instantly on `*.pages.dev`!

---

### Option B: Cloudflare Workers (Native Git Integration)

1. Open the [Cloudflare dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** → **Create application** → **Workers** → **Connect to Git**.
2. Select your repository (`bhavyakumar-dev/RAI-CareerFair`).
3. Configure build settings:
   - **Root directory**: `/`
   - **Build command**: `npm install`
   - **Deploy command**: `npm run deploy`
   - **Build output directory**: *(leave empty — `wrangler.jsonc` automatically serves `./public` through Static Assets)*
4. Click **Deploy**. Cloudflare will deploy and assign a `*.workers.dev` URL. All subsequent git pushes will auto-deploy.

Official guide: https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/

## Alternative: deploy from your computer

Install Node.js 20 or newer, then open a terminal at the folder root and run:

```powershell
npm install
npx wrangler login
npm run dev
```

Open the local address Wrangler prints. To publish, run:

```powershell
npm run deploy
```

## Using the Vision AI lab

1. Open the deployed website using HTTPS.
2. Scroll to **Computer vision workbench**.
3. Press **Choose a photo** or **Start camera**. Camera access is requested only after the button is pressed.
4. Press **Detect objects on-device**. The first run downloads model files and can be slower; later runs may use cached models.
5. Face estimates are off by default. If you are demonstrating the optional experimental feature, explicitly tick its checkbox before the scan and explain that the guesses may be wrong.

If the model fails to load, try a current version of Chrome or Edge, check that the browser can reach jsDelivr and GitHub Pages, and try again. Some school networks block public CDNs. The object detector uses WebGL by default and attempts WASM/CPU fallback where available.

## About the controls

The hidden site control room toggles sections and browser features. These settings are stored in local storage on that device only; they are not a secure admin system and do not synchronize across visitors. The leaderboard is also a local browser demo, not a school-wide shared ranking.

## Credits and notices

The browser vision section uses `@vladmandic/human` (MIT) and model files hosted by the project's public model repository. Site fonts, 3D rendering, and QR generation may also load from public CDNs. Verify all third-party licences and privacy expectations before using the site in a commercial setting or with a large school audience.
