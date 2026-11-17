// Framework de slides interativos: registro de slides, passos, cena 3D, navegação, índice.
(function (g) {
  const $ = (s) => document.querySelector(s);
  const slides = [];
  const sections = [];
  let curSec = null;

  g.r = String.raw;

  const MACROS = {
    '\\R': '\\mathbb{R}', '\\abs': '\\left|#1\\right|', '\\V': '\\vec{#1}', '\\ang': '\\widehat{#1}',
    '\\ii': '\\vec{i}', '\\jj': '\\vec{j}', '\\kk': '\\vec{k}', '\\proj': '\\operatorname{proj}',
  };
  const MATH_OPTS = {
    delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
    macros: MACROS, throwOnError: false, strict: false,
  };
  const math = (el) => { try { renderMathInElement(el, MATH_OPTS); } catch (e) { console.warn(e); } };

  // ---------- helpers de conteúdo ----------
  g.box = (kind, title, html) => `<div class="box ${kind}"><b class="t">${title}</b>${html}</div>`;
  g.DEF = (t, h) => box('def', t, h);
  g.TIP = (t, h) => box('tip', t, h);
  g.WARN = (t, h) => box('warn', t, h);
  g.OK = (t, h) => box('ok', t, h);
  g.ANS = (h) => `<div class="ans"><b class="t">Resposta</b>${h}</div>`;

  // ---------- registro ----------
  const Deck = {
    section(name, key) {
      key = key || name;
      const old = sections.find((s) => s.key === key);
      if (old) { curSec = old; return; }
      curSec = { name, key, slides: [] }; sections.push(curSec);
    },
    // define a ordem final das seções (permite intercalar teoria e exercícios)
    order(keys) {
      const rank = (s) => { const i = keys.indexOf(s.key); return i < 0 ? 999 : i; };
      sections.sort((a, b) => rank(a) - rank(b));
      slides.length = 0;
      sections.forEach((s) => s.slides.forEach((x) => { x.idx = slides.length; slides.push(x); }));
    },
    slide(s) {
      s.kind = s.kind || 'teoria';
      s.sectionName = curSec.name;
      s.idx = slides.length;
      s.id = s.id || 's' + s.idx;
      s.steps = (s.steps || [{}]).map((x) => (typeof x === 'string' ? { h: x } : x));
      if (!s.steps.length) s.steps = [{}];
      slides.push(s); curSec.slides.push(s);
      return s;
    },
    // exercício resolvido: enunciado fixo, passo 0 = só enunciado + cena base
    ex(o) {
      const grp = o.g || 'E';
      const label = { E: 'Exercício', V: 'Exercício', R: 'Revisão' }[grp];
      const steps = [{ h: '', add: o.base || [] }];
      (o.steps || []).forEach((x) => steps.push(typeof x === 'string' ? { h: x } : x));
      if (o.ans) steps.push({ h: ANS(o.ans) + (grp === 'E' || grp === 'V' ? '<p class="gab" style="color:var(--muted);font-size:.8rem;margin:2px 0">✓ confere com o gabarito do material</p>' : ''), add: o.ansAdd || [], set: o.ansSet });
      return Deck.slide({
        id: grp + o.n, grp, n: o.n, kind: 'ex',
        title: o.t || `${label} ${o.n}`, stmt: o.stmt, steps, controls: o.controls, dyn: o.dyn,
        tagx: o.tag,
      });
    },
    start,
  };
  g.Deck = Deck;

  // ---------- estado ----------
  let scene, cur = { i: 0, step: 0 };
  const seen = new Set();
  let vals = {};
  try { JSON.parse(localStorage.getItem('vet.seen') || '[]').forEach((x) => seen.add(x)); } catch (e) {}

  // ---------- formatação de números ----------
  function fmtNum(x) {
    if (Math.abs(x - Math.round(x)) < 1e-9) return String(Math.round(x));
    for (let d = 2; d <= 12; d++) {
      const n = x * d;
      if (Math.abs(n - Math.round(n)) < 1e-9) { const a = Math.round(n); return `${a < 0 ? '-' : ''}\\frac{${Math.abs(a)}}{${d}}`; }
    }
    const s = x < 0 ? '-' : '', a = Math.abs(x);
    if (Math.abs(a * a - Math.round(a * a)) < 1e-9 && a * a <= 400) return `${s}\\sqrt{${Math.round(a * a)}}`;
    for (let k = 2; k <= 6; k++) { const q = a / k; if (Math.abs(q * q - Math.round(q * q)) < 1e-9 && q * q <= 100) return `${s}${k}\\sqrt{${Math.round(q * q)}}`; }
    return (Math.round(x * 100) / 100).toString();
  }
  function labelTex(l) {
    let a = false, s = String(l);
    if (s[0] === '>') { a = true; s = s.slice(1); }
    s = s.replace(/([_^])(\{[^}]*\}|.)/g, (m, k, v) => `${k}{${v.replace(/[{}]/g, '')}}`);
    const m = s.match(/^([^_^]+)(.*)$/);
    return a && m ? `\\vec{${m[1]}}${m[2]}` : s;
  }
  function legend(objs) {
    const L = $('#legend'); L.innerHTML = '';
    const seenL = new Set(); let n = 0;
    const manyPts = objs.filter((o) => o.p && o.l && !o.lg).length > 3; // evita poluição com muitos pontos
    for (const o of objs) {
      if (!o.l || o.nolg || n >= 7) continue;
      if (manyPts && o.p && !o.lg) continue;
      const key = o.l + (o.v ? 'v' : 'p');
      if (seenL.has(key)) continue;
      let tex;
      if (o.lg) tex = o.lg;
      else if (o.v) tex = `${labelTex(o.l)} = (${o.v.map(fmtNum).join(',\\,')})`;
      else if (o.p) tex = `${labelTex(o.l)}(${o.p.map(fmtNum).join(',\\,')})`;
      else continue;
      seenL.add(key); n++;
      const sp = document.createElement('span');
      const c = (g.PALETTE[o.c] || o.c || '#e8edf5');
      let html = '';
      try { html = katex.renderToString(tex, { macros: MACROS, throwOnError: false }); } catch (e) { html = tex; }
      sp.innerHTML = `<i style="background:${c}"></i>${html}`;
      L.appendChild(sp);
    }
  }

  // ---------- cena ----------
  function sceneFor(s, step) {
    let objs = [...(s.base || [])], view = null;
    for (let k = 0; k <= step; k++) {
      const st = s.steps[k];
      if (st.set) objs = [...st.set];
      if (st.add) objs.push(...st.add);
      if (st.view) view = st.view;
    }
    return { objs, view };
  }
  let lastDyn = null;
  function applyScene(instantDyn) {
    const s = slides[cur.i];
    const { objs, view } = sceneFor(s, cur.step);
    let all = objs;
    if (s.dyn) {
      const d = s.dyn(vals);
      all = objs.concat(d.objs || []);
      const ro = $('#readout');
      if (ro && d.info !== undefined) { ro.innerHTML = d.info; math(ro); }
    }
    scene.setObjects(all, { instant: !!instantDyn, view });
    legend(all);
  }

  // ---------- render de slide ----------
  function renderSlide() {
    const s = slides[cur.i];
    $('#tags').innerHTML = `<span class="tag">${s.sectionName}</span><span class="tag k-${s.kind}">${{ teoria: 'Teoria', ex: 'Exercício resolvido'}[s.kind]}</span>` + (s.tagx ? `<span class="tag">${s.tagx}</span>` : '');
    $('#title').innerHTML = s.title;
    const st = $('#stmt'); st.innerHTML = s.stmt || ''; math(st);
    const box = $('#steps'); box.innerHTML = '';
    s.steps.forEach((x, k) => {
      const d = document.createElement('section');
      d.className = 'step'; d.dataset.k = k; d.innerHTML = x.h || '';
      if (x.h) math(d);
      box.appendChild(d);
    });
    // controles interativos
    const live = $('#live'); live.innerHTML = '';
    vals = {};
    if (s.controls) {
      s.controls.forEach((c) => {
        vals[c.id] = c.val;
        const w = document.createElement('div'); w.className = 'ctrl';
        w.innerHTML = `<label><span>${c.label}</span><b id="cv_${c.id}">${c.val}${c.unit || ''}</b></label><input type="range" min="${c.min}" max="${c.max}" step="${c.step || 1}" value="${c.val}">`;
        w.querySelector('input').addEventListener('input', (e) => {
          vals[c.id] = +e.target.value;
          w.querySelector('b').textContent = e.target.value + (c.unit || '');
          applyScene(true);
        });
        live.appendChild(w);
      });
      const ro = document.createElement('div'); ro.className = 'readout'; ro.id = 'readout'; live.appendChild(ro);
    }
    $('#panel').scrollTop = 0;
    $('#crumb').textContent = s.sectionName;
    seen.add(s.id);
    try { localStorage.setItem('vet.seen', JSON.stringify([...seen])); localStorage.setItem('vet.pos', s.id); } catch (e) {}
    $('#progress').style.width = ((cur.i + 1) / slides.length) * 100 + '%';
    $('#count').textContent = `${cur.i + 1} / ${slides.length}`;
    // pontos de passo
    const dots = $('#dots'); dots.innerHTML = '';
    if (s.steps.length > 1) s.steps.forEach((_, k) => {
      const i = document.createElement('i'); i.addEventListener('click', () => setStep(k)); dots.appendChild(i);
    });
    markIndex();
  }

  function setStep(k, fromNav) {
    const s = slides[cur.i];
    cur.step = Math.max(0, Math.min(s.steps.length - 1, k));
    document.querySelectorAll('#steps .step').forEach((el) => {
      const i = +el.dataset.k;
      el.style.display = i <= cur.step && s.steps[i].h ? '' : 'none';
      el.classList.toggle('cur', i === cur.step);
      el.classList.toggle('old', i < cur.step);
    });
    document.querySelectorAll('#dots i').forEach((d, i) => { d.classList.toggle('on', i <= cur.step); d.classList.toggle('cur', i === cur.step); });
    const hint = $('#hint');
    hint.textContent = s.kind !== 'teoria' && cur.step === 0 && s.steps.length > 1 ? 'Tente resolver sozinho primeiro! Pressione → para ver a resolução passo a passo.' : '';
    // rolagem até o passo atual
    let target = null;
    document.querySelectorAll('#steps .step').forEach((el) => { if (+el.dataset.k === cur.step && el.style.display !== 'none') target = el; });
    if (target && cur.step > 0) requestAnimationFrame(() => target.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
    $('#prev').disabled = cur.i === 0 && cur.step === 0;
    $('#next').disabled = cur.i === slides.length - 1 && cur.step === s.steps.length - 1;
    applyScene(false);
    try { history.replaceState(null, '', `#/${s.id}/${cur.step}`); } catch (e) {}
  }

  function go(i, step = 0) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    const changed = i !== cur.i || !$('#title').innerHTML;
    cur.i = i;
    if (changed) renderSlide();
    setStep(step);
  }
  const next = () => { const s = slides[cur.i]; if (cur.step < s.steps.length - 1) setStep(cur.step + 1); else if (cur.i < slides.length - 1) go(cur.i + 1, 0); };
  const prev = () => { if (cur.step > 0) setStep(cur.step - 1); else if (cur.i > 0) go(cur.i - 1, slides[cur.i - 1].steps.length - 1); };

  // ---------- índice e grade de exercícios ----------
  function buildIndex() {
    const body = $('#drawerBody'); body.innerHTML = '';
    sections.forEach((sec) => {
      const h = document.createElement('div'); h.className = 'sec'; h.textContent = sec.name; body.appendChild(h);
      sec.slides.forEach((s) => {
        const b = document.createElement('button'); b.className = 'item'; b.dataset.id = s.id;
        const label = s.kind === 'teoria' ? s.title : `${s.grp === 'E' ? 'Ex' : s.grp === 'V' ? 'Ex' : s.grp} ${s.n}${s.t ? ' · ' + s.t : ''}`;
        b.innerHTML = `<span class="n">${s.idx + 1}</span><span>${label}</span><span class="ck"></span>`;
        b.addEventListener('click', () => { go(s.idx, 0); closeDrawer(); });
        body.appendChild(b);
      });
    });
  }
  function markIndex() {
    document.querySelectorAll('#drawerBody .item').forEach((b) => {
      const s = slides.find((x) => x.id === b.dataset.id);
      b.classList.toggle('cur', s.idx === cur.i);
      b.querySelector('.ck').textContent = seen.has(s.id) && s.idx !== cur.i ? '✓' : '';
    });
  }
  function openDrawer() {
    $('#drawer').classList.add('open'); $('#scrim').classList.add('on');
    const c = document.querySelector('#drawerBody .item.cur'); if (c) c.scrollIntoView({ block: 'center' });
  }
  function closeDrawer() { $('#drawer').classList.remove('open'); $('#scrim').classList.remove('on'); }
  function buildExGrid() {
    const box = $('#exGrid'); box.innerHTML = '';
    const groups = [['E', 'Produto escalar (1–50)'], ['V', 'Produto vetorial (1–29)'], ['R', 'Revisão de vetores']];
    groups.forEach(([gk, name]) => {
      const list = slides.filter((s) => s.grp === gk);
      if (!list.length) return;
      const h = document.createElement('h4'); h.textContent = name; box.appendChild(h);
      const row = document.createElement('div'); row.className = 'row';
      list.sort((a, b) => a.n - b.n).forEach((s) => {
        const b = document.createElement('button'); b.textContent = s.n; b.dataset.id = s.id; b.title = `Ir para ${s.title} (slide ${s.idx + 1})`;
        b.addEventListener('click', () => { go(s.idx, 0); toggleModal('#exModal', false); });
        row.appendChild(b);
      });
      box.appendChild(row);
    });
  }
  function toggleModal(sel, on) {
    const m = $(sel);
    if (on) {
      if (sel === '#exModal') document.querySelectorAll('#exGrid button').forEach((b) => { b.classList.toggle('seen', seen.has(b.dataset.id)); b.classList.toggle('cur', b.dataset.id === slides[cur.i].id); });
      m.classList.add('open');
    } else m.classList.remove('open');
  }

  // ---------- inicialização ----------
  function start() {
    scene = new Scene3D($('#cv')); g.__scene = scene;
    Deck.go = go; Deck.all = slides; Deck.setStep = setStep; // úteis para depuração
    let theme = 'dark';
    try { theme = localStorage.getItem('vet.theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); } catch (e) {}
    const setTheme = (t) => { document.documentElement.dataset.theme = t; scene.setTheme(t); try { localStorage.setItem('vet.theme', t); } catch (e) {} };
    setTheme(theme);
    buildIndex(); buildExGrid();

    $('#next').addEventListener('click', next); $('#prev').addEventListener('click', prev);
    $('#btnIndex').addEventListener('click', openDrawer); $('#closeDrawer').addEventListener('click', closeDrawer); $('#scrim').addEventListener('click', closeDrawer);
    $('#btnEx').addEventListener('click', () => toggleModal('#exModal', true)); $('#closeEx').addEventListener('click', () => toggleModal('#exModal', false));
    $('#btnHelp').addEventListener('click', () => toggleModal('#helpModal', true)); $('#closeHelp').addEventListener('click', () => toggleModal('#helpModal', false));
    document.querySelectorAll('.modal').forEach((m) => m.addEventListener('click', (e) => { if (e.target === m) m.classList.remove('open'); }));
    $('#btnTheme').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
    $('#tReset').addEventListener('click', () => scene.resetView());
    const tRot = $('#tRot'); tRot.classList.add('on');
    const toggleRot = () => { scene.auto = !scene.auto; tRot.classList.toggle('on', scene.auto); };
    tRot.addEventListener('click', toggleRot);
    const tGrid = $('#tGrid'); tGrid.classList.add('on');
    const toggleGrid = () => { scene.showGrid = !scene.showGrid; tGrid.classList.toggle('on', scene.showGrid); };
    tGrid.addEventListener('click', toggleGrid);
    const toggleFocus = () => { $('#deck').classList.toggle('focus'); $('#tFocus').classList.toggle('on'); setTimeout(() => scene.resize(), 50); };
    $('#tFocus').addEventListener('click', toggleFocus);

    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
      switch (e.key) {
        case 'ArrowRight': case 'PageDown': case ' ': case 'Enter': if (tag === 'button' && e.key !== 'ArrowRight' && e.key !== 'PageDown') return; e.preventDefault(); next(); break;
        case 'ArrowLeft': case 'PageUp': e.preventDefault(); prev(); break;
        case 'Home': go(0, 0); break;
        case 'End': go(slides.length - 1, 0); break;
        case 'i': case 'I': $('#drawer').classList.contains('open') ? closeDrawer() : openDrawer(); break;
        case 'e': case 'E': toggleModal('#exModal', !$('#exModal').classList.contains('open')); break;
        case 'r': case 'R': toggleRot(); break;
        case 'g': case 'G': toggleGrid(); break;
        case 'f': case 'F': toggleFocus(); break;
        case 't': case 'T': $('#btnTheme').click(); break;
        case '?': toggleModal('#helpModal', true); break;
        case 'Escape': closeDrawer(); document.querySelectorAll('.modal').forEach((m) => m.classList.remove('open')); break;
      }
    });

    // posição inicial: hash > último slide > capa
    let i = 0, st = 0;
    const m = location.hash.match(/^#\/([^/]+)(?:\/(\d+))?/);
    let id = m ? m[1] : null; if (m && m[2]) st = +m[2];
    if (!id) { try { id = localStorage.getItem('vet.pos'); } catch (e) {} }
    const f = slides.find((s) => s.id === id); if (f) i = f.idx;
    cur.i = i; renderSlide(); setStep(st);
    window.addEventListener('hashchange', () => {
      const mm = location.hash.match(/^#\/([^/]+)(?:\/(\d+))?/);
      if (!mm) return; const s = slides.find((x) => x.id === mm[1]);
      if (s && (s.idx !== cur.i || +(mm[2] || 0) !== cur.step)) go(s.idx, +(mm[2] || 0));
    });
  }
})(window);
