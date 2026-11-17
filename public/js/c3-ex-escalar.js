// Exercícios de produto escalar (1–50) — parte 1: blocos A, B e C.
(function () {
  const A = V.add, S = V.sub, M = V.mul, dot = V.dot;
  const E = (n, stmt, base, steps, ans, extra) => Deck.ex(Object.assign({ g: 'E', n, stmt, base, steps, ans }, extra || {}));
  const vec = (v, c, l, o) => Object.assign({ v, c, l }, o ? { o } : {});
  const pt = (p, l, c = 'g') => ({ p, l, c });
  const s3 = Math.sqrt(3), s2 = Math.sqrt(2);
  // par de vetores no plano xy com módulos m1, m2 e ângulo (graus)
  const pair = (m1, m2, deg) => [[m1, 0, 0], V.polar(m2, V.deg(deg))];

  // ===================== A: definição algébrica e propriedades =====================
  Deck.section('Exercícios · produto escalar (A)', 'ex-a');

  E(1, r`Dados $\vec u=(2,-3,-1)$ e $\vec v=(1,-1,4)$, calcular:<br>a) $2\vec u\cdot(-\vec v)$ &nbsp; b) $(\vec u+3\vec v)\cdot(\vec v-2\vec u)$ &nbsp; c) $(\vec u+\vec v)\cdot(\vec u-\vec v)$ &nbsp; d) $(\vec u+\vec v)\cdot(\vec v-\vec u)$`,
    [vec([2, -3, -1], 'u', '>u'), vec([1, -1, 4], 'v', '>v')],
    [r`<p>Primeiro $\vec u\cdot\vec v=2+3-4=1$, $|\vec u|^2=4+9+1=14$, $|\vec v|^2=1+1+16=18$.</p>`,
      r`<p><b>a)</b> $2\vec u\cdot(-\vec v)=-2(\vec u\cdot\vec v)=-2$.</p>`,
      r`<p><b>b)</b> $\vec u+3\vec v=(5,-6,11)$ e $\vec v-2\vec u=(-3,5,6)$: $-15-30+66=21$.</p>`,
      { h: r`<p><b>c)</b> produto notável: $|\vec u|^2-|\vec v|^2=14-18=-4$. &nbsp; <b>d)</b> é o oposto: $|\vec v|^2-|\vec u|^2=4$.</p>`, add: [vec([3, -4, 3], 'r', '>u+v'), vec([1, -2, -5], 'o', '>u-v')] }],
    r`a) $-2$ &nbsp; b) $21$ &nbsp; c) $-4$ &nbsp; d) $4$`);

  E(2, r`Sejam $\vec u=(2,a,-1)$, $\vec v=(3,1,-2)$ e $\vec w=(2a-1,-2,4)$. Determinar $a$ de modo que $\vec u\cdot\vec v=(\vec u+\vec v)\cdot(\vec v+\vec w)$.`,
    [vec([2, 5 / 8, -1], 'u', '>u'), vec([3, 1, -2], 'v', '>v'), vec([0.25, -2, 4], 'w', '>w')],
    [r`<p>$\vec u\cdot\vec v=6+a+2=a+8$.</p>`,
      r`<p>$\vec u+\vec v=(5,\,a+1,\,-3)$ e $\vec v+\vec w=(2a+2,\,-1,\,2)$:</p>$$(\vec u+\vec v)\cdot(\vec v+\vec w)=10a+10-a-1-6=9a+3.$$`,
      r`<p>Igualando: $a+8=9a+3\Rightarrow 8a=5$.</p>`],
    r`$a=\dfrac58$`);

  const A3 = [4, 0, -1], B3 = [2, -2, 1], C3 = [1, 3, 2];
  E(3, r`Dados $A(4,0,-1)$, $B(2,-2,1)$, $C(1,3,2)$, $\vec u=(2,1,1)$ e $\vec v=(-1,-2,3)$, obter $\vec x$ tal que:<br>a) $3\vec x+2\vec v=\vec x+(\overrightarrow{AB}\cdot\vec u)\,\vec v$ &nbsp; b) $(\overrightarrow{BC}\cdot\vec v)\,\vec x=(\vec u\cdot\vec v)\,\vec v-3\vec x$`,
    [pt(A3, 'A'), pt(B3, 'B'), pt(C3, 'C'), vec([2, 1, 1], 'u', '>u'), vec([-1, -2, 3], 'v', '>v')],
    [r`<p>Os produtos escalares são <b>números</b>; resolvemos como equação em $\vec x$.</p>`,
      r`<p><b>a)</b> $\overrightarrow{AB}=(-2,-2,2)$; $\overrightarrow{AB}\cdot\vec u=-4-2+2=-4$. Então $2\vec x=(-4-2)\vec v=-6\vec v$, logo $\vec x=-3\vec v=(3,6,-9)$.</p>`,
      r`<p><b>b)</b> $\overrightarrow{BC}=(-1,5,1)$; $\overrightarrow{BC}\cdot\vec v=1-10+3=-6$; $\vec u\cdot\vec v=-2-2+3=-1$.</p>$$(-6+3)\vec x=-\vec v\ \Rightarrow\ \vec x=\tfrac13\vec v.$$`],
    r`a) $\vec x=(3,6,-9)$ &nbsp; b) $\vec x=\left(-\tfrac13,-\tfrac23,1\right)$`,
    { ansAdd: [vec([3, 6, -9], 'r', '>x_a'), vec([-1 / 3, -2 / 3, 1], 'o', '>x_b')] });

  E(4, r`Determinar o vetor $\vec v$, paralelo a $\vec u=(2,-1,3)$, tal que $\vec v\cdot\vec u=-42$.`,
    [vec([2, -1, 3], 'u', '>u')],
    [r`<p>Paralelo: $\vec v=\lambda\vec u=(2\lambda,-\lambda,3\lambda)$.</p>`,
      r`<p>$\vec v\cdot\vec u=\lambda(\vec u\cdot\vec u)=14\lambda=-42\Rightarrow\lambda=-3$.</p>`],
    r`$\vec v=(-6,3,-9)$ — mesma direção, sentido oposto a $\vec u$.`, { ansAdd: [vec([-6, 3, -9], 'v', '>v')] });

  E(7, r`Dados $\vec u=(1,2,-3)$, $\vec v=(2,0,-1)$ e $\vec w=(3,1,0)$, determinar $\vec x$ tal que $\vec x\cdot\vec u=-16$, $\vec x\cdot\vec v=0$ e $\vec x\cdot\vec w=3$.`,
    [vec([1, 2, -3], 'u', '>u'), vec([2, 0, -1], 'v', '>v'), vec([3, 1, 0], 'w', '>w')],
    [r`<p>Com $\vec x=(a,b,c)$ o enunciado vira um sistema linear:</p>$$\begin{cases}a+2b-3c=-16\\2a-c=0\\3a+b=3\end{cases}$$`,
      r`<p>Da 2ª: $c=2a$. Da 3ª: $b=3-3a$.</p>`,
      r`<p>Na 1ª: $a+6-6a-6a=-16\Rightarrow-11a=-22\Rightarrow a=2$, $b=-3$, $c=4$.</p>`],
    r`$\vec x=(2,-3,4)$`, { ansAdd: [vec([2, -3, 4], 'r', '>x')] });

  E(8, r`Sabendo que $|\vec u|=2$, $|\vec v|=3$ e $\vec u\cdot\vec v=-1$, calcular:<br>a) $(\vec u-3\vec v)\cdot\vec u$ &nbsp; b) $(2\vec v-\vec u)\cdot(2\vec v)$ &nbsp; c) $(\vec u+\vec v)\cdot(\vec v-4\vec u)$ &nbsp; d) $(3\vec u+4\vec v)\cdot(-2\vec u-5\vec v)$`,
    (() => { const th = Math.acos(-1 / 6) * 180 / Math.PI, p = pair(2, 3, th); return [vec(p[0], 'u', '>u'), vec(p[1], 'v', '>v'), { arc: { at: [0, 0, 0], a: p[0], b: p[1], r: .7 }, l: 'θ', c: 'w' }]; })(),
    [r`<p>Só temos módulos e $\vec u\cdot\vec v$: <b>distribua</b> e use $\vec u\cdot\vec u=4$, $\vec v\cdot\vec v=9$.</p>`,
      r`<p><b>a)</b> $\vec u\cdot\vec u-3\,\vec u\cdot\vec v=4+3=7$.</p><p><b>b)</b> $4\,\vec v\cdot\vec v-2\,\vec u\cdot\vec v=36+2=38$.</p>`,
      r`<p><b>c)</b> $\vec u\cdot\vec v-4\,\vec u\cdot\vec u+\vec v\cdot\vec v-4\,\vec v\cdot\vec u=-3(-1)-16+9=-4$.</p>`,
      r`<p><b>d)</b> $-6|\vec u|^2-15\,\vec u\cdot\vec v-8\,\vec v\cdot\vec u-20|\vec v|^2=-24+23-180=-181$.</p>`],
    r`a) $7$ &nbsp; b) $38$ &nbsp; c) $-4$ &nbsp; d) $-181$`);

  E(9, r`Calcular $\vec u\cdot\vec v+\vec u\cdot\vec w+\vec v\cdot\vec w$, sabendo que $\vec u+\vec v+\vec w=\vec 0$, $|\vec u|=2$, $|\vec v|=3$ e $|\vec w|=5$.`,
    [vec([2, 0, 0], 'u', '>u'), vec([3, 0, 0], 'v', '>v', [2, 0, 0]), vec([-5, 0, 0], 'w', '>w', [0, 0.5, 0.0]), { s: [[0, .5, 0], [0, 0, 0]], c: 'g', dash: true }],
    [r`<p>Truque: eleve a soma ao quadrado.</p>$$0=|\vec u+\vec v+\vec w|^2=|\vec u|^2+|\vec v|^2+|\vec w|^2+2(\vec u\cdot\vec v+\vec u\cdot\vec w+\vec v\cdot\vec w).$$`,
      r`<p>Substituindo: $0=4+9+25+2S\Rightarrow S=-19$.</p>`],
    r`$-19$`, { ansAdd: [{ txt: [0, 0, 1.2], l: 'u e v no mesmo sentido, w oposto (2+3=5)', c: 'g', bold: false, size: 12 }] });

  // ===================== B: definição geométrica =====================
  Deck.section('Exercícios · produto escalar (B)', 'ex-b');

  const tri = [[0, 0, 0], [4, 0, 0], [2, 2 * s3, 0]];
  E(10, r`$A$, $B$, $C$ são vértices de um triângulo equilátero de lado $20$ cm. Calcular $\overrightarrow{AB}\cdot\overrightarrow{AC}$ e $\overrightarrow{AB}\cdot\overrightarrow{CA}$.`,
    [pt(tri[0], 'A'), pt(tri[1], 'B'), pt(tri[2], 'C'), { poly: tri, c: 'u', a: .12 }, vec(tri[1], 'u', 'AB', null), vec(tri[2], 'v', 'AC')],
    [r`<p>Em um triângulo equilátero todos os ângulos medem $60^\circ$. O ângulo entre $\overrightarrow{AB}$ e $\overrightarrow{AC}$ (mesma origem $A$) é $60^\circ$.</p>`,
      r`$$\overrightarrow{AB}\cdot\overrightarrow{AC}=20\cdot20\cdot\cos60^\circ=200.$$`,
      { h: r`<p>$\overrightarrow{CA}=-\overrightarrow{AC}$ forma $120^\circ$ com $\overrightarrow{AB}$: $20\cdot20\cdot\cos120^\circ=-200$.</p>`, add: [vec(M(tri[2], -1), 'o', 'CA', tri[2])] }],
    r`$200$ e $-200$`);

  const Ar = [0, s3, 0], Br = [-1, 0, 0], Cr = [0, -s3, 0], Dr = [1, 0, 0];
  E(11, r`O quadrilátero $ABCD$ é um losango de lado $2$ (ângulo de $30^\circ$ entre o lado e a diagonal em $A$). Calcular:<br>a) $\overrightarrow{AC}\cdot\overrightarrow{BD}$ b) $\overrightarrow{AB}\cdot\overrightarrow{AD}$ c) $\overrightarrow{BA}\cdot\overrightarrow{BC}$ d) $\overrightarrow{AB}\cdot\overrightarrow{BC}$ e) $\overrightarrow{AB}\cdot\overrightarrow{DC}$ f) $\overrightarrow{BC}\cdot\overrightarrow{DA}$`,
    [pt(Ar, 'A'), pt(Br, 'B'), pt(Cr, 'C'), pt(Dr, 'D'), { poly: [Ar, Br, Cr, Dr], c: 'u', a: .1 }, { s: [Ar, Cr], c: 'g', dash: true }, { s: [Br, Dr], c: 'g', dash: true }],
    [r`<p>A diagonal bissecta o ângulo de $A$: $\angle BAD=60^\circ$, logo $\angle ABC=120^\circ$. Diagonais de losango são perpendiculares.</p>`,
      r`<p><b>a)</b> $\overrightarrow{AC}\perp\overrightarrow{BD}\Rightarrow 0$.</p><p><b>b)</b> $2\cdot2\cos60^\circ=2$. &nbsp; <b>c)</b> ângulo em $B$ é $120^\circ$: $4\cos120^\circ=-2$.</p>`,
      r`<p><b>d)</b> $\overrightarrow{AB}$ e $\overrightarrow{BC}$ são consecutivos (a seta de $B$ "sai" do ponto onde $\overrightarrow{AB}$ "chega"): o ângulo entre eles é $180^\circ-120^\circ=60^\circ$ → $4\cos60^\circ=2$.</p>`,
      r`<p><b>e)</b> $\overrightarrow{DC}=\overrightarrow{AB}$ (lados opostos): $|\overrightarrow{AB}|^2=4$. &nbsp; <b>f)</b> $\overrightarrow{DA}=-\overrightarrow{BC}$: $-|\overrightarrow{BC}|^2=-4$.</p>`],
    r`a) $0$ &nbsp; b) $2$ &nbsp; c) $-2$ &nbsp; d) $2$ &nbsp; e) $4$ &nbsp; f) $-4$`);

  E(12, r`Calcular $|\vec u+\vec v|$, $|\vec u-\vec v|$ e $(\vec u+\vec v)\cdot(\vec u-\vec v)$, sabendo que $|\vec u|=4$, $|\vec v|=3$ e o ângulo entre $\vec u$ e $\vec v$ é de $60^\circ$.`,
    (() => { const p = pair(4, 3, 60); return [vec(p[0], 'u', '>u'), vec(p[1], 'v', '>v'), { arc: { at: [0, 0, 0], a: p[0], b: p[1], r: .8 }, l: '60°', c: 'w' }, vec(A(p[0], p[1]), 'r', '>u+v'), vec(S(p[0], p[1]), 'o', '>u-v')]; })(),
    [r`<p>$\vec u\cdot\vec v=4\cdot3\cos60^\circ=6$.</p>`,
      r`$$|\vec u+\vec v|^2=16+2\cdot6+9=37\Rightarrow|\vec u+\vec v|=\sqrt{37}$$$$|\vec u-\vec v|^2=16-12+9=13\Rightarrow|\vec u-\vec v|=\sqrt{13}$$`,
      r`$$(\vec u+\vec v)\cdot(\vec u-\vec v)=|\vec u|^2-|\vec v|^2=16-9=7.$$`],
    r`$\sqrt{37}$, $\sqrt{13}$ e $7$`);

  E(13, r`Sabendo que $|\vec u|=\sqrt2$, $|\vec v|=3$ e que o ângulo entre $\vec u$ e $\vec v$ é $\dfrac{3\pi}{4}$ rad, determinar:<br>a) $|(2\vec u-\vec v)\cdot(\vec u-2\vec v)|$ &nbsp; b) $|\vec u-2\vec v|$`,
    (() => { const p = pair(s2, 3, 135); return [vec(p[0], 'u', '>u'), vec(p[1], 'v', '>v'), { arc: { at: [0, 0, 0], a: p[0], b: p[1], r: .7 }, l: '135°', c: 'w' }, vec(S(p[0], M(p[1], 2)), 'r', '>u-2v')]; })(),
    [r`<p>$\frac{3\pi}{4}=135^\circ$, então $\vec u\cdot\vec v=\sqrt2\cdot3\cdot\left(-\tfrac{\sqrt2}{2}\right)=-3$.</p>`,
      r`<p><b>a)</b> $(2\vec u-\vec v)\cdot(\vec u-2\vec v)=2|\vec u|^2-4\,\vec u\cdot\vec v-\vec v\cdot\vec u+2|\vec v|^2=4+12+3+18=37$.</p>`,
      r`<p><b>b)</b> $|\vec u-2\vec v|^2=|\vec u|^2-4\,\vec u\cdot\vec v+4|\vec v|^2=2+12+36=50$.</p>`],
    r`a) $37$ &nbsp; b) $\sqrt{50}=5\sqrt2$`);

  // ===================== C: ângulo e ortogonalidade =====================
  Deck.section('Exercícios · produto escalar (C)', 'ex-c');

  E(14, r`Verificar para $\vec u=(4,-1,2)$ e $\vec v=(-3,2,-2)$ as desigualdades: a) $|\vec u\cdot\vec v|\le|\vec u||\vec v|$ (Schwarz) &nbsp; b) $|\vec u+\vec v|\le|\vec u|+|\vec v|$ (triangular).`,
    [vec([4, -1, 2], 'u', '>u'), vec([-3, 2, -2], 'v', '>v')],
    [r`<p>$\vec u\cdot\vec v=-12-2-4=-18$; $|\vec u|=\sqrt{21}\approx4{,}58$; $|\vec v|=\sqrt{17}\approx4{,}12$.</p>`,
      r`<p><b>a)</b> $|\vec u\cdot\vec v|=18\le\sqrt{21}\sqrt{17}=\sqrt{357}\approx18{,}9$ ✓.</p>`,
      { h: r`<p><b>b)</b> $\vec u+\vec v=(1,1,0)$, $|\vec u+\vec v|=\sqrt2\approx1{,}41\le4{,}58+4{,}12=8{,}70$ ✓.</p>`, add: [vec([1, 1, 0], 'r', '>u+v')] }],
    r`Ambas se verificam.`);

  E(15, r`Qual o valor de $\alpha$ para que $\vec a=\alpha\vec i+2\vec j-4\vec k$ e $\vec b=2\vec i+(1-2\alpha)\vec j+3\vec k$ sejam ortogonais?`,
    [vec([-5, 2, -4], 'u', '>a'), vec([2, 11, 3], 'v', '>b'), { ra: { at: [0, 0, 0], a: [-5, 2, -4], b: [2, 11, 3], s: 1.2 }, c: 'w' }],
    [r`<p>Ortogonais $\iff\vec a\cdot\vec b=0$.</p>`, r`$$2\alpha+2(1-2\alpha)-12=0\Rightarrow-2\alpha-10=0.$$`],
    r`$\alpha=-5$`);

  E(16, r`Dados $\vec a=(2,1,\alpha)$, $\vec b=(\alpha+2,-5,2)$ e $\vec c=(2\alpha,8,\alpha)$, determinar $\alpha$ para que $\vec a+\vec b$ seja ortogonal a $\vec c-\vec a$.`,
    [vec([7, -4, 5], 'u', '>a+b'), vec([4, 7, 0], 'v', '>c-a'), { ra: { at: [0, 0, 0], a: [7, -4, 5], b: [4, 7, 0], s: 1.5 }, c: 'w' }],
    [r`<p>$\vec a+\vec b=(\alpha+4,\,-4,\,\alpha+2)$ e $\vec c-\vec a=(2\alpha-2,\,7,\,0)$.</p>`,
      r`$$(\alpha+4)(2\alpha-2)-28=0\Rightarrow2\alpha^2+6\alpha-36=0\Rightarrow\alpha^2+3\alpha-18=0.$$`,
      r`<p>Raízes: $\alpha=\dfrac{-3\pm9}{2}$.</p>`],
    r`$\alpha=3$ ou $\alpha=-6$ (a figura mostra $\alpha=3$)`);

  E(17, r`Dados $A(-1,0,5)$, $B(2,-1,4)$, $C(1,1,1)$, determinar $x$ tal que $\overrightarrow{AC}$ e $\overrightarrow{BP}$ sejam ortogonais, sendo $P(x,0,x-3)$.`,
    [pt([-1, 0, 5], 'A'), pt([2, -1, 4], 'B'), pt([1, 1, 1], 'C'), vec([2, 1, -4], 'u', 'AC', [-1, 0, 5])],
    [r`<p>$\overrightarrow{AC}=(2,1,-4)$ e $\overrightarrow{BP}=(x-2,\,1,\,x-7)$.</p>`,
      r`$$2(x-2)+1-4(x-7)=0\Rightarrow-2x+25=0.$$`],
    r`$x=\dfrac{25}{2}$`, { ansAdd: [pt([12.5, 0, 9.5], 'P', 'r'), vec([10.5, 1, 5.5], 'v', 'BP', [2, -1, 4])] });

  E(18, r`Provar que os pontos $A(-1,2,3)$, $B(-3,6,0)$ e $C(-4,7,2)$ são vértices de um triângulo retângulo.`,
    [pt([-1, 2, 3], 'A'), pt([-3, 6, 0], 'B'), pt([-4, 7, 2], 'C'), { poly: [[-1, 2, 3], [-3, 6, 0], [-4, 7, 2]], c: 'u', a: .12 }],
    [r`<p>Basta achar um ângulo reto: calculemos os produtos escalares dos lados em cada vértice. Testando em $B$:</p>`,
      r`$$\overrightarrow{BA}=(2,-4,3),\quad\overrightarrow{BC}=(-1,1,2)\ \Rightarrow\ \overrightarrow{BA}\cdot\overrightarrow{BC}=-2-4+6=0.$$`],
    r`$\overrightarrow{BA}\cdot\overrightarrow{BC}=0$: ângulo reto em $B$.`, { ansAdd: [{ ra: { at: [-3, 6, 0], a: [2, -4, 3], b: [-1, 1, 2], s: .6 }, c: 'w' }] });

  E(19, r`Dados $A(m,1,0)$, $B(m-1,2m,2)$ e $C(1,3,-1)$, determinar $m$ de modo que o triângulo $ABC$ seja retângulo em $A$. Calcular a área do triângulo.`,
    [pt([1, 1, 0], 'A'), pt([0, 2, 2], 'B'), pt([1, 3, -1], 'C'), { poly: [[1, 1, 0], [0, 2, 2], [1, 3, -1]], c: 'u', a: .14 }],
    [r`<p>$\overrightarrow{AB}=(-1,\,2m-1,\,2)$, $\overrightarrow{AC}=(1-m,\,2,\,-1)$. Retângulo em $A$: $\overrightarrow{AB}\cdot\overrightarrow{AC}=0$.</p>`,
      r`$$-(1-m)+2(2m-1)-2=0\Rightarrow5m-5=0\Rightarrow m=1.$$`,
      r`<p>Com $m=1$: $\overrightarrow{AB}=(-1,1,2)$, $\overrightarrow{AC}=(0,2,-1)$, $|\overrightarrow{AB}|=\sqrt6$, $|\overrightarrow{AC}|=\sqrt5$.</p><p>Catetos perpendiculares: área $=\tfrac12\sqrt6\sqrt5$.</p>`],
    r`$m=1$ e área $=\dfrac{\sqrt{30}}{2}$`, { ansAdd: [{ ra: { at: [1, 1, 0], a: [-1, 1, 2], b: [0, 2, -1], s: .4 }, c: 'w' }] });

  E(5, r`Determinar o vetor $\vec v$, sabendo que $|\vec v|=5$, $\vec v$ é ortogonal ao eixo $Ox$, $\vec v\cdot\vec w=6$ e $\vec w=\vec i+2\vec j$.`,
    [vec([1, 2, 0], 'w', '>w'), { plane: { p: [0, 0, 0], u: [0, 1, 0], v: [0, 0, 1], ext: 4 }, c: 'x', a: .06 }],
    [r`<p>Ortogonal ao eixo $Ox$ (vetor $\vec i$): $\vec v\cdot\vec i=0\Rightarrow x=0$, então $\vec v=(0,y,z)$ — está no plano $yOz$.</p>`,
      r`<p>$\vec v\cdot\vec w=0\cdot1+2y+0=6\Rightarrow y=3$.</p>`,
      r`<p>$|\vec v|=5$: $9+z^2=25\Rightarrow z=\pm4$.</p>`],
    r`$\vec v=(0,3,4)$ ou $\vec v=(0,3,-4)$`, { ansAdd: [vec([0, 3, 4], 'r', '>v_1'), vec([0, 3, -4], 'o', '>v_2')] });

  E(6, r`Determinar o vetor $\vec v$, ortogonal ao eixo $Oy$, tal que $\vec v\cdot\vec v_1=8$ e $\vec v\cdot\vec v_2=-3$, sendo $\vec v_1=(3,1,-2)$ e $\vec v_2=(-1,1,1)$.`,
    [vec([3, 1, -2], 'u', '>v_1'), vec([-1, 1, 1], 'w', '>v_2')],
    [r`<p>Ortogonal a $Oy$: $y=0$, então $\vec v=(x,0,z)$.</p>`,
      r`$$\begin{cases}3x-2z=8\\-x+z=-3\end{cases}$$`,
      r`<p>Da 2ª: $z=x-3$. Na 1ª: $3x-2x+6=8\Rightarrow x=2$, $z=-1$.</p>`],
    r`$\vec v=(2,0,-1)$`, { ansAdd: [vec([2, 0, -1], 'r', '>v')] });

  E(20, r`Encontrar os vetores unitários paralelos ao plano $yOz$ e ortogonais ao vetor $\vec v=(4,1,-2)$.`,
    [vec([4, 1, -2], 'v', '>v'), { plane: { p: [0, 0, 0], u: [0, 1, 0], v: [0, 0, 1], ext: 3 }, c: 'x', a: .07 }],
    [r`<p>Paralelo a $yOz$: $\vec u=(0,y,z)$. Unitário: $y^2+z^2=1$.</p>`,
      r`<p>Ortogonal a $\vec v$: $0\cdot4+y-2z=0\Rightarrow y=2z$.</p>`,
      r`<p>$4z^2+z^2=1\Rightarrow z=\pm\dfrac1{\sqrt5}$, $y=\pm\dfrac2{\sqrt5}$.</p>`],
    r`$\left(0,\tfrac2{\sqrt5},\tfrac1{\sqrt5}\right)$ ou $\left(0,-\tfrac2{\sqrt5},-\tfrac1{\sqrt5}\right)$`,
    { ansAdd: [vec([0, 2 / Math.sqrt(5), 1 / Math.sqrt(5)], 'r', '>u_1'), vec([0, -2 / Math.sqrt(5), -1 / Math.sqrt(5)], 'o', '>u_2')] });

  E(21, r`Determinar o vetor $\vec u$ tal que $|\vec u|=2$, o ângulo entre $\vec u$ e $\vec v=(1,-1,0)$ é $45^\circ$ e $\vec u$ é ortogonal a $\vec w=(1,1,0)$.`,
    [vec([1, -1, 0], 'v', '>v'), vec([1, 1, 0], 'w', '>w')],
    [r`<p>Seja $\vec u=(x,y,z)$. $\vec u\perp\vec w$: $x+y=0\Rightarrow y=-x$.</p>`,
      r`<p>$\vec u\cdot\vec v=|\vec u||\vec v|\cos45^\circ=2\cdot\sqrt2\cdot\tfrac{\sqrt2}2=2$ e $\vec u\cdot\vec v=x-y=2x$. Logo $x=1$, $y=-1$.</p>`,
      r`<p>$|\vec u|=2$: $1+1+z^2=4\Rightarrow z=\pm\sqrt2$.</p>`],
    r`$\vec u=(1,-1,\sqrt2)$ ou $(1,-1,-\sqrt2)$`, { ansAdd: [vec([1, -1, s2], 'r', '>u_1'), vec([1, -1, -s2], 'o', '>u_2')] });

  E(22, r`Seja $\vec v=(2,-1,1)$. Obter: a) um vetor ortogonal a $\vec v$; b) um vetor <b>unitário</b> ortogonal a $\vec v$; c) um vetor de módulo $4$ ortogonal a $\vec v$.`,
    [vec([2, -1, 1], 'v', '>v')],
    [r`<p><b>a)</b> Procuramos $(x,y,z)$ com $2x-y+z=0$ — há infinitas soluções. Escolha, por exemplo, $x=1,y=1\Rightarrow z=-1$: $(1,1,-1)$.</p>`,
      r`<p><b>b)</b> Normalize: $|(1,1,-1)|=\sqrt3$, então $\left(\tfrac1{\sqrt3},\tfrac1{\sqrt3},-\tfrac1{\sqrt3}\right)$.</p>`,
      r`<p><b>c)</b> Multiplique o unitário por 4: $\left(\tfrac4{\sqrt3},\tfrac4{\sqrt3},-\tfrac4{\sqrt3}\right)$.</p>`],
    r`a) $(1,1,-1)$ &nbsp; b) $\left(\frac1{\sqrt3},\frac1{\sqrt3},-\frac1{\sqrt3}\right)$ &nbsp; c) $\left(\frac4{\sqrt3},\frac4{\sqrt3},-\frac4{\sqrt3}\right)$`,
    { ansAdd: [vec([1, 1, -1], 'r', '>a'), vec(M([1, 1, -1], 1 / s3), 'o', '>b'), vec(M([1, 1, -1], 4 / s3), 'p', '>c'), { ra: { at: [0, 0, 0], a: [2, -1, 1], b: [1, 1, -1], s: .5 }, c: 'w' }] });

  E(23, r`Sendo $\vec a\perp\vec b$, $|\vec a|=6$ e $|\vec b|=8$, calcular $|\vec a+\vec b|$ e $|\vec a-\vec b|$.`,
    [vec([6, 0, 0], 'u', '>a'), vec([0, 8, 0], 'v', '>b'), { ra: { at: [0, 0, 0], a: [6, 0, 0], b: [0, 8, 0], s: .8 }, c: 'w' }, vec([6, 8, 0], 'r', '>a+b'), vec([6, -8, 0], 'o', '>a-b')],
    [r`<p>Como $\vec a\cdot\vec b=0$:</p>$$|\vec a\pm\vec b|^2=|\vec a|^2\pm2\,\vec a\cdot\vec b+|\vec b|^2=36+64=100.$$`,
      r`<p>As duas diagonais do retângulo têm o mesmo comprimento.</p>`],
    r`$|\vec a+\vec b|=|\vec a-\vec b|=10$`);

  E(24, r`Demonstrar que, sendo $\vec u,\vec v,\vec w$ dois a dois ortogonais: a) $|\vec u+\vec v|^2=|\vec u|^2+|\vec v|^2$ &nbsp; b) $|\vec u+\vec v+\vec w|^2=|\vec u|^2+|\vec v|^2+|\vec w|^2$.`,
    [vec([2, 0, 0], 'u', '>u'), vec([0, 3, 0], 'v', '>v'), vec([0, 0, 1.5], 'w', '>w'), { box: [2, 3, 1.5], c: 'g' }, vec([2, 3, 1.5], 'r', '>u+v+w')],
    [r`<p><b>a)</b> $|\vec u+\vec v|^2=|\vec u|^2+2\,\vec u\cdot\vec v+|\vec v|^2$ e $\vec u\cdot\vec v=0$. ∎</p>`,
      r`<p><b>b)</b> Expandimos $(\vec u+\vec v+\vec w)\cdot(\vec u+\vec v+\vec w)$: aparecem $|\vec u|^2+|\vec v|^2+|\vec w|^2$ e os três duplos produtos $2\vec u\cdot\vec v+2\vec u\cdot\vec w+2\vec v\cdot\vec w$, todos nulos. ∎</p>`,
      r`<p>É o teorema de Pitágoras em 3D: a diagonal do paralelepípedo reto-retângulo.</p>`],
    r`$|\vec u+\vec v+\vec w|^2=|\vec u|^2+|\vec v|^2+|\vec w|^2$ ∎`);

  E(44, r`Determinar $k$ para que $\vec u=(-2,3)$ e $\vec v=(k,-4)$ sejam: a) paralelos; b) ortogonais.`,
    [vec([-2, 3, 0], 'u', '>u'), vec([8 / 3, -4, 0], 'v', '>v'), vec([-6, -4, 0], 'w', '>v')],
    [r`<p><b>a)</b> Paralelos: coordenadas proporcionais, $\dfrac k{-2}=\dfrac{-4}3\Rightarrow k=\dfrac83$.</p>`,
      r`<p><b>b)</b> Ortogonais: $\vec u\cdot\vec v=-2k-12=0\Rightarrow k=-6$.</p>`],
    r`a) $k=\dfrac83$ &nbsp; b) $k=-6$`);

  E(45, r`Obter os dois vetores unitários ortogonais a cada um dos vetores: a) $4\vec i+3\vec j$ &nbsp; b) $(-2,3)$ &nbsp; c) $(-1,-1)$.`,
    [vec([4, 3, 0], 'u', '>a'), vec([-2, 3, 0], 'v', '>b'), vec([-1, -1, 0], 'w', '>c')],
    [r`<p>Em $\R^2$, se $(a,b)$ é o vetor, $(-b,a)$ é ortogonal a ele (o produto escalar $-ab+ba=0$). Depois normalize; o outro é o oposto.</p>`,
      r`<p><b>a)</b> $(-3,4)/5$ e $(3,-4)/5$.</p><p><b>b)</b> $(-3,-2)/\sqrt{13}$ e $(3,2)/\sqrt{13}$.</p><p><b>c)</b> $(1,-1)/\sqrt2$ e $(-1,1)/\sqrt2$.</p>`],
    r`a) $\left(\frac35,-\frac45\right),\left(-\frac35,\frac45\right)$ &nbsp; b) $\left(\frac3{\sqrt{13}},\frac2{\sqrt{13}}\right),\left(-\frac3{\sqrt{13}},-\frac2{\sqrt{13}}\right)$ &nbsp; c) $\left(\frac1{\sqrt2},-\frac1{\sqrt2}\right),\left(-\frac1{\sqrt2},\frac1{\sqrt2}\right)$`,
    { ansAdd: [vec([.6, -.8, 0], 'r', ''), vec([-.6, .8, 0], 'r', ''), vec([3 / Math.sqrt(13), 2 / Math.sqrt(13), 0], 'o', ''), vec([-3 / Math.sqrt(13), -2 / Math.sqrt(13), 0], 'o', ''), vec([1 / s2, -1 / s2, 0], 'p', ''), vec([-1 / s2, 1 / s2, 0], 'p', '')].map((o) => Object.assign(o, { l: undefined })) });

  E(46, r`Determinar um par de vetores unitários e ortogonais entre si, em que um deles seja paralelo a $\vec v=6\vec i+8\vec j$.`,
    [vec([6, 8, 0], 'v', '>v')],
    [r`<p>$|\vec v|=\sqrt{36+64}=10$. O unitário paralelo é $\hat v=\dfrac{(6,8)}{10}=\left(\tfrac35,\tfrac45\right)$.</p>`,
      r`<p>Um ortogonal a ele: gire $90^\circ$ — $(-b,a)\Rightarrow\left(-\tfrac45,\tfrac35\right)$ (já é unitário).</p>`],
    r`$\left(\tfrac35,\tfrac45\right)$ e $\left(-\tfrac45,\tfrac35\right)$ (ou $\left(\tfrac45,-\tfrac35\right)$)`,
    { ansAdd: [vec([.6, .8, 0], 'r', '>e_1'), vec([-.8, .6, 0], 'o', '>e_2'), { ra: { at: [0, 0, 0], a: [.6, .8, 0], b: [-.8, .6, 0], s: .25 }, c: 'w' }] });

  E(25, r`Determinar o ângulo entre os vetores: a) $\vec u=(2,-1,-1)$ e $\vec v=(-1,-1,2)$ &nbsp; b) $\vec u=(1,-2,1)$ e $\vec v=(-1,1,0)$.`,
    [vec([2, -1, -1], 'u', '>u_a'), vec([-1, -1, 2], 'v', '>v_a'), { arc: { at: [0, 0, 0], a: [2, -1, -1], b: [-1, -1, 2], r: .9 }, l: 'θ', c: 'w' }],
    [r`<p>Use $\cos\theta=\dfrac{\vec u\cdot\vec v}{|\vec u||\vec v|}$.</p>`,
      r`<p><b>a)</b> $\vec u\cdot\vec v=-2+1-2=-3$; $|\vec u|=|\vec v|=\sqrt6$. $\cos\theta=\dfrac{-3}{6}=-\dfrac12\Rightarrow\theta=120^\circ$.</p>`,
      { h: r`<p><b>b)</b> $\vec u\cdot\vec v=-1-2+0=-3$; $|\vec u|=\sqrt6$, $|\vec v|=\sqrt2$. $\cos\theta=\dfrac{-3}{\sqrt{12}}=-\dfrac{\sqrt3}2\Rightarrow\theta=150^\circ$.</p>`,
        set: [vec([1, -2, 1], 'u', '>u_b'), vec([-1, 1, 0], 'v', '>v_b'), { arc: { at: [0, 0, 0], a: [1, -2, 1], b: [-1, 1, 0], r: .7 }, l: 'θ', c: 'w' }] }],
    r`a) $120^\circ$ &nbsp; b) $150^\circ$`);

  const tA = [3, 4, 4], tB = [2, -3, 4], tC = [6, 0, 4];
  E(26, r`Seja o triângulo de vértices $A(3,4,4)$, $B(2,-3,4)$ e $C(6,0,4)$. Determinar o ângulo interno ao vértice $B$. Qual o ângulo externo ao vértice $B$?`,
    [pt(tA, 'A'), pt(tB, 'B'), pt(tC, 'C'), { poly: [tA, tB, tC], c: 'u', a: .12 }],
    [r`<p>O ângulo interno em $B$ é o ângulo entre $\overrightarrow{BA}$ e $\overrightarrow{BC}$.</p>`,
      r`$$\overrightarrow{BA}=(1,7,0),\ \overrightarrow{BC}=(4,3,0)\ \Rightarrow\ \cos\hat B=\frac{4+21}{\sqrt{50}\cdot5}=\frac{25}{25\sqrt2}=\frac{\sqrt2}2.$$`,
      { h: r`<p>$\hat B=45^\circ$. O ângulo externo é o suplemento: $180^\circ-45^\circ=135^\circ$.</p>`, add: [{ arc: { at: tB, a: S(tA, tB), b: S(tC, tB), r: 1.3 }, l: '45°', c: 'w' }, { arc: { at: tB, a: S(tC, tB), b: S(tB, tA), r: 1.9 }, l: '135°', c: 'o' }, { s: [tB, A(tB, S(tB, tA))], c: 'g', dash: true }] }],
    r`interno $45^\circ$; externo $135^\circ$`);

  const q1 = [2, 1, 3], q2 = [1, 0, -1], q3 = [-1, 2, 1];
  E(27, r`Calcular os ângulos internos do triângulo de vértices $A(2,1,3)$, $B(1,0,-1)$ e $C(-1,2,1)$.`,
    [pt(q1, 'A'), pt(q2, 'B'), pt(q3, 'C'), { poly: [q1, q2, q3], c: 'u', a: .12 }],
    [r`<p>$\overrightarrow{AB}=(-1,-1,-4)$, $\overrightarrow{AC}=(-3,1,-2)$: $\vec{AB}\cdot\vec{AC}=3-1+8=10$, $|\vec{AB}|=\sqrt{18}$, $|\vec{AC}|=\sqrt{14}$.</p>$$\cos\hat A=\frac{10}{\sqrt{252}}\approx0{,}630\Rightarrow\hat A\approx50^\circ57'.$$`,
      r`<p>$\overrightarrow{BA}=(1,1,4)$, $\overrightarrow{BC}=(-2,2,2)$: produto $=8$, $|\vec{BC}|=\sqrt{12}$.</p>$$\cos\hat B=\frac{8}{\sqrt{18}\sqrt{12}}\approx0{,}544\Rightarrow\hat B\approx57^\circ1'.$$`,
      r`<p>A soma é $180^\circ$: $\hat C=180^\circ-50^\circ57'-57^\circ1'\approx72^\circ2'$.</p>`],
    r`$\hat A\approx50^\circ57'$, $\hat B\approx57^\circ1'$, $\hat C\approx72^\circ2'$`);

  E(47, r`Determinar, aproximadamente, o ângulo entre os pares de vetores: a) $\vec u=(2,1)$ e $\vec v=(4,-2)$ &nbsp; b) $\vec u=(1,-1)$ e $\vec v=(-4,-2)$ &nbsp; c) $\vec u=(1,1)$ e $\vec v=(-1,1)$.`,
    [vec([2, 1, 0], 'u', '>u_a'), vec([4, -2, 0], 'v', '>v_a'), { arc: { at: [0, 0, 0], a: [2, 1, 0], b: [4, -2, 0], r: 1 }, l: 'θ', c: 'w' }],
    [r`<p><b>a)</b> $\cos\theta=\dfrac{8-2}{\sqrt5\cdot\sqrt{20}}=\dfrac6{10}=\dfrac35\Rightarrow\theta\approx53^\circ$.</p>`,
      { h: r`<p><b>b)</b> $\cos\theta=\dfrac{-4+2}{\sqrt2\cdot\sqrt{20}}=-\dfrac1{\sqrt{10}}\Rightarrow\theta\approx108^\circ$.</p>`, set: [vec([1, -1, 0], 'u', '>u_b'), vec([-4, -2, 0], 'v', '>v_b'), { arc: { at: [0, 0, 0], a: [1, -1, 0], b: [-4, -2, 0], r: .8 }, l: 'θ', c: 'w' }] },
      { h: r`<p><b>c)</b> $\vec u\cdot\vec v=-1+1=0\Rightarrow\theta=90^\circ$.</p>`, set: [vec([1, 1, 0], 'u', '>u_c'), vec([-1, 1, 0], 'v', '>v_c'), { ra: { at: [0, 0, 0], a: [1, 1, 0], b: [-1, 1, 0], s: .4 }, c: 'w' }] }],
    r`a) $\arccos\frac35\approx53^\circ$ &nbsp; b) $\arccos\!\left(-\frac1{\sqrt{10}}\right)\approx108^\circ$ &nbsp; c) $90^\circ$`);

  E(48, r`Dados $\vec u=\vec i-\vec j$ e $\vec v=2\vec i+\vec j$, determinar o módulo e o ângulo que os seguintes vetores formam com $\vec i$: a) $\vec u$ b) $\vec v$ c) $\vec u+\vec v$ d) $\vec u-\vec v$ e) $\vec v-\vec u$.`,
    [vec([1, -1, 0], 'u', '>u'), vec([2, 1, 0], 'v', '>v'), vec([3, 0, 0], 'r', '>u+v'), vec([-1, -2, 0], 'o', '>u-v'), vec([1, 2, 0], 'p', '>v-u'), vec([1, 0, 0], 'g', '>i')],
    [r`<p>Para cada $\vec w=(a,b)$: $|\vec w|=\sqrt{a^2+b^2}$ e $\cos\theta=\dfrac{\vec w\cdot\vec i}{|\vec w|}=\dfrac a{|\vec w|}$.</p>`,
      r`<p><b>a)</b> $(1,-1)$: $\sqrt2$, $\cos\theta=\tfrac1{\sqrt2}\Rightarrow45^\circ$. &nbsp; <b>b)</b> $(2,1)$: $\sqrt5$, $\cos\theta=\tfrac2{\sqrt5}\Rightarrow\approx26^\circ$.</p>`,
      r`<p><b>c)</b> $(3,0)$: $3$, $\cos\theta=1\Rightarrow0^\circ$. &nbsp; <b>d)</b> $(-1,-2)$: $\sqrt5$, $\cos\theta=-\tfrac1{\sqrt5}\Rightarrow\approx117^\circ$. &nbsp; <b>e)</b> $(1,2)$: $\sqrt5$, $\cos\theta=\tfrac1{\sqrt5}\Rightarrow\approx63^\circ$.</p>`],
    r`a) $\sqrt2,45^\circ$ &nbsp; b) $\sqrt5,\approx26^\circ$ &nbsp; c) $3,0^\circ$ &nbsp; d) $\sqrt5,\approx117^\circ$ &nbsp; e) $\sqrt5,\approx63^\circ$`);

  E(28, r`Calcular o valor de $m$ de modo que seja $120^\circ$ o ângulo entre os vetores $\vec u=(1,-2,1)$ e $\vec v=(-2,1,m+1)$.`,
    [vec([1, -2, 1], 'u', '>u'), vec([-2, 1, 1], 'v', '>v'), { arc: { at: [0, 0, 0], a: [1, -2, 1], b: [-2, 1, 1], r: .8 }, l: '120°', c: 'w' }],
    [r`<p>$\vec u\cdot\vec v=-2-2+m+1=m-3$; $|\vec u|=\sqrt6$; $|\vec v|=\sqrt{5+(m+1)^2}$.</p>`,
      r`<p>$\cos120^\circ=-\tfrac12$: $\ m-3=-\tfrac12\sqrt6\sqrt{5+(m+1)^2}$. Como o lado direito é negativo, $m<3$. Elevando ao quadrado:</p>$$4(m-3)^2=6\left(5+(m+1)^2\right)\Rightarrow2m^2+36m=0.$$`,
      r`<p>$m=0$ ou $m=-18$ — ambos menores que $3$ ✓.</p>`],
    r`$m=0$ ou $m=-18$`);

  E(29, r`Calcular $n$ para que seja de $30^\circ$ o ângulo entre os vetores $\vec v=(-3,1,n)$ e $\vec k$.`,
    [vec([-3, 1, s3 * 0 + Math.sqrt(30)], 'v', '>v'), vec([0, 0, 1], 'z', '>k'), { arc: { at: [0, 0, 0], a: [0, 0, 1], b: [-3, 1, Math.sqrt(30)], r: 1.5 }, l: '30°', c: 'w' }],
    [r`<p>$\vec v\cdot\vec k=n$; $|\vec v|=\sqrt{10+n^2}$; $\cos30^\circ=\dfrac{\sqrt3}2$. Como $\cos>0$, $n>0$.</p>`,
      r`$$n=\frac{\sqrt3}{2}\sqrt{10+n^2}\Rightarrow n^2=\tfrac34(10+n^2)\Rightarrow\tfrac{n^2}4=\tfrac{30}4.$$`],
    r`$n=\sqrt{30}$`);

  E(49, r`Determinar o valor de $a$ para que seja $45^\circ$ o ângulo entre $\vec u=(2,1)$ e $\vec v=(1,a)$.`,
    [vec([2, 1, 0], 'u', '>u'), vec([1, 3, 0], 'v', '>v'), { arc: { at: [0, 0, 0], a: [2, 1, 0], b: [1, 3, 0], r: 1 }, l: '45°', c: 'w' }],
    [r`<p>$\cos45^\circ=\dfrac{2+a}{\sqrt5\sqrt{1+a^2}}=\dfrac{\sqrt2}2$ (então $2+a>0$). Elevando ao quadrado:</p>$$2(2+a)^2=5(1+a^2)\Rightarrow3a^2-8a-3=0.$$`,
      r`<p>$a=\dfrac{8\pm10}6$: $a=3$ ou $a=-\tfrac13$ (ambos com $2+a>0$ ✓).</p>`],
    r`$a=3$ ou $a=-\dfrac13$`, { ansAdd: [vec([1, -1 / 3, 0], 'o', '>v')] });

  E(30, r`Se $|\vec u|=4$, $|\vec v|=2$ e $120^\circ$ é o ângulo entre $\vec u$ e $\vec v$, determinar o ângulo entre $\vec u+\vec v$ e $\vec u-\vec v$ e construir uma figura correspondente.`,
    (() => { const p = pair(4, 2, 120); return [vec(p[0], 'u', '>u'), vec(p[1], 'v', '>v'), vec(A(p[0], p[1]), 'r', '>u+v'), vec(S(p[0], p[1]), 'o', '>u-v'), { arc: { at: [0, 0, 0], a: A(p[0], p[1]), b: S(p[0], p[1]), r: 1.2 }, l: 'φ', c: 'w' }]; })(),
    [r`<p>$\vec u\cdot\vec v=4\cdot2\cos120^\circ=-4$.</p>`,
      r`$$(\vec u+\vec v)\cdot(\vec u-\vec v)=16-4=12,\quad|\vec u+\vec v|^2=16-8+4=12,\quad|\vec u-\vec v|^2=16+8+4=28.$$`,
      r`$$\cos\varphi=\frac{12}{\sqrt{12}\sqrt{28}}=\frac{12}{\sqrt{336}}=\frac3{\sqrt{21}}\Rightarrow\varphi\approx49^\circ6'.$$`],
    r`$\arccos\dfrac{3}{\sqrt{21}}\approx49^\circ6'$`);

  const a = 2, O = [0, 0, 0], Ac = [a, 0, 0], Bc = [a, a, 0], Cc = [0, a, 0], Dc = [0, a, a], Ec = [0, 0, a], Fc = [a, 0, a], Gc = [a, a, a];
  const cubeBase = [{ box: [a, a, a], c: 'g' }, pt(O, 'O'), pt(Ac, 'A'), pt(Bc, 'B'), pt(Cc, 'C'), pt(Dc, 'D'), pt(Ec, 'E'), pt(Fc, 'F'), pt(Gc, 'G')];
  E(31, r`Seja o cubo de aresta $a$ (com $O$ na origem; $A$ no eixo $x$, $C$ no eixo $y$, $E$ no eixo $z$ e $B$, $D$, $F$, $G$ os demais vértices). Determinar:<br>a) $\overrightarrow{OA}\cdot\overrightarrow{OC}$ b) $\overrightarrow{OA}\cdot\overrightarrow{OD}$ c) $\overrightarrow{OE}\cdot\overrightarrow{OB}$ d) $|\overrightarrow{OB}|$ e $|\overrightarrow{OG}|$ e) $\overrightarrow{EG}\cdot\overrightarrow{CG}$ f) $(\overrightarrow{ED}\cdot\overrightarrow{AB})\,\overrightarrow{OG}$ g) o ângulo agudo entre a diagonal do cubo e uma aresta h) o ângulo agudo entre duas diagonais do cubo.`,
    cubeBase,
    [{ h: r`<p>Coordenadas: $O(0,0,0)$, $A(a,0,0)$, $B(a,a,0)$, $C(0,a,0)$, $D(0,a,a)$, $E(0,0,a)$, $F(a,0,a)$, $G(a,a,a)$.</p>` },
      r`<p><b>a)</b> $(a,0,0)\cdot(0,a,0)=0$. &nbsp; <b>b)</b> $\overrightarrow{OD}=(0,a,a)$: $(a,0,0)\cdot(0,a,a)=0$. &nbsp; <b>c)</b> $(0,0,a)\cdot(a,a,0)=0$.</p>`,
      { h: r`<p><b>d)</b> $|\overrightarrow{OB}|=\sqrt{a^2+a^2}=a\sqrt2$ (diagonal da face); $|\overrightarrow{OG}|=a\sqrt3$ (diagonal do cubo).</p>`, add: [vec(Bc, 'u', 'OB'), vec(Gc, 'v', 'OG')] },
      r`<p><b>e)</b> $\overrightarrow{EG}=(a,a,0)$, $\overrightarrow{CG}=(a,0,a)$: produto $=a^2$.</p><p><b>f)</b> $\overrightarrow{ED}=(0,a,0)$, $\overrightarrow{AB}=(0,a,0)$: $\overrightarrow{ED}\cdot\overrightarrow{AB}=a^2$, logo o vetor é $a^2(a,a,a)=(a^3,a^3,a^3)$.</p>`,
      { h: r`<p><b>g)</b> Diagonal $\overrightarrow{OG}$ e aresta $\overrightarrow{OA}$: $\cos\theta=\dfrac{a^2}{a\sqrt3\cdot a}=\dfrac1{\sqrt3}=\dfrac{\sqrt3}3\Rightarrow\theta\approx54^\circ44'$.</p>`, add: [{ arc: { at: O, a: Gc, b: Ac, r: 1 }, l: 'θ', c: 'w' }] },
      { h: r`<p><b>h)</b> Diagonais $\overrightarrow{OG}=(a,a,a)$ e $\overrightarrow{AD}=(-a,a,a)$: produto $=a^2$; módulos $a\sqrt3$ cada: $\cos\varphi=\dfrac13\Rightarrow\varphi\approx70^\circ31'$.</p>`, add: [vec(S(Dc, Ac), 'o', 'AD', Ac)] }],
    r`a) $0$ &nbsp; b) $0$ &nbsp; c) $0$ &nbsp; d) $a\sqrt2$ e $a\sqrt3$ &nbsp; e) $a^2$ &nbsp; f) $(a^3,a^3,a^3)$ &nbsp; g) $\arccos\frac{\sqrt3}3\approx54^\circ44'$ &nbsp; h) $\arccos\frac13\approx70^\circ31'$`);
})();
