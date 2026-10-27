(() => {
  const mounts = new Map();
  const scripts = new Map();

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const el = (tag, props = {}, ...kids) => {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([name, value]) => {
      if (/^(aria-|data-)/.test(name) || name === 'role') node.setAttribute(name, value);
      else node[name] = value;
    });
    node.append(...kids.flat().filter((kid) => kid != null));
    return node;
  };

  const loadScript = (url) => {
    if (!scripts.has(url)) {
      scripts.set(url, new Promise((resolve, reject) => {
        document.head.append(el('script', {
          src: url,
          onload: resolve,
          onerror: () => reject(new Error(`Could not load ${url}`))
        }));
      }));
    }
    return scripts.get(url);
  };

  const Points = {
    key: 'rai.best',
    read() {
      try {
        return JSON.parse(localStorage.getItem(this.key)) ?? {};
      } catch (error) {
        if (error instanceof DOMException || error instanceof SyntaxError) return {};
        throw error;
      }
    },
    total() {
      return Object.values(this.read()).reduce((sum, value) => sum + value, 0);
    },
    add(game, score) {
      const best = this.read();
      if (score <= (best[game] ?? 0)) return;
      best[game] = score;
      try {
        localStorage.setItem(this.key, JSON.stringify(best));
      } catch (error) {
        if (!(error instanceof DOMException)) throw error;
      }
      this.paint();
    },
    paint() {
      $$('[data-points]').forEach((node) => { node.textContent = this.total(); });
    }
  };

  const api = async (path, body) => {
    const response = await fetch(`/api/admin/${path}`, {
      method: body ? 'POST' : 'GET',
      credentials: 'same-origin',
      headers: body ? { 'content-type': 'application/json' } : undefined,
      body: body && JSON.stringify(body)
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error ?? 'Request failed');
    return payload;
  };

  const applySettings = (settings) => {
    RAI.features.forEach(([key]) => {
      const hidden = settings.features?.[key] === false;
      $$(`[data-feature="${key}"]`).forEach((node) => { node.hidden = hidden; });
    });
    $$('[data-school]').forEach((node) => {
      node.hidden = settings.showSchoolName === false;
      if (settings.schoolName) node.textContent = settings.schoolName;
    });
  };

  const loadSettings = async () => {
    try {
      return (await api('public')).settings ?? {};
    } catch {
      return {};
    }
  };

  const adminPanel = (dialog, settings) => {
    const features = settings.features ?? {};
    const form = el('form', { className: 'admin-form', method: 'dialog' });
    form.append(el('h2', {}, 'Site controls'));
    RAI.features.forEach(([key, label]) => {
      form.append(el('label', { className: 'switch' },
        el('input', { type: 'checkbox', name: key, checked: features[key] !== false }), label));
    });
    form.append(
      el('label', { className: 'switch' },
        el('input', { type: 'checkbox', name: 'showSchoolName', checked: settings.showSchoolName !== false }), 'Show school name'),
      el('input', { name: 'schoolName', value: settings.schoolName ?? '', maxLength: 80, placeholder: 'School name' }),
      el('p', { className: 'note admin-status' }),
      el('div', { className: 'row' },
        el('button', { className: 'btn', type: 'submit' }, 'Save changes'),
        el('button', { className: 'btn alt', type: 'button', onclick: () => dialog.close() }, 'Close'))
    );
    form.onsubmit = async (event) => {
      event.preventDefault();
      const status = $('.admin-status', form);
      const data = new FormData(form);
      try {
        const saved = await api('settings', {
          features: Object.fromEntries(RAI.features.map(([key]) => [key, data.has(key)])),
          showSchoolName: data.has('showSchoolName'),
          schoolName: String(data.get('schoolName') ?? '').trim()
        });
        applySettings(saved.settings);
        status.textContent = 'Saved. Visitors see the change on their next load.';
      } catch (error) {
        status.textContent = error.message;
      }
    };
    dialog.replaceChildren(form);
  };

  const adminLogin = (dialog) => {
    const form = el('form', { className: 'admin-form' },
      el('h2', {}, 'Organiser sign in'),
      el('input', { name: 'username', placeholder: 'User ID', autocomplete: 'username', required: true }),
      el('input', { name: 'password', type: 'password', placeholder: 'Password', autocomplete: 'current-password', required: true }),
      el('p', { className: 'note admin-status' }),
      el('div', { className: 'row' },
        el('button', { className: 'btn', type: 'submit' }, 'Sign in'),
        el('button', { className: 'btn alt', type: 'button', onclick: () => dialog.close() }, 'Close'))
    );
    form.onsubmit = async (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      try {
        const session = await api('login', data);
        adminPanel(dialog, session.settings ?? {});
      } catch (error) {
        $('.admin-status', form).textContent = error.message;
      }
    };
    dialog.replaceChildren(form);
  };

  const openAdmin = async () => {
    const dialog = $('dialog.admin') ?? document.body.appendChild(el('dialog', { className: 'admin' }));
    try {
      adminPanel(dialog, (await api('settings')).settings ?? {});
    } catch {
      adminLogin(dialog);
    }
    if (!dialog.open) dialog.showModal();
  };

  const wireAdminTrigger = () => {
    let taps = 0;
    let timer;
    $$('[data-admin-tap]').forEach((node) => node.addEventListener('click', () => {
      taps += 1;
      clearTimeout(timer);
      timer = setTimeout(() => { taps = 0; }, 3500);
      if (taps >= 5) {
        taps = 0;
        openAdmin();
      }
    }));
    if (location.hash === '#admin') openAdmin();
  };

  const mountLeaderboard = (root) => {
    const board = el('ol', { className: 'board' });
    const status = el('p', { className: 'note' });
    const nickname = el('input', { maxLength: 16, placeholder: 'Nickname', 'aria-label': 'Nickname' });
    const grade = el('select', { 'aria-label': 'Class' },
      ...[6, 7, 8, 9, 10, 11, 12].map((value) => el('option', { value: `Class ${value}` }, `Class ${value}`)));
    const consent = el('input', { type: 'checkbox' });
    const post = el('button', { className: 'btn', type: 'button' }, 'Post my score');

    const refresh = async () => {
      board.replaceChildren();
      try {
        const { entries = [] } = await (await fetch('/api/leaderboard')).json();
        entries.slice(0, 10).forEach((entry) => board.append(
          el('li', {}, el('b', {}, entry.nickname), ` ${entry.grade ?? ''}`, el('span', {}, `${entry.score} pts`))));
        if (!entries.length) status.textContent = 'No scores yet. Be the first.';
      } catch {
        status.textContent = 'The leaderboard is offline right now.';
      }
    };

    post.onclick = async () => {
      if (!consent.checked) {
        status.textContent = 'Tick the box to allow your nickname and score to be shown.';
        return;
      }
      if (!nickname.value.trim()) {
        status.textContent = 'Choose a nickname first. Do not use your real name.';
        return;
      }
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nickname: nickname.value.trim(), grade: grade.value, score: Points.total(),
          fluency: 0, clarity: 0, consent: true
        })
      }).catch(() => null);
      status.textContent = response?.ok ? 'Posted.' : 'Could not post. Try again in a moment.';
      if (response?.ok) refresh();
    };

    root.append(
      el('p', { className: 'stat' }, 'Your total: ', el('b', { 'data-points': '' }, '0'), ' points'),
      el('div', { className: 'row' }, nickname, grade),
      el('label', { className: 'switch' }, consent, 'Show my nickname, class and score on the school leaderboard'),
      post, status, board
    );
    refresh();
  };

  const boot = async () => {
    $$('[data-mount]').forEach((node) => mounts.get(node.dataset.mount)?.(node));
    Points.paint();
    wireAdminTrigger();
    applySettings(await loadSettings());
  };

  mounts.set('leaderboard', mountLeaderboard);

  window.RAI.$ = $;
  window.RAI.$$ = $$;
  window.RAI.el = el;
  window.RAI.loadScript = loadScript;
  window.RAI.Points = Points;
  window.RAI.mount = (name, fn) => mounts.set(name, fn);
  document.addEventListener('DOMContentLoaded', boot);
})();
