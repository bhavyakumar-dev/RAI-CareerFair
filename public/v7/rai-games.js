(() => {
  const { el, Points, mount } = RAI;

  const chipRow = (labels, current, onPick) => {
    const row = el('div', { className: 'chips', role: 'tablist' });
    const paint = () => [...row.children].forEach((chip) => {
      chip.setAttribute('aria-pressed', String(chip.textContent === current()));
    });
    labels.forEach((label) => row.append(el('button', {
      className: 'chip', type: 'button', textContent: label,
      onclick: () => { onPick(label); paint(); }
    })));
    paint();
    return row;
  };

  const rand = (low, high) => low + Math.floor(Math.random() * (high - low + 1));
  const shuffle = (list) => list.map((item) => [Math.random(), item]).sort((a, b) => a[0] - b[0]).map(([, item]) => item);

  mount('paths', (root) => {
    const tabs = ['Careers', 'India routes', 'Study abroad'];
    const fields = ['All', ...new Set(RAI.careers.map((career) => career[1]))];
    let tab = tabs[0];
    let field = 'All';
    const grid = el('div', { className: 'cards' });
    const fieldRow = chipRow(fields, () => field, (value) => { field = value; draw(); });

    const routeCard = ([name, tag, detail, url]) => el('article', { className: 'card' },
      el('h3', {}, name), el('p', { className: 'tag' }, tag), el('p', {}, detail),
      url ? el('a', { href: url, target: '_blank', rel: 'noopener' }, 'Official site') : null);

    const careerCard = ([name, kind, what, skills, start]) => el('article', { className: 'card' },
      el('h3', {}, name), el('p', { className: 'tag' }, kind), el('p', {}, what),
      el('p', {}, el('b', {}, 'Learn: '), skills), el('p', {}, el('b', {}, 'Start with: '), start));

    function draw() {
      fieldRow.hidden = tab !== tabs[0];
      grid.replaceChildren(...(tab === tabs[0]
        ? RAI.careers.filter((career) => field === 'All' || career[1] === field).map(careerCard)
        : (tab === tabs[1] ? RAI.paths.india : RAI.paths.world).map(routeCard)));
    }

    root.append(
      chipRow(tabs, () => tab, (value) => { tab = value; draw(); }),
      fieldRow, grid,
      el('p', { className: 'note' }, 'Exam rules and dates change every year. Check each official site before you plan.')
    );
    draw();
  });

  mount('quiz', (root) => {
    let index = 0;
    let tally = {};

    const showResult = () => {
      const ranked = Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 3);
      Points.add('quiz', 20);
      root.replaceChildren(
        el('h3', {}, 'Your top three'),
        el('div', { className: 'cards' }, ranked.map(([key], rank) => el('article', { className: 'card' },
          el('p', { className: 'tag' }, rank === 0 ? 'Best match' : `Match ${rank + 1}`),
          el('h3', {}, RAI.roles[key][0]), el('p', {}, RAI.roles[key][1])))),
        el('button', { className: 'btn', type: 'button', onclick: () => { index = 0; tally = {}; ask(); } }, 'Take it again')
      );
    };

    function ask() {
      if (index >= RAI.quiz.length) return showResult();
      const [prompt, options] = RAI.quiz[index];
      root.replaceChildren(
        el('p', { className: 'stat' }, `Question ${index + 1} of ${RAI.quiz.length}`),
        el('h3', {}, prompt),
        el('div', { className: 'choices' }, options.map(([label, weights]) => el('button', {
          className: 'choice', type: 'button', textContent: label,
          onclick: () => {
            Object.entries(weights).forEach(([key, value]) => { tally[key] = (tally[key] ?? 0) + value; });
            index += 1;
            ask();
          }
        })))
      );
    }
    ask();
  });

  mount('maze', (root) => {
    const size = 15;
    const cell = 28;
    const start = [1, 1];
    const goal = [size - 2, size - 2];
    const walls = new Set();
    const results = {};
    const labels = { bfs: 'Breadth-first', astar: 'A*', greedy: 'Greedy' };
    const canvas = el('canvas', { className: 'maze', width: size * cell, height: size * cell });
    const ctx = canvas.getContext('2d');
    const stats = el('p', { className: 'stat' }, 'Tap or drag to draw walls, then run a search.');
    const key = (x, y) => y * size + x;
    const css = (name, fallback) => getComputedStyle(canvas).getPropertyValue(name).trim() || fallback;
    let runId = 0;

    const fill = (x, y, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x * cell + 1, y * cell + 1, cell - 2, cell - 2);
    };

    const paint = (seen = [], path = []) => {
      ctx.fillStyle = css('--maze-bg', '#fff');
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      seen.forEach(([x, y]) => fill(x, y, css('--maze-seen', '#b8d9ed')));
      path.forEach(([x, y]) => fill(x, y, css('--maze-path', '#ff6b3d')));
      walls.forEach((id) => fill(id % size, Math.floor(id / size), css('--maze-wall', '#17191f')));
      fill(...start, css('--maze-start', '#2f9e6b'));
      fill(...goal, css('--maze-goal', '#7a4dff'));
    };

    const search = (kind) => {
      const heuristic = (x, y) => Math.abs(x - goal[0]) + Math.abs(y - goal[1]);
      const priority = ([x, y, steps]) => (kind === 'astar' ? steps + heuristic(x, y) : heuristic(x, y));
      const open = [[...start, 0]];
      const cameFrom = new Map([[key(...start), -1]]);
      const best = new Map([[key(...start), 0]]);
      const closed = new Set();
      const order = [];
      while (open.length) {
        if (kind !== 'bfs') open.sort((a, b) => priority(a) - priority(b));
        const [x, y, steps] = open.shift();
        if (closed.has(key(x, y))) continue;
        closed.add(key(x, y));
        order.push([x, y]);
        if (x === goal[0] && y === goal[1]) {
          const path = [];
          for (let id = key(x, y); id !== -1; id = cameFrom.get(id)) path.unshift([id % size, Math.floor(id / size)]);
          return { order, path };
        }
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
          const nx = x + dx;
          const ny = y + dy;
          const id = key(nx, ny);
          const inside = nx >= 0 && ny >= 0 && nx < size && ny < size;
          if (!inside || walls.has(id) || closed.has(id)) return;
          if (!best.has(id) || steps + 1 < best.get(id)) {
            best.set(id, steps + 1);
            cameFrom.set(id, key(x, y));
            open.push([nx, ny, steps + 1]);
          }
        });
      }
      return { order, path: [] };
    };

    const summary = () => Object.entries(results)
      .map(([kind, { looked, steps }]) => `${labels[kind]}: ${looked} cells checked, ${steps} steps`).join('  |  ');

    const run = (kind) => {
      const token = ++runId;
      const { order, path } = search(kind);
      let shown = 0;
      const tick = () => {
        if (token !== runId) return;
        shown = Math.min(order.length, shown + 8);
        paint(order.slice(0, shown));
        if (shown < order.length) {
          requestAnimationFrame(tick);
          return;
        }
        paint(order, path);
        if (!path.length) {
          stats.textContent = 'No route exists. Open a gap in the walls.';
          return;
        }
        results[kind] = { looked: order.length, steps: path.length - 1 };
        stats.textContent = summary();
        Points.add('maze', Math.round((100 * path.length) / order.length));
      };
      tick();
    };

    const cellAt = (event) => {
      const box = canvas.getBoundingClientRect();
      return [
        Math.floor(((event.clientX - box.left) / box.width) * size),
        Math.floor(((event.clientY - box.top) / box.height) * size)
      ];
    };

    let painting = null;
    const edit = (event) => {
      const [x, y] = cellAt(event);
      const protectedCell = (x === start[0] && y === start[1]) || (x === goal[0] && y === goal[1]);
      if (protectedCell || x < 0 || y < 0 || x >= size || y >= size) return;
      if (painting) walls.add(key(x, y)); else walls.delete(key(x, y));
      runId += 1;
      paint();
    };
    canvas.addEventListener('pointerdown', (event) => {
      const [x, y] = cellAt(event);
      painting = !walls.has(key(x, y));
      canvas.setPointerCapture(event.pointerId);
      edit(event);
    });
    canvas.addEventListener('pointermove', (event) => { if (painting !== null) edit(event); });
    canvas.addEventListener('pointerup', () => { painting = null; });

    const randomWalls = () => {
      walls.clear();
      for (let id = 0; id < size * size; id++) {
        const x = id % size;
        const y = Math.floor(id / size);
        const keep = (x === start[0] && y === start[1]) || (x === goal[0] && y === goal[1]);
        if (!keep && Math.random() < 0.27) walls.add(id);
      }
      runId += 1;
      paint();
    };

    root.append(
      canvas,
      el('div', { className: 'row' },
        ...Object.entries(labels).map(([kind, label]) => el('button', { className: 'btn', type: 'button', textContent: label, onclick: () => run(kind) })),
        el('button', { className: 'btn alt', type: 'button', textContent: 'Random walls', onclick: randomWalls }),
        el('button', { className: 'btn alt', type: 'button', textContent: 'Clear', onclick: () => { walls.clear(); runId += 1; paint(); } })),
      stats,
      el('p', { className: 'note' }, 'A* uses distance to the goal to skip dead ends. Run all three on the same walls and compare.')
    );
    paint();
  });

  mount('sensors', (root) => {
    let mission = RAI.missions[0];
    const picked = new Set();
    const missionRow = el('div', { className: 'chips' });
    const parts = el('div', { className: 'cards parts' });
    const needs = el('ul', { className: 'needs' });
    const budget = el('p', { className: 'stat' });
    const verdict = el('p', { className: 'note' });
    const partById = new Map(RAI.parts.map((part) => [part[0], part]));
    const spent = () => [...picked].reduce((sum, id) => sum + partById.get(id)[2], 0);
    const covered = () => new Set([...picked].flatMap((id) => partById.get(id)[3]));

    const draw = () => {
      missionRow.replaceChildren(...RAI.missions.map((entry) => el('button', {
        className: 'chip', type: 'button', textContent: entry[0], 'aria-pressed': String(entry === mission),
        onclick: () => { mission = entry; picked.clear(); verdict.textContent = ''; draw(); }
      })));
      parts.replaceChildren(...RAI.parts.map(([id, name, cost]) => el('button', {
        className: 'choice', type: 'button', 'aria-pressed': String(picked.has(id)),
        textContent: `${name} (${cost})`,
        onclick: () => {
          if (picked.has(id)) picked.delete(id);
          else if (spent() + cost <= mission[1]) picked.add(id);
          else verdict.textContent = 'Not enough budget. Remove a part first.';
          draw();
        }
      })));
      const have = covered();
      needs.replaceChildren(...mission[2].map((need) => el('li', { className: have.has(need) ? 'ok' : 'miss' },
        `${have.has(need) ? 'Done' : 'Missing'}: ${RAI.needNames[need]}`)));
      budget.textContent = `Budget used: ${spent()} of ${mission[1]}`;
    };

    const test = () => {
      const have = covered();
      const met = mission[2].filter((need) => have.has(need)).length;
      const leftover = mission[1] - spent();
      const score = Math.round((met / mission[2].length) * 80 + (met === mission[2].length ? (leftover / mission[1]) * 20 : 0));
      Points.add('sensors', score);
      verdict.textContent = met === mission[2].length
        ? `Mission ready. Score ${score}. Spending less earns more.`
        : `Not yet. ${mission[2].length - met} need(s) missing. Score ${score}.`;
    };

    root.append(
      missionRow, budget, parts, needs,
      el('button', { className: 'btn', type: 'button', textContent: 'Test my robot', onclick: test }), verdict
    );
    draw();
  });

  const makeQuestion = () => {
    const kinds = [
      () => { const a = rand(2, 9); const d = rand(2, 7); return { seq: [0, 1, 2, 3, 4].map((i) => a + i * d), answer: a + 5 * d }; },
      () => { const a = rand(1, 4); const r = rand(2, 3); return { seq: [0, 1, 2, 3, 4].map((i) => a * r ** i), answer: a * r ** 5 }; },
      () => { const c = rand(0, 5); return { seq: [1, 2, 3, 4, 5].map((i) => i * i + c), answer: 36 + c }; },
      () => {
        const s = rand(5, 15); const up = rand(3, 8); const down = rand(1, 2);
        const seq = [s]; for (let i = 0; i < 4; i++) seq.push(seq[i] + (i % 2 === 0 ? up : -down));
        return { seq, answer: seq[4] + up };
      },
      () => { const x = rand(1, 4); const y = rand(2, 6); const seq = [x, y]; for (let i = 2; i < 5; i++) seq.push(seq[i - 1] + seq[i - 2]); return { seq, answer: seq[4] + seq[3] }; }
    ];
    const { seq, answer } = kinds[rand(0, kinds.length - 1)]();
    const options = new Set([answer]);
    while (options.size < 4) options.add(Math.max(1, answer + rand(-6, 6)));
    return { seq, answer, options: shuffle([...options]) };
  };

  mount('logic', (root) => {
    const total = 8;
    let round = 0;
    let right = 0;
    let began = 0;
    let quickBonus = 0;

    const finish = () => {
      const score = Math.round((right / total) * 80 + (quickBonus / total) * 20);
      Points.add('logic', score);
      root.replaceChildren(
        el('h3', {}, `Pattern score: ${score} out of 100`),
        el('p', {}, `${right} of ${total} correct. This is a practice puzzle set. It does not measure intelligence.`),
        el('button', { className: 'btn', type: 'button', textContent: 'Play again', onclick: () => { round = 0; right = 0; quickBonus = 0; next(); } })
      );
    };

    function next() {
      if (round >= total) return finish();
      const question = makeQuestion();
      began = performance.now();
      root.replaceChildren(
        el('p', { className: 'stat' }, `Puzzle ${round + 1} of ${total}`),
        el('h3', { className: 'seq' }, `${question.seq.join(', ')}, ?`),
        el('div', { className: 'choices' }, question.options.map((option) => el('button', {
          className: 'choice', type: 'button', textContent: String(option),
          onclick: () => {
            const seconds = (performance.now() - began) / 1000;
            if (option === question.answer) { right += 1; quickBonus += seconds < 8 ? 1 : seconds < 15 ? 0.5 : 0; }
            round += 1;
            next();
          }
        })))
      );
    }
    next();
  });
})();
