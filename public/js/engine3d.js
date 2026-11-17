// Motor 3D (R³) em canvas 2D: projeção em perspectiva suave, rotação por mouse/toque,
// rotação automática lenta, zoom, eixos com marcações, vetores, pontos, retas, planos, arcos...
(function (g) {
  const PALETTE = {
    u: '#4cc9f0', v: '#ff5d8f', w: '#ffd166', r: '#2ee6a6', o: '#ff9f43', p: '#b794f6',
    g: '#8b95a7', x: '#ff6b6b', y: '#51d88a', z: '#5aa9ff', white: '#e8edf5',
  };
  const THEMES = {
    dark: {
      bg1: '#0f1624', bg2: '#070b13', grid: 'rgba(140,160,200,0.10)', gridStrong: 'rgba(140,160,200,0.22)',
      axis: 'rgba(205,215,235,0.75)', axisNeg: 'rgba(205,215,235,0.28)', text: '#e8edf5', muted: 'rgba(200,210,230,0.55)',
      halo: 'rgba(7,11,19,0.85)',
    },
    light: {
      bg1: '#ffffff', bg2: '#e9eef7', grid: 'rgba(40,60,100,0.10)', gridStrong: 'rgba(40,60,100,0.22)',
      axis: 'rgba(30,40,60,0.75)', axisNeg: 'rgba(30,40,60,0.28)', text: '#1a2233', muted: 'rgba(30,40,60,0.55)',
      halo: 'rgba(255,255,255,0.9)',
    },
  };
  const DEF_YAW = -2.25, DEF_PITCH = 0.42;
  const ease = (t) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
  const col = (c, def) => (c ? PALETTE[c] || c : def);

  class Scene3D {
    constructor(canvas) {
      this.cv = canvas;
      this.ctx = canvas.getContext('2d');
      this.theme = THEMES.dark;
      this.yaw = DEF_YAW; this.pitch = DEF_PITCH; this.zoom = 1;
      this.targetYaw = null;
      this.auto = true; this.speed = 0.11; this.idle = 10;
      this.showGrid = true;
      this.objs = []; this.births = new Map();
      this.R = 3; this.Rt = 3; this.cen = [0, 0, 0]; this.cent = [0, 0, 0];
      this.axisL = 3; this.fixedView = null;
      this.ptrs = new Map(); this.drag = null;
      this.last = performance.now();
      this.resize();
      new ResizeObserver(() => this.resize()).observe(canvas.parentElement || canvas);
      this.bind();
      requestAnimationFrame((t) => this.frame(t));
    }
    setTheme(name) { this.theme = THEMES[name] || THEMES.dark; }
    resize() {
      const r = this.cv.getBoundingClientRect();
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.W = Math.max(10, r.width); this.H = Math.max(10, r.height);
      this.cv.width = Math.round(this.W * this.dpr); this.cv.height = Math.round(this.H * this.dpr);
    }
    bind() {
      const cv = this.cv;
      cv.style.touchAction = 'none';
      cv.addEventListener('pointerdown', (e) => {
        cv.setPointerCapture(e.pointerId);
        this.ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
        this.idle = 0;
        if (this.ptrs.size === 2) { this.pinch = this.pdist(); }
      });
      cv.addEventListener('pointermove', (e) => {
        const p = this.ptrs.get(e.pointerId);
        if (!p) return;
        const dx = e.clientX - p.x, dy = e.clientY - p.y;
        p.x = e.clientX; p.y = e.clientY;
        this.idle = 0; this.targetYaw = null;
        if (this.ptrs.size === 1) {
          this.yaw += dx * 0.008;
          this.pitch = Math.max(-1.5, Math.min(1.5, this.pitch + dy * 0.006));
        } else if (this.ptrs.size === 2) {
          const d = this.pdist();
          if (this.pinch) this.zoom = Math.max(0.4, Math.min(4, this.zoom * (d / this.pinch)));
          this.pinch = d;
        }
      });
      const up = (e) => { this.ptrs.delete(e.pointerId); this.pinch = 0; this.idle = 0; };
      cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
      cv.addEventListener('wheel', (e) => {
        e.preventDefault();
        this.zoom = Math.max(0.4, Math.min(4, this.zoom * Math.exp(-e.deltaY * 0.0012)));
        this.idle = 0;
      }, { passive: false });
      cv.addEventListener('dblclick', () => this.resetView());
    }
    pdist() {
      const a = [...this.ptrs.values()];
      return Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y) || 1;
    }
    resetView() { this.yaw = ((this.yaw % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) - 2 * Math.PI; this.targetYaw = DEF_YAW; this.pitch = DEF_PITCH; this.zoom = 1; }

    // ---------- conteúdo ----------
    setObjects(list, opts = {}) {
      const now = performance.now();
      const nb = new Map();
      this.objs = list.map((o) => {
        const sig = JSON.stringify(o);
        let b = this.births.get(sig);
        if (b === undefined) b = opts.instant ? -1e9 : now;
        nb.set(sig, b);
        return { o, b };
      });
      this.births = nb;
      this.fixedView = opts.view || null;
      this.computeBounds();
    }
    computeBounds() {
      let rn = 0, ra = 0;
      const pts = [];
      for (const { o } of this.objs) {
        if (o.v) { const org = o.o || [0, 0, 0]; pts.push(org, V.add(org, o.v)); }
        if (o.p) pts.push(o.p);
        if (o.s) pts.push(...o.s);
        if (o.L) pts.push(o.L[0]);
        if (o.poly) pts.push(...o.poly);
        if (o.path) pts.push(...o.path);
        if (o.arc) pts.push(o.arc.at);
        if (o.txt) pts.push(o.txt);
        if (o.box) { pts.push(o.box); if (o.o) pts.push(o.o); }
        if (o.plane) pts.push(o.plane.p);
      }
      for (const p of pts) {
        rn = Math.max(rn, Math.hypot(p[0], p[1], p[2]));
        ra = Math.max(ra, Math.abs(p[0]), Math.abs(p[1]), Math.abs(p[2]));
      }
      this.Rt = Math.max(2.2, rn * 1.05);
      this.axisLt = Math.max(2, Math.ceil(ra + 0.6));
      if (this.fixedView) {
        if (this.fixedView.R) this.Rt = this.fixedView.R;
        this.cent = this.fixedView.c || [0, 0, 0];
      } else this.cent = [0, 0, 0];
    }

    // ---------- projeção ----------
    project(p) {
      const x = p[0] - this.cen[0], y = p[1] - this.cen[1], z = p[2] - this.cen[2];
      const x1 = x * this.cY - y * this.sY, y1 = x * this.sY + y * this.cY;
      const up = z * this.cP + y1 * this.sP;
      const depth = y1 * this.cP - z * this.sP;
      const f = this.D / (this.D + depth);
      return [this.W / 2 + x1 * this.ppu * f, this.H * 0.52 - up * this.ppu * f, depth, f];
    }

    // ---------- laço ----------
    frame(t) {
      const dt = Math.min(0.05, (t - this.last) / 1000); this.last = t;
      this.idle += dt;
      if (this.targetYaw !== null) {
        const d = this.targetYaw - this.yaw;
        this.yaw += d * (1 - Math.exp(-dt * 6));
        if (Math.abs(d) < 0.003) this.targetYaw = null;
      } else if (this.auto && this.idle > 2.2 && this.ptrs.size === 0) this.yaw += this.speed * dt;
      const k = 1 - Math.exp(-dt * 5);
      this.R += (this.Rt - this.R) * k;
      for (let i = 0; i < 3; i++) this.cen[i] += (this.cent[i] - this.cen[i]) * k;
      this.axisL = this.axisLt;
      try { this.draw(t); } catch (e) { console.error(e); }
      requestAnimationFrame((tt) => this.frame(tt));
    }

    draw(now) {
      const { ctx, W, H, dpr, theme } = this;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const g = ctx.createRadialGradient(W / 2, H * 0.45, 10, W / 2, H * 0.5, Math.max(W, H) * 0.75);
      g.addColorStop(0, theme.bg1); g.addColorStop(1, theme.bg2);
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

      this.cY = Math.cos(this.yaw); this.sY = Math.sin(this.yaw);
      this.cP = Math.cos(this.pitch); this.sP = Math.sin(this.pitch);
      this.ppu = (Math.min(W, H * 1.05) * 0.40 / Math.max(this.R, 1.5)) * this.zoom;
      this.D = Math.max(this.R, 2) * 5;

      this.drawGridAxes();

      const items = [];
      for (const { o, b } of this.objs) this.collect(o, ease((now - b) / 650), items);
      items.sort((a, b) => b.d - a.d);
      for (const it of items) if (!it.top) it.f();
      for (const it of items) if (it.top) it.f();
    }

    tickStep() {
      const L = this.axisL;
      if (L <= 10) return 1;
      if (L <= 20) return 2;
      if (L <= 50) return 5;
      return Math.pow(10, Math.floor(Math.log10(L)));
    }

    line(a, b, color, w = 1, dash = null) {
      const ctx = this.ctx, A = this.project(a), B = this.project(b);
      ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]);
      ctx.strokeStyle = color; ctx.lineWidth = w; ctx.setLineDash(dash || []); ctx.stroke(); ctx.setLineDash([]);
    }

    drawGridAxes() {
      const { ctx, theme } = this, L = this.axisL, st = this.tickStep();
      if (this.showGrid) {
        for (let i = -L; i <= L; i += st) {
          const strong = i === 0;
          this.line([i, -L, 0], [i, L, 0], strong ? theme.gridStrong : theme.grid, 1);
          this.line([-L, i, 0], [L, i, 0], strong ? theme.gridStrong : theme.grid, 1);
        }
      }
      const ext = L + 0.35;
      const axes = [
        { d: [1, 0, 0], n: 'x', c: PALETTE.x }, { d: [0, 1, 0], n: 'y', c: PALETTE.y }, { d: [0, 0, 1], n: 'z', c: PALETTE.z },
      ];
      for (const ax of axes) {
        this.line(V.mul(ax.d, -L), [0, 0, 0], theme.axisNeg, 1, [4, 4]);
        this.line([0, 0, 0], V.mul(ax.d, ext), ax.c, 1.6);
        this.arrowHead(V.mul(ax.d, ext - 0.3), V.mul(ax.d, ext), ax.c, 8);
        const P = this.project(V.mul(ax.d, ext + 0.28));
        this.text(ax.n, P[0], P[1], ax.c, 14, true);
        // marcações
        for (let i = st; i <= L; i += st) {
          const t = V.mul(ax.d, i), T = this.project(t);
          ctx.fillStyle = ax.c; ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.arc(T[0], T[1], 1.8, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
          if (L <= 12 || i % (st * 2) === 0) this.text(String(i), T[0] + 8, T[1] + 10, theme.muted, 10, false, false);
        }
      }
    }

    arrowHead(a, b, color, size = 10) {
      const ctx = this.ctx, A = this.project(a), B = this.project(b);
      const dx = B[0] - A[0], dy = B[1] - A[1], len = Math.hypot(dx, dy);
      if (len < 0.5) return;
      const ux = dx / len, uy = dy / len;
      ctx.beginPath();
      ctx.moveTo(B[0], B[1]);
      ctx.lineTo(B[0] - ux * size + -uy * size * 0.42, B[1] - uy * size + ux * size * 0.42);
      ctx.lineTo(B[0] - ux * size - -uy * size * 0.42, B[1] - uy * size - ux * size * 0.42);
      ctx.closePath(); ctx.fillStyle = color; ctx.fill();
    }

    // texto com mini-formatação: ">u" (seta sobre), "_" subscrito, "^2" expoente
    text(str, x, y, color, size = 14, bold = true, halo = true) {
      const ctx = this.ctx;
      let s = String(str), arrow = false;
      if (s[0] === '>') { arrow = true; s = s.slice(1); }
      const parts = [];
      const re = /([_^])(\{[^}]*\}|.)/g;
      let last = 0, m;
      while ((m = re.exec(s))) {
        if (m.index > last) parts.push({ t: s.slice(last, m.index), k: 0 });
        parts.push({ t: m[2].replace(/[{}]/g, ''), k: m[1] === '_' ? 1 : 2 });
        last = re.lastIndex;
      }
      if (last < s.length) parts.push({ t: s.slice(last), k: 0 });
      const fam = '"Cambria Math","Times New Roman",serif';
      let w = 0;
      const widths = parts.map((p) => {
        ctx.font = `${bold ? 'bold ' : ''}${p.k ? Math.round(size * 0.72) : size}px ${fam}`;
        const mw = ctx.measureText(p.t).width; w += mw; return mw;
      });
      let cx = x - w / 2;
      const draw = (stroke) => {
        let px = cx;
        parts.forEach((p, i) => {
          ctx.font = `${bold && !p.k ? 'italic bold ' : bold ? 'bold ' : ''}${p.k ? Math.round(size * 0.72) : size}px ${fam}`;
          const py = y + (p.k === 1 ? size * 0.28 : p.k === 2 ? -size * 0.4 : 0);
          if (stroke) ctx.strokeText(p.t, px, py); else ctx.fillText(p.t, px, py);
          px += widths[i];
        });
      };
      ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
      if (halo) { ctx.lineWidth = 4; ctx.strokeStyle = this.theme.halo; ctx.lineJoin = 'round'; draw(true); }
      ctx.fillStyle = color; draw(false);
      if (arrow) {
        const ay = y - size * 0.62, ax0 = x - w / 2 + 1, ax1 = x + w / 2 - 1;
        ctx.strokeStyle = color; ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.moveTo(ax0, ay); ctx.lineTo(ax1, ay); ctx.moveTo(ax1 - 3, ay - 2.5); ctx.lineTo(ax1, ay); ctx.lineTo(ax1 - 3, ay + 2.5); ctx.stroke();
      }
    }

    collect(o, t, items) {
      const ctx = this.ctx;
      const C = col(o.c, PALETTE.white);
      const push = (d, f, top = false) => items.push({ d, f, top });
      if (o.v) {
        const org = o.o || [0, 0, 0];
        const end = V.add(org, V.mul(o.v, t));
        const mid = this.project(V.lerp(org, end, 0.5));
        push(mid[2], () => {
          const A = this.project(org), B = this.project(end);
          const len = Math.hypot(B[0] - A[0], B[1] - A[1]);
          const hs = Math.min(11, Math.max(6, len * 0.5));
          const dx = (B[0] - A[0]) / (len || 1), dy = (B[1] - A[1]) / (len || 1);
          ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0] - dx * hs * 0.8, B[1] - dy * hs * 0.8);
          ctx.strokeStyle = C; ctx.lineWidth = o.w || 2.6; ctx.setLineDash(o.dash ? [6, 5] : []); ctx.lineCap = 'round'; ctx.stroke(); ctx.setLineDash([]);
          if (!o.nohead) this.arrowHead(org, end, C, hs);
          ctx.beginPath(); ctx.arc(A[0], A[1], 2.5, 0, 7); ctx.fillStyle = C; ctx.fill();
        });
        if (o.l && t > 0.6) {
          const q = this.project(V.add(org, V.mul(o.v, o.lp ?? 1.0)));
          push(q[2] - 1e3, () => this.text(o.l, q[0] + 10, q[1] - 12, C, 15), true);
        }
      }
      if (o.p) {
        const P = this.project(o.p);
        push(P[2], () => {
          const r = (o.r || 4.5) * (0.4 + 0.6 * t);
          ctx.globalAlpha = t; ctx.beginPath(); ctx.arc(P[0], P[1], r, 0, 7); ctx.fillStyle = C; ctx.fill();
          ctx.lineWidth = 2; ctx.strokeStyle = this.theme.halo; ctx.stroke(); ctx.globalAlpha = 1;
        });
        if (o.l) push(P[2] - 1e3, () => { ctx.globalAlpha = t; this.text(o.l, P[0] + 11, P[1] - 12, C, 15); ctx.globalAlpha = 1; }, true);
      }
      if (o.s) {
        const [a, b] = o.s, e = V.lerp(a, b, t), m = this.project(V.lerp(a, b, 0.5));
        push(m[2], () => this.line(a, e, C, o.w || 2, o.dash ? [6, 5] : null));
        if (o.l && t > 0.6) push(m[2] - 1e3, () => this.text(o.l, m[0] + 8, m[1] - 10, C, 14), true);
      }
      if (o.L) {
        const [P, d] = o.L, du = V.unit(d), ext = this.axisL * 1.6;
        const a = V.add(P, V.mul(du, -ext)), b = V.add(P, V.mul(du, ext));
        const m = this.project(P);
        push(m[2], () => { ctx.globalAlpha = t; this.line(a, b, C, o.w || 1.8, o.dash === false ? null : [9, 5]); ctx.globalAlpha = 1; });
        if (o.l) { const q = this.project(V.add(P, V.mul(du, ext * 0.8))); push(q[2] - 1e3, () => this.text(o.l, q[0] + 8, q[1] - 10, C, 14), true); }
      }
      if (o.path) {
        const pr = o.path.map((p) => this.project(p));
        const m = pr[Math.floor(pr.length / 2)];
        push(m[2], () => {
          ctx.beginPath(); pr.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])));
          ctx.strokeStyle = C; ctx.lineWidth = o.w || 2; ctx.globalAlpha = t; ctx.setLineDash(o.dash ? [6, 5] : []); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
        });
      }
      if (o.poly) {
        const pr = o.poly.map((p) => this.project(p));
        const dm = pr.reduce((s, q) => s + q[2], 0) / pr.length;
        push(dm + 1e4, () => {
          ctx.beginPath(); pr.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath();
          ctx.globalAlpha = (o.a ?? 0.22) * t; ctx.fillStyle = C; ctx.fill();
          ctx.globalAlpha = Math.min(1, (o.a ?? 0.22) * 3.2) * t; ctx.strokeStyle = C; ctx.lineWidth = 1.4; ctx.setLineDash(o.dash ? [5, 4] : []); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
        });
        if (o.l) {
          const cen = o.poly.reduce((s, p) => V.add(s, p), [0, 0, 0]).map((x) => x / o.poly.length);
          const q = this.project(cen); push(q[2] - 1e3, () => this.text(o.l, q[0], q[1], C, 14), true);
        }
      }
      if (o.plane) {
        const { p, u, v, ext = 3 } = o.plane;
        const cs = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b]) => V.add(p, V.add(V.mul(u, a * ext), V.mul(v, b * ext))));
        const pr = cs.map((q) => this.project(q));
        const dm = pr.reduce((s, q) => s + q[2], 0) / 4;
        push(dm + 2e4, () => {
          ctx.beginPath(); pr.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath();
          ctx.globalAlpha = (o.a ?? 0.13) * t; ctx.fillStyle = C; ctx.fill(); ctx.globalAlpha = 0.5 * t; ctx.strokeStyle = C; ctx.lineWidth = 1; ctx.stroke();
          for (let i = -ext + 1; i < ext; i++) {
            ctx.globalAlpha = 0.18 * t;
            this.line(V.add(p, V.add(V.mul(u, i), V.mul(v, -ext))), V.add(p, V.add(V.mul(u, i), V.mul(v, ext))), C, 1);
            this.line(V.add(p, V.add(V.mul(v, i), V.mul(u, -ext))), V.add(p, V.add(V.mul(v, i), V.mul(u, ext))), C, 1);
          }
          ctx.globalAlpha = 1;
        });
        if (o.l) { const q = this.project(cs[2]); push(q[2] - 1e3, () => this.text(o.l, q[0], q[1] - 12, C, 14), true); }
      }
      if (o.arc) {
        const { at, a, b, r = 0.6 } = o.arc;
        const ua = V.unit(a), ub = V.unit(b);
        const ang = Math.acos(Math.max(-1, Math.min(1, V.dot(ua, ub))));
        const pts = [];
        const n = 28;
        for (let i = 0; i <= n; i++) {
          const s = (i / n) * t;
          const d = ang < 1e-4 ? ua : V.add(V.mul(ua, Math.sin((1 - s) * ang) / Math.sin(ang)), V.mul(ub, Math.sin(s * ang) / Math.sin(ang)));
          pts.push(V.add(at, V.mul(d, r)));
        }
        const pr = pts.map((p) => this.project(p));
        const m = pr[Math.floor(n / 2)];
        push(m[2] - 5, () => {
          ctx.beginPath(); pr.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])));
          ctx.strokeStyle = C; ctx.lineWidth = 2; ctx.stroke();
        });
        if (o.l) {
          const md = V.unit(V.add(ua, ub)); const q = this.project(V.add(at, V.mul(V.norm(md) < 1e-3 ? ua : md, r * 1.45)));
          push(q[2] - 1e3, () => this.text(o.l, q[0], q[1], C, 14), true);
        }
      }
      if (o.ra) {
        const { at, a, b, s = 0.28 } = o.ra;
        const ua = V.mul(V.unit(a), s), ub = V.mul(V.unit(b), s);
        const pts = [V.add(at, ua), V.add(V.add(at, ua), ub), V.add(at, ub)].map((p) => this.project(p));
        push(pts[1][2] - 5, () => {
          ctx.beginPath(); pts.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])));
          ctx.strokeStyle = C; ctx.lineWidth = 1.6; ctx.globalAlpha = t; ctx.stroke(); ctx.globalAlpha = 1;
        });
      }
      if (o.box) {
        const org = o.o || [0, 0, 0], [x, y, z] = o.box;
        const cs = [];
        for (let i = 0; i < 8; i++) cs.push([org[0] + (i & 1 ? x : 0), org[1] + (i & 2 ? y : 0), org[2] + (i & 4 ? z : 0)]);
        const edges = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
        const m = this.project(V.lerp(cs[0], cs[7], 0.5));
        push(m[2] + 5e3, () => {
          ctx.globalAlpha = 0.65 * t;
          for (const [i, j] of edges) this.line(cs[i], cs[j], C, 1.3, [5, 4]);
          ctx.globalAlpha = 1;
        });
      }
      if (o.txt) {
        const q = this.project(o.txt);
        push(q[2] - 1e3, () => { ctx.globalAlpha = t; this.text(o.l || '', q[0], q[1], C, o.size || 14, o.bold !== false); ctx.globalAlpha = 1; }, true);
      }
    }
  }
  g.Scene3D = Scene3D;
  g.PALETTE = PALETTE;
})(window);
