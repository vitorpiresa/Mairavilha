// Exercícios de produto escalar (1–50) — parte 2: blocos D (ângulos diretores) e E (projeção).
(function () {
  const A = V.add, S = V.sub, M = V.mul, dot = V.dot;
  const E = (n, stmt, base, steps, ans, extra) => Deck.ex(Object.assign({ g: 'E', n, stmt, base, steps, ans }, extra || {}));
  const vec = (v, c, l, o) => Object.assign({ v, c, l }, o ? { o } : {});
  const pt = (p, l, c = 'g') => ({ p, l, c });
  const s3 = Math.sqrt(3), s2 = Math.sqrt(2), s5 = Math.sqrt(5);
  const ang = (at, a, b, r, l, c = 'w') => ({ arc: { at, a, b, r }, l, c });

  // ===================== D: ângulos diretores =====================
  Deck.section('Exercícios · produto escalar (D)', 'ex-d');

  E(32, r`Calcular os ângulos diretores do vetor $\vec v=(6,-2,3)$.`,
    [vec([6, -2, 3], 'v', '>v'), ang([0, 0, 0], [1, 0, 0], [6, -2, 3], 2.2, 'α', 'x'), ang([0, 0, 0], [0, 1, 0], [6, -2, 3], 1.6, 'β', 'y'), ang([0, 0, 0], [0, 0, 1], [6, -2, 3], 2.8, 'γ', 'z')],
    [r`<p>$|\vec v|=\sqrt{36+4+9}=7$.</p>`,
      r`$$\cos\alpha=\tfrac67,\quad\cos\beta=-\tfrac27,\quad\cos\gamma=\tfrac37.$$`,
      r`<p>Com a calculadora: $\alpha\approx31^\circ$, $\beta\approx107^\circ$ (obtuso, pois $y<0$), $\gamma\approx65^\circ$.</p>`],
    r`$\alpha=\arccos\frac67\approx31^\circ$, $\beta=\arccos\!\left(-\frac27\right)\approx107^\circ$, $\gamma=\arccos\frac37\approx65^\circ$`);

  E(33, r`Os ângulos diretores de um vetor $\vec a$ são $45^\circ$, $60^\circ$ e $120^\circ$ e $|\vec a|=2$. Determinar $\vec a$.`,
    [vec([s2, 1, -1], 'v', '>a'), ang([0, 0, 0], [1, 0, 0], [s2, 1, -1], 1.2, '45°', 'x'), ang([0, 0, 0], [0, 1, 0], [s2, 1, -1], 1.5, '60°', 'y'), ang([0, 0, 0], [0, 0, 1], [s2, 1, -1], 1.9, '120°', 'z')],
    [r`<p>O vetor unitário na direção é $(\cos45^\circ,\cos60^\circ,\cos120^\circ)=\left(\tfrac{\sqrt2}2,\tfrac12,-\tfrac12\right)$ (soma dos quadrados $=\tfrac12+\tfrac14+\tfrac14=1$ ✓).</p>`,
      r`<p>Multiplicando pelo módulo $2$: $\vec a=(\sqrt2,\,1,\,-1)$.</p>`],
    r`$\vec a=(\sqrt2,1,-1)$`);

  E(34, r`Os ângulos diretores de um vetor podem ser de $45^\circ$, $60^\circ$ e $90^\circ$? Justificar.`,
    [{ path: Array.from({ length: 49 }, (_, i) => [Math.cos(i / 48 * 2 * Math.PI), Math.sin(i / 48 * 2 * Math.PI), 0]), c: 'g', dash: true }, vec([s2 / 2, .5, 0], 'v', '>w'), vec([s2 / 2, .5, 0], 'v', ''), { txt: [0, 0, 1.3], l: 'círculo de raio 1 (unitários)', c: 'g', bold: false, size: 12 }],
    [r`<p>Se existisse um vetor com esses ângulos, o unitário seria $(\cos45^\circ,\cos60^\circ,\cos90^\circ)=\left(\tfrac{\sqrt2}2,\tfrac12,0\right)$ e deveria valer $\cos^2\alpha+\cos^2\beta+\cos^2\gamma=1$.</p>`,
      r`$$\cos^245^\circ+\cos^260^\circ+\cos^290^\circ=\tfrac12+\tfrac14+0=\tfrac34\ne1.$$`,
      r`<p>O vetor construído tem módulo $\sqrt{3/4}<1$: não é unitário, logo esses não são ângulos diretores.</p>`],
    r`<b>Não</b>: $\cos^245^\circ+\cos^260^\circ+\cos^290^\circ=\tfrac34\neq1$.`);

  E(35, r`Mostrar que existe vetor cujos ângulos diretores são $30^\circ$, $90^\circ$ e $60^\circ$, respectivamente, e determinar aquele que tem módulo $10$.`,
    [vec([s3 / 2, 0, .5], 'r', '>u'), ang([0, 0, 0], [1, 0, 0], [s3 / 2, 0, .5], .6, '30°', 'x'), ang([0, 0, 0], [0, 0, 1], [s3 / 2, 0, .5], .9, '60°', 'z')],
    [r`<p>Existência: $\cos^230^\circ+\cos^290^\circ+\cos^260^\circ=\tfrac34+0+\tfrac14=1$ ✓.</p>`,
      r`<p>O unitário é $\left(\tfrac{\sqrt3}2,0,\tfrac12\right)$; com módulo $10$:</p>`],
    r`$\vec v=10\left(\tfrac{\sqrt3}2,0,\tfrac12\right)=(5\sqrt3,\,0,\,5)$`, { ansAdd: [vec([5 * s3, 0, 5], 'v', '>v')] });

  E(36, r`Determinar um vetor unitário ortogonal ao eixo $Oz$ e que forme $60^\circ$ com o vetor $\vec i$.`,
    [vec([1, 0, 0], 'x', '>i')],
    [r`<p>Ortogonal ao eixo $Oz$: $z=0$, $\vec u=(x,y,0)$.</p>`,
      r`<p>Ângulo de $60^\circ$ com $\vec i$ e $|\vec u|=1$: $x=\vec u\cdot\vec i=\cos60^\circ=\tfrac12$.</p>`,
      r`<p>Unitário: $\tfrac14+y^2=1\Rightarrow y=\pm\tfrac{\sqrt3}2$.</p>`],
    r`$\left(\tfrac12,\tfrac{\sqrt3}2,0\right)$ ou $\left(\tfrac12,-\tfrac{\sqrt3}2,0\right)$`,
    { ansAdd: [vec([.5, s3 / 2, 0], 'r', '>u_1'), vec([.5, -s3 / 2, 0], 'o', '>u_2'), ang([0, 0, 0], [1, 0, 0], [.5, s3 / 2, 0], .45, '60°', 'w')] });

  E(37, r`Determinar o vetor $\vec a$ de módulo $5$, sabendo que é ortogonal ao eixo $Oy$ e ao vetor $\vec v=\vec i-2\vec k$, e forma ângulo obtuso com $\vec i$.`,
    [vec([1, 0, -2], 'v', '>v')],
    [r`<p>Ortogonal a $Oy$: $\vec a=(x,0,z)$.</p>`,
      r`<p>Ortogonal a $\vec v$: $x-2z=0\Rightarrow x=2z$. Módulo: $4z^2+z^2=25\Rightarrow z=\pm\sqrt5$.</p>`,
      r`<p>Ângulo obtuso com $\vec i$: $\vec a\cdot\vec i=x<0$, então $x=-2\sqrt5$ e $z=-\sqrt5$.</p>`],
    r`$\vec a=(-2\sqrt5,\,0,\,-\sqrt5)$`, { ansAdd: [vec([-2 * s5, 0, -s5], 'r', '>a'), vec([2 * s5, 0, s5], 'g', '', null)].map((o) => (o.c === 'g' ? Object.assign(o, { dash: true, nolg: true, l: undefined }) : o)) });

  E(38, r`Determinar o vetor $\vec v$ nos casos: a) $\vec v\perp Oz$, $|\vec v|=8$, forma $30^\circ$ com $\vec i$ e ângulo obtuso com $\vec j$; b) $\vec v\perp Ox$, $|\vec v|=2$, forma $60^\circ$ com $\vec j$ e ângulo agudo com $\vec k$.`,
    [vec([1, 0, 0], 'x', '>i'), vec([0, 1, 0], 'y', '>j')],
    [r`<p><b>a)</b> $\vec v=(x,y,0)$ com $x=8\cos30^\circ=4\sqrt3$. Então $y^2=64-48=16$; obtuso com $\vec j$ ⇒ $y<0$.</p>`,
      { h: r`<p>$\vec v=(4\sqrt3,\,-4,\,0)$.</p>`, add: [vec([4 * s3, -4, 0], 'r', '>v_a')] },
      r`<p><b>b)</b> $\vec v=(0,y,z)$ com $y=2\cos60^\circ=1$. $z^2=4-1=3$; agudo com $\vec k$ ⇒ $z>0$.</p>`,
      { h: r`<p>$\vec v=(0,\,1,\,\sqrt3)$.</p>`, add: [vec([0, 1, s3], 'o', '>v_b')] }],
    r`a) $(4\sqrt3,-4,0)$ &nbsp; b) $(0,1,\sqrt3)$`);

  E(39, r`O vetor $\vec v$ é ortogonal aos vetores $\vec u=(1,2,0)$ e $\vec w=(2,0,1)$ e forma ângulo agudo com o vetor $\vec j$. Determinar $\vec v$, sabendo que $|\vec v|=\sqrt{21}$.`,
    [vec([1, 2, 0], 'u', '>u'), vec([2, 0, 1], 'w', '>w')],
    [r`<p>$\vec v=(x,y,z)$: $\vec v\cdot\vec u=x+2y=0$ e $\vec v\cdot\vec w=2x+z=0$.</p><p>Logo $x=-2y$ e $z=-2x=4y$: $\vec v=y(-2,1,4)$.</p>`,
      r`<p>$|\vec v|=|y|\sqrt{4+1+16}=|y|\sqrt{21}=\sqrt{21}\Rightarrow y=\pm1$.</p>`,
      r`<p>Agudo com $\vec j$: $\vec v\cdot\vec j=y>0\Rightarrow y=1$.</p>`],
    r`$\vec v=(-2,1,4)$`, { ansAdd: [vec([-2, 1, 4], 'r', '>v'), { ra: { at: [0, 0, 0], a: [-2, 1, 4], b: [1, 2, 0], s: .5 }, c: 'g' }] });

  // ===================== E: projeção =====================
  Deck.section('Exercícios · produto escalar (E)', 'ex-e');

  const pu = [3, 0, 1], pv = [-2, 1, 2];
  E(40, r`Dados $\vec u=(3,0,1)$ e $\vec v=(-2,1,2)$, determinar $\operatorname{proj}_{\vec v}\vec u$ e $\operatorname{proj}_{\vec u}\vec v$.`,
    [vec(pu, 'u', '>u'), vec(pv, 'v', '>v')],
    [r`<p>$\vec u\cdot\vec v=-6+0+2=-4$; $\vec u\cdot\vec u=10$; $\vec v\cdot\vec v=9$.</p>`,
      { h: r`<p>$\operatorname{proj}_{\vec v}\vec u=\dfrac{\vec u\cdot\vec v}{\vec v\cdot\vec v}\vec v=-\dfrac49(-2,1,2)=\left(\dfrac89,-\dfrac49,-\dfrac89\right)$.</p>`, add: [vec(M(pv, -4 / 9), 'r', '>proj_v u'), { s: [pu, M(pv, -4 / 9)], c: 'g', dash: true }] },
      { h: r`<p>$\operatorname{proj}_{\vec u}\vec v=\dfrac{\vec u\cdot\vec v}{\vec u\cdot\vec u}\vec u=-\dfrac4{10}(3,0,1)=\left(-\dfrac65,0,-\dfrac25\right)$.</p>`, add: [vec(M(pu, -.4), 'o', '>proj_u v'), { s: [pv, M(pu, -.4)], c: 'g', dash: true }] }],
    r`$\operatorname{proj}_{\vec v}\vec u=\left(\frac89,-\frac49,-\frac89\right)$ &nbsp; $\operatorname{proj}_{\vec u}\vec v=\left(-\frac65,0,-\frac25\right)$`);

  E(41, r`Determinar os vetores projeção de $\vec v=4\vec i-3\vec j+2\vec k$ sobre os eixos cartesianos $x$, $y$ e $z$.`,
    [vec([4, -3, 2], 'v', '>v'), { box: [4, -3, 2], c: 'g' }],
    [r`<p>Projetar sobre o eixo $x$ é projetar sobre $\vec i$: $\dfrac{\vec v\cdot\vec i}{\vec i\cdot\vec i}\vec i=4\vec i$.</p>`,
      r`<p>Do mesmo modo, sobre $y$: $-3\vec j$; sobre $z$: $2\vec k$. (As projeções nos eixos são as componentes!)</p>`],
    r`$4\vec i$, $-3\vec j$ e $2\vec k$`, { ansAdd: [vec([4, 0, 0], 'x', '>4i'), vec([0, -3, 0], 'y', '>-3j'), vec([0, 0, 2], 'z', '>2k')] });

  const projEx = (u, v, label) => {
    const v1 = V.proj(v, u), v2 = S(v, v1);
    return [vec(u, 'u', '>u'), vec(v, 'v', '>v'), vec(v1, 'r', '>v_1'), vec(v2, 'o', '>v_2', v1), { s: [v, v1], c: 'g', dash: true }];
  };
  E(42, r`Para cada par $\vec u,\vec v$, encontrar a projeção ortogonal de $\vec v$ sobre $\vec u$ e decompor $\vec v$ como soma de $\vec v_1$ com $\vec v_2$, sendo $\vec v_1\parallel\vec u$ e $\vec v_2\perp\vec u$:<br>a) $\vec u=(1,2,-2)$, $\vec v=(3,-2,1)$ &nbsp; b) $\vec u=(1,1,1)$, $\vec v=(3,1,-1)$ &nbsp; c) $\vec u=(2,0,0)$, $\vec v=(3,5,4)$ &nbsp; d) $\vec u=(3,1,-3)$, $\vec v=(2,-3,1)$`,
    projEx([1, 2, -2], [3, -2, 1]),
    [r`<p>Receita: $\vec v_1=\dfrac{\vec v\cdot\vec u}{\vec u\cdot\vec u}\vec u$ e $\vec v_2=\vec v-\vec v_1$.</p>`,
      r`<p><b>a)</b> $\vec v\cdot\vec u=3-4-2=-3$; $\vec u\cdot\vec u=9$: $\vec v_1=-\tfrac13(1,2,-2)=\left(-\tfrac13,-\tfrac23,\tfrac23\right)$ e $\vec v_2=\vec v-\vec v_1=\left(\tfrac{10}3,-\tfrac43,\tfrac13\right)$.</p>`,
      { h: r`<p><b>b)</b> $\vec v\cdot\vec u=3$; $\vec u\cdot\vec u=3$: $\vec v_1=(1,1,1)$, $\vec v_2=(2,0,-2)$.</p>`, set: projEx([1, 1, 1], [3, 1, -1]) },
      { h: r`<p><b>c)</b> $\vec v\cdot\vec u=6$; $\vec u\cdot\vec u=4$: $\vec v_1=\tfrac64(2,0,0)=(3,0,0)$, $\vec v_2=(0,5,4)$.</p>`, set: projEx([2, 0, 0], [3, 5, 4]) },
      { h: r`<p><b>d)</b> $\vec v\cdot\vec u=6-3-3=0$: os vetores são <b>ortogonais</b>! A projeção é nula: $\vec v_1=\vec 0$ e $\vec v_2=\vec v$.</p>`, set: [vec([3, 1, -3], 'u', '>u'), vec([2, -3, 1], 'v', '>v=v_2'), { ra: { at: [0, 0, 0], a: [3, 1, -3], b: [2, -3, 1], s: .6 }, c: 'w' }] }],
    r`a) $\vec v_1=\left(-\frac13,-\frac23,\frac23\right)$, $\vec v_2=\left(\frac{10}3,-\frac43,\frac13\right)$ &nbsp; b) $(1,1,1)$ e $(2,0,-2)$ &nbsp; c) $(3,0,0)$ e $(0,5,4)$ &nbsp; d) $\vec 0$ e $\vec v$`);

  const hA = [2, 1, 3], hB = [3, 3, 5], hC = [0, 4, 1], hH = [51 / 26, 87 / 26, 94 / 26];
  E(43, r`Sejam $A(2,1,3)$, $B(m,3,5)$ e $C(0,4,1)$ vértices de um triângulo.<br>a) Para que valor de $m$ o triângulo é retângulo em $A$? b) Calcular a medida da projeção do cateto $AB$ sobre a hipotenusa $BC$. c) Determinar o ponto $H$, pé da altura relativa ao vértice $A$. d) Mostrar que $\overrightarrow{AH}\perp\overrightarrow{BC}$.`,
    [pt(hA, 'A'), pt(hB, 'B'), pt(hC, 'C'), { poly: [hA, hB, hC], c: 'u', a: .1 }],
    [r`<p><b>a)</b> $\overrightarrow{AB}=(m-2,2,2)$, $\overrightarrow{AC}=(-2,3,-2)$. $\overrightarrow{AB}\cdot\overrightarrow{AC}=-2m+4+6-4=-2m+6=0\Rightarrow m=3$.</p>`,
      { h: r`<p><b>b)</b> Com $m=3$: $\overrightarrow{AB}=(1,2,2)$, $\overrightarrow{BC}=(-3,1,-4)$, $|\overrightarrow{BC}|=\sqrt{26}$. A medida da projeção é</p>$$\frac{|\overrightarrow{AB}\cdot\overrightarrow{BC}|}{|\overrightarrow{BC}|}=\frac{|-3+2-8|}{\sqrt{26}}=\frac9{\sqrt{26}}=\frac{9\sqrt{26}}{26}.$$`, add: [vec([1, 2, 2], 'u', 'AB', hA), vec(S(hC, hB), 'v', 'BC', hB)] },
      { h: r`<p><b>c)</b> $H=B+\operatorname{proj}_{\overrightarrow{BC}}\overrightarrow{BA}$. $\overrightarrow{BA}=(-1,-2,-2)$, $\overrightarrow{BA}\cdot\overrightarrow{BC}=3-2+8=9$, então $H=B+\tfrac9{26}\overrightarrow{BC}$:</p>$$H=\left(3-\tfrac{27}{26},\,3+\tfrac9{26},\,5-\tfrac{36}{26}\right)=\left(\tfrac{51}{26},\tfrac{87}{26},\tfrac{94}{26}\right).$$`, add: [pt(hH, 'H', 'r'), { s: [hA, hH], c: 'r', dash: true }] },
      { h: r`<p><b>d)</b> $\overrightarrow{AH}=H-A=\left(-\tfrac1{26},\tfrac{61}{26},\tfrac{16}{26}\right)$ e $\overrightarrow{AH}\cdot\overrightarrow{BC}=\tfrac{3+61-64}{26}=0$ ✓. ∎</p>`, add: [{ ra: { at: hH, a: S(hA, hH), b: S(hC, hH), s: .35 }, c: 'w' }] }],
    r`a) $m=3$ &nbsp; b) $\dfrac9{26}\sqrt{26}$ &nbsp; c) $H\left(\frac{51}{26},\frac{87}{26},\frac{94}{26}\right)$ &nbsp; d) $\overrightarrow{AH}\cdot\overrightarrow{BC}=0$ ∎`);

  E(50, r`Para cada par $\vec u,\vec v$, encontrar o vetor projeção ortogonal de $\vec v$ sobre $\vec u$ e decompor $\vec v=\vec v_1+\vec v_2$ ($\vec v_1\parallel\vec u$, $\vec v_2\perp\vec u$): a) $\vec u=(1,0)$, $\vec v=(4,3)$ &nbsp; b) $\vec u=(1,1)$, $\vec v=(2,5)$ &nbsp; c) $\vec u=(4,3)$, $\vec v=(1,2)$.`,
    projEx([1, 0, 0], [4, 3, 0]),
    [r`<p><b>a)</b> $\vec u$ é o eixo $x$: a projeção é a componente $x$, $\vec v_1=(4,0)$ e $\vec v_2=(0,3)$.</p>`,
      { h: r`<p><b>b)</b> $\vec v\cdot\vec u=7$; $\vec u\cdot\vec u=2$: $\vec v_1=\tfrac72(1,1)=\left(\tfrac72,\tfrac72\right)$, $\vec v_2=\left(-\tfrac32,\tfrac32\right)$.</p>`, set: projEx([1, 1, 0], [2, 5, 0]) },
      { h: r`<p><b>c)</b> $\vec v\cdot\vec u=4+6=10$; $\vec u\cdot\vec u=25$: $\vec v_1=\tfrac25(4,3)=\left(\tfrac85,\tfrac65\right)$, $\vec v_2=\left(-\tfrac35,\tfrac45\right)$.</p>`, set: projEx([4, 3, 0], [1, 2, 0]) }],
    r`a) $(4,0)$ e $(0,3)$ &nbsp; b) $\left(\frac72,\frac72\right)$ e $\left(-\frac32,\frac32\right)$ &nbsp; c) $\left(\frac85,\frac65\right)$ e $\left(-\frac35,\frac45\right)$`);
})();
