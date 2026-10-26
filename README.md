# ROBOVERSE — Robotics & AI Discovery Lab

A colorful, mobile-friendly Robotics & AI website with interactive engineering games, a career quiz, college pathways, a practical roadmap builder, local score tracking, and a computer-vision lab.

## What runs where?

- **The whole site:** served as static assets by Cloudflare Workers.
- **Object detection:** runs in the visitor's browser using the [Human library](https://github.com/vladmandic/human), which provides browser ML and a MobileNet-based CenterNet object detector. It detects common objects and draws real bounding boxes; it is not a fake overlay.
- **Optional face demo:** with a separate opt-in, the same browser library can produce rough face-age and binary gender-model estimates. Those guesses can be inaccurate or biased and are not identity or gender-identity facts. Never use them to make decisions about people. For school demos, get permission before analysing someone else's image.
- **Image privacy:** captured frames and selected photos are processed in the browser and are not sent to the website or an inference API. On first use, the browser downloads the JavaScript runtime and model weights from public CDNs; the library can cache models for later visits. Internet access is needed for first-time setup.
- **No secrets:** no API keys, Python server, Docker, Workers AI binding, or external inference endpoint is needed.

The current browser vision model performs general object detection, not Ultralytics YOLO or native OpenCV. This is deliberate: it keeps the deployable site static while running inference on the visitor's device.

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
