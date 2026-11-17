// Pequena biblioteca de álgebra vetorial usada nas cenas.
(function (g) {
  const V = {
    add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
    sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
    mul: (a, k) => [a[0] * k, a[1] * k, a[2] * k],
    dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
    cross: (a, b) => [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ],
    norm: (a) => Math.hypot(a[0], a[1], a[2]),
    unit(a) {
      const n = V.norm(a) || 1;
      return [a[0] / n, a[1] / n, a[2] / n];
    },
    lerp: (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t],
    proj(v, u) {
      // projeção ortogonal de v sobre u
      const k = V.dot(v, u) / V.dot(u, u);
      return V.mul(u, k);
    },
    // vetor 2D (no plano xy) com módulo m e ângulo th (rad)
    polar: (m, th) => [m * Math.cos(th), m * Math.sin(th), 0],
    deg: (d) => (d * Math.PI) / 180,
    ZERO: [0, 0, 0],
    I: [1, 0, 0],
    J: [0, 1, 0],
    K: [0, 0, 1],
  };
  g.V = V;
})(window);
