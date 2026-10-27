(() => {
  const canvas = document.getElementById('stage');
  if (!canvas || !window.THREE) return;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0.4, 11);

  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const keyLight = new THREE.DirectionalLight(0xffe2a8, 1.1);
  keyLight.position.set(4, 6, 6);
  const rimLight = new THREE.PointLight(0x52e0c4, 1.3, 40);
  rimLight.position.set(-6, 2, -3);
  scene.add(keyLight, rimLight);

  const paint = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.28, ...extra });
  const add = (parent, geometry, material, x = 0, y = 0, z = 0) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };

  const robot = new THREE.Group();
  const head = new THREE.Group();
  head.position.y = 1.9;
  robot.add(head);

  add(head, new THREE.BoxGeometry(1.7, 1.35, 1.35), paint(0xf1e3c8));
  [-0.4, 0.4].forEach((x) => add(head, new THREE.SphereGeometry(0.19, 20, 20), paint(0x52e0c4, { emissive: 0x52e0c4, emissiveIntensity: 0.9 }), x, 0.1, 0.7));
  add(head, new THREE.BoxGeometry(0.7, 0.1, 0.05), paint(0x7a1f2b), 0, -0.35, 0.69);
  add(head, new THREE.CylinderGeometry(0.05, 0.05, 0.55, 12), paint(0x8d8d8d), 0, 0.95, 0);
  const beacon = add(head, new THREE.SphereGeometry(0.15, 16, 16), paint(0xff7a59, { emissive: 0xff7a59, emissiveIntensity: 0.8 }), 0, 1.3, 0);

  add(robot, new THREE.BoxGeometry(2.1, 1.9, 1.25), paint(0xe8c872), 0, 0.35, 0);
  add(robot, new THREE.BoxGeometry(0.9, 0.6, 0.06), paint(0x7a1f2b), 0, 0.45, 0.65);
  [-1.45, 1.45].forEach((x) => {
    add(robot, new THREE.CylinderGeometry(0.2, 0.2, 1.5, 16), paint(0x9b8cff), x, 0.35, 0);
    add(robot, new THREE.SphereGeometry(0.3, 16, 16), paint(0xff7a59), x, -0.5, 0);
  });
  [-0.55, 0.55].forEach((x) => add(robot, new THREE.CylinderGeometry(0.26, 0.3, 1.1, 16), paint(0x2d5a37), x, -1.2, 0));
  scene.add(robot);

  const rings = [[3.1, 0xe8c872, 0.4, 0.2], [3.7, 0x52e0c4, 1.2, -0.5], [4.3, 0x9b8cff, 0.8, 0.9]].map(([radius, color, tiltX, tiltZ]) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.035, 12, 120), paint(color, { emissive: color, emissiveIntensity: 0.35 }));
    ring.rotation.set(tiltX, 0, tiltZ);
    robot.add(ring);
    return ring;
  });

  const dustCount = 180;
  const dustPositions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    const radius = 5 + Math.random() * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    dustPositions.set([radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta)], i * 3);
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0xe8c872, size: 0.07 }));
  robot.add(dust);

  let baseY = 0;
  const aim = { x: 0, y: 0 };
  addEventListener('pointermove', (event) => {
    aim.x = event.clientX / innerWidth - 0.5;
    aim.y = event.clientY / innerHeight - 0.5;
  });

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = canvas;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const wide = width > 820;
    baseY = wide ? -0.3 : 1.6;
    robot.position.set(wide ? 3 : 0, baseY, 0);
    robot.scale.setScalar(wide ? 1 : 0.7);
    draw(0);
  };

  const draw = (time) => {
    const seconds = time / 1000;
    robot.rotation.y = Math.sin(seconds * 0.5) * 0.35 + scrollY / innerHeight * 0.6;
    robot.position.y = baseY + Math.sin(seconds * 1.4) * 0.12;
    head.rotation.y += (aim.x * 1.1 - head.rotation.y) * 0.08;
    head.rotation.x += (aim.y * 0.6 - head.rotation.x) * 0.08;
    beacon.scale.setScalar(1 + Math.sin(seconds * 4) * 0.25);
    rings.forEach((ring, index) => { ring.rotation.z += 0.003 * (index + 1) * (index % 2 ? -1 : 1); });
    dust.rotation.y = seconds * 0.05;
    renderer.render(scene, camera);
  };

  let visible = true;
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(canvas);
  new ResizeObserver(resize).observe(canvas);

  if (reduceMotion) return;
  const loop = (time) => {
    if (visible && !document.hidden) draw(time);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
})();
