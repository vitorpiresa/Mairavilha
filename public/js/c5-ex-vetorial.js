// Exercícios de produto vetorial (1–29).
(function () {
  const A = V.add, S = V.sub, M = V.mul, cross = V.cross, dot = V.dot, nrm = V.norm;
  const X = (n, stmt, base, steps, ans, extra) => Deck.ex(Object.assign({ g: 'V', n, stmt, base, steps, ans }, extra || {}));
  const vec = (v, c, l, o) => Object.assign({ v, c, l }, o ? { o } : {});
  const pt = (p, l, c = 'g') => ({ p, l, c });
  const ang = (at, a, b, r, l, c = 'w') => ({ arc: { at, a, b, r }, l, c });
  const par = (a, b, c, d, col = 'u', al = .16) => ({ poly: [a, b, c, d], c: col, a: al });
  const s2 = Math.sqrt(2), s3 = Math.sqrt(3);
  const ra = (at, a, b, s = .5) => ({ ra: { at, a, b, s }, c: 'w' });

  // ===================== A: definição e propriedades =====================
  Deck.section('Exercícios · produto vetorial (A)', 'exv-a');

  const u1 = [3, -1, -2], v1 = [2, 4, -1], w1 = [-1, 0, 1];
  X(2, r`Efetuar: a) $\vec i\times\vec k$ b) $\vec j\times(2\vec i)$ c) $(3\vec i)\times(2\vec k)$ d) $\vec i\cdot(\vec j\times\vec k)$ e) $(3\vec i)\cdot(2\vec j)$ f) $(3\vec i)\times(2\vec j)$ g) $\vec i\cdot(\vec j\times\vec i)$ h) $\vec j\cdot(\vec j\times\vec k)$ i) $(\vec i\times\vec j)\times\vec k$ j) $(\vec i\times\vec j)\times\vec j$ k) $\vec i\times(\vec j\times\vec j)$ l) $(\vec j\times\vec k)\cdot\vec i$`,
    [vec([1, 0, 0], 'x', '>i'), vec([0, 1, 0], 'y', '>j'), vec([0, 0, 1], 'z', '>k')],
    [r`<p>Use o ciclo: $\vec i\times\vec j=\vec k$, $\vec j\times\vec k=\vec i$, $\vec k\times\vec i=\vec j$; contra o ciclo, sinal trocado; igual com igual dá $\vec 0$.</p>`,
      r`<p><b>a)</b> $\vec i\times\vec k=-\vec j$. &nbsp; <b>b)</b> $2(\vec j\times\vec i)=-2\vec k$. &nbsp; <b>c)</b> $6(\vec i\times\vec k)=-6\vec j$. &nbsp; <b>f)</b> $6\vec k$.</p>`,
      r`<p><b>d)</b> $\vec j\times\vec k=\vec i$, e $\vec i\cdot\vec i=1$. &nbsp; <b>e)</b> $\vec i\cdot\vec j=0$ (escalar!), logo $0$. &nbsp; <b>g)</b> $\vec j\times\vec i=-\vec k$ e $\vec i\cdot\vec k=0$. &nbsp; <b>h)</b> $\vec j\cdot\vec i=0$.</p>`,
      r`<p><b>i)</b> $\vec k\times\vec k=\vec 0$. &nbsp; <b>j)</b> $\vec k\times\vec j=-\vec i$. &nbsp; <b>k)</b> $\vec j\times\vec j=\vec 0\Rightarrow\vec 0$. &nbsp; <b>l)</b> $\vec i\cdot\vec i=1$.</p>`],
    r`a) $-\vec j$ b) $-2\vec k$ c) $-6\vec j$ d) $1$ e) $0$ f) $6\vec k$ g) $0$ h) $0$ i) $\vec 0$ j) $-\vec i$ k) $\vec 0$ l) $1$`);

  X(1, r`Se $\vec u=3\vec i-\vec j-2\vec k$, $\vec v=2\vec i+4\vec j-\vec k$ e $\vec w=-\vec i+\vec k$, determinar: a) $|\vec u\times\vec u|$ b) $(2\vec v)\times(3\vec v)$ c) $(\vec u\times\vec w)+(\vec w\times\vec u)$ d) $(\vec u\times\vec v)\times(\vec v\times\vec u)$ e) $(\vec u-\vec v)\times\vec w$ f) $(\vec u\times\vec v)\times\vec w$ g) $\vec u\times(\vec v\times\vec w)$ h) $\vec u\times(\vec v+\vec w)$ i) $\vec u\times\vec v+\vec u\times\vec w$ j) $(\vec u\times\vec v)\cdot\vec v$ k) $(\vec u\times\vec v)\cdot\vec w$ l) $\vec u\cdot(\vec v\times\vec w)$`,
    [vec(u1, 'u', '>u'), vec(v1, 'v', '>v'), vec(w1, 'w', '>w')],
    [r`<p>Calculamos os três produtos básicos (use o dispositivo prático): $\vec u\times\vec v=(9,-1,14)$, $\vec u\times\vec w=(-1,-1,-1)$, $\vec v\times\vec w=(4,-1,4)$.</p>`,
      { h: r`<p><b>a)</b> $\vec u\times\vec u=\vec 0$. &nbsp; <b>b)</b> $6(\vec v\times\vec v)=\vec 0$. &nbsp; <b>c)</b> $\vec w\times\vec u=-\vec u\times\vec w$, a soma é $\vec 0$. &nbsp; <b>d)</b> $\vec v\times\vec u=-(\vec u\times\vec v)$: os dois fatores são <b>paralelos</b> ⇒ $\vec 0$.</p>`, add: [vec([9, -1, 14], 'r', '>u×v')] },
      { h: r`<p><b>e)</b> $(\vec u-\vec v)\times\vec w=\vec u\times\vec w-\vec v\times\vec w=(-1,-1,-1)-(4,-1,4)=(-5,0,-5)$.</p><p><b>f)</b> $(9,-1,14)\times(-1,0,1)=(-1,-23,-1)$.</p>`, add: [vec([-5, 0, -5], 'o', '(u−v)×w', null)].map((o) => Object.assign(o, { l: undefined, nolg: true })) },
      r`<p><b>g)</b> $\vec u\times(4,-1,4)=(-6,-20,1)$.</p><p><b>h)</b> $\vec u\times(\vec v+\vec w)=\vec u\times(1,4,0)=(8,-2,13)$, e <b>i)</b> é o mesmo, pela distributiva: $(9,-1,14)+(-1,-1,-1)=(8,-2,13)$ ✓.</p>`,
      r`<p><b>j)</b> $(\vec u\times\vec v)\cdot\vec v=0$ (o produto vetorial é ⟂ a $\vec v$).</p><p><b>k)</b> $(9,-1,14)\cdot(-1,0,1)=-9+14=5$. &nbsp; <b>l)</b> $(3,-1,-2)\cdot(4,-1,4)=12+1-8=5$. <small>(j–l: "produto misto", só como conta.)</small></p>`],
    r`a) $0$ b) $\vec 0$ c) $\vec 0$ d) $\vec 0$ e) $(-5,0,-5)$ f) $(-1,-23,-1)$ g) $(-6,-20,1)$ h) $(8,-2,13)$ i) $(8,-2,13)$ j) $0$ k) $5$ l) $5$`);

  const pA = [2, 1, -1], pB = [3, 0, 1], pC = [2, -1, -3], AD3 = cross(S(pC, pB), S(pC, pA));
  X(3, r`Dados $A(2,1,-1)$, $B(3,0,1)$ e $C(2,-1,-3)$, determinar o ponto $D$ tal que $\overrightarrow{AD}=\overrightarrow{BC}\times\overrightarrow{AC}$.`,
    [pt(pA, 'A'), pt(pB, 'B'), pt(pC, 'C'), { poly: [pA, pB, pC], c: 'u', a: .1 }],
    [r`$$\overrightarrow{BC}=(-1,-1,-4),\qquad\overrightarrow{AC}=(0,-2,-2).$$`,
      r`$$\overrightarrow{BC}\times\overrightarrow{AC}=\big((-1)(-2)-(-4)(-2),\;(-4)(0)-(-1)(-2),\;(-1)(-2)-(-1)(0)\big)=(-6,-2,2).$$`,
      r`<p>$D=A+\overrightarrow{AD}=(2-6,\,1-2,\,-1+2)=(-4,-1,1)$.</p>`],
    r`$D(-4,-1,1)$`, { ansAdd: [vec(AD3, 'r', 'AD', pA), pt(A(pA, AD3), 'D', 'r')] });

  X(4, r`Determinar o vetor $\vec x$ tal que $\vec x\cdot(1,4,-3)=-7$ e $\vec x\times(4,-2,1)=(3,5,-2)$.`,
    [vec([1, 4, -3], 'u', '>a'), vec([4, -2, 1], 'v', '>b'), vec([3, 5, -2], 'w', '>x×b')],
    [r`<p>Com $\vec x=(a,b,c)$, a condição vetorial dá três equações:</p>$$\vec x\times(4,-2,1)=(b+2c,\;4c-a,\;-2a-4b)=(3,5,-2).$$`,
      r`<p>$b=3-2c$ e $a=4c-5$. (A 3ª equação, $a+2b=1$, é consequência: o sistema vetorial tem rank 2.)</p>`,
      r`<p>Falta a condição escalar: $a+4b-3c=-7\Rightarrow(4c-5)+4(3-2c)-3c=-7\Rightarrow-7c+7=-7\Rightarrow c=2$.</p><p>Logo $a=3$, $b=-1$.</p>`],
    r`$\vec x=(3,-1,2)$`, { ansAdd: [vec([3, -1, 2], 'r', '>x')] });

  X(5, r`Resolver os sistemas: a) $\begin{cases}\vec x\times\vec j=\vec k\\ \vec x\cdot(4\vec i-2\vec j+\vec k)=10\end{cases}$ &nbsp; b) $\begin{cases}\vec x\times(2\vec i-\vec j+3\vec k)=\vec 0\\ \vec x\cdot(\vec i+2\vec j-2\vec k)=12\end{cases}$`,
    [vec([0, 1, 0], 'y', '>j'), vec([0, 0, 1], 'z', '>k')],
    [r`<p><b>a)</b> $\vec x=(a,b,c)$: $\vec x\times\vec j=(-c,\,0,\,a)=(0,0,1)\Rightarrow c=0,\ a=1$.</p>`,
      { h: r`<p>$\vec x\cdot(4,-2,1)=4-2b+0=10\Rightarrow b=-3$. Então $\vec x=(1,-3,0)$.</p>`, add: [vec([1, -3, 0], 'r', '>x_a')] },
      r`<p><b>b)</b> $\vec x\times\vec w=\vec 0$ significa $\vec x\parallel\vec w$ (com $\vec w=(2,-1,3)$): $\vec x=\lambda(2,-1,3)$.</p>`,
      { h: r`<p>$\vec x\cdot(1,2,-2)=\lambda(2-2-6)=-6\lambda=12\Rightarrow\lambda=-2$, então $\vec x=(-4,2,-6)$.</p>`, add: [vec([-4, 2, -6], 'o', '>x_b'), vec([2, -1, 3], 'w', '>w')] }],
    r`a) $\vec x=(1,-3,0)$ &nbsp; b) $\vec x=(-4,2,-6)$`);

  X(6, r`Dados $\vec u=(3,1,1)$, $\vec v=(-4,1,3)$ e $\vec w=(1,2,0)$, determinar $\vec x$ de modo que $\vec x\perp\vec w$ e $\vec x\times\vec u=\vec v$.`,
    [vec([3, 1, 1], 'u', '>u'), vec([-4, 1, 3], 'v', '>v'), vec([1, 2, 0], 'w', '>w')],
    [r`<p>Um produto vetorial é <b>sempre ortogonal aos dois fatores</b>. Se $\vec x\times\vec u=\vec v$, então $\vec v\perp\vec u$ obrigatoriamente.</p>`,
      r`<p>Teste: $\vec u\cdot\vec v=-12+1+3=-8\neq0$.</p>`],
    r`<b>Não existe</b> $\vec x$, pois $\vec u$ não é ortogonal a $\vec v$.`, { ansAdd: [{ txt: [0, 0, 3.6], l: 'u·v ≠ 0', c: 'v' }] });

  const cb = 2, cO = [0, 0, 0], cAA = [cb, 0, 0], cBB = [cb, cb, 0], cCC = [0, cb, 0], cDD = [0, cb, cb], cEE = [0, 0, cb], cFF = [cb, 0, cb], cGG = [cb, cb, cb];
  X(7, r`Considerando o cubo de aresta $a$ (vértices $O,A,B,C,D,E,F,G$ como na figura), calcular: a) $\overrightarrow{OF}\times\overrightarrow{OD}$ b) $\overrightarrow{AC}\times\overrightarrow{FA}$ c) $\overrightarrow{AB}\times\overrightarrow{AC}$ d) $\overrightarrow{EC}\times\overrightarrow{EA}$ e) $\overrightarrow{OA}\cdot(\overrightarrow{OC}\times\overrightarrow{OE})$ f) $\overrightarrow{GB}\times\overrightarrow{AF}$`,
    [{ box: [cb, cb, cb], c: 'g' }, pt(cO, 'O'), pt(cAA, 'A'), pt(cBB, 'B'), pt(cCC, 'C'), pt(cDD, 'D'), pt(cEE, 'E'), pt(cFF, 'F'), pt(cGG, 'G')],
    [r`<p>Coordenadas: $O(0,0,0)$, $A(a,0,0)$, $B(a,a,0)$, $C(0,a,0)$, $D(0,a,a)$, $E(0,0,a)$, $F(a,0,a)$, $G(a,a,a)$.</p>`,
      { h: r`<p><b>a)</b> $\overrightarrow{OF}=(a,0,a)$, $\overrightarrow{OD}=(0,a,a)$: $\overrightarrow{OF}\times\overrightarrow{OD}=(-a^2,-a^2,a^2)$.</p>`, add: [vec(cross(cFF, cDD), 'r', 'OF×OD')].map((o) => Object.assign(o, { nolg: true })) },
      r`<p><b>b)</b> $\overrightarrow{AC}=(-a,a,0)$, $\overrightarrow{FA}=(0,0,-a)$: $(-a^2,-a^2,0)$.</p><p><b>c)</b> $\overrightarrow{AB}=(0,a,0)$, $\overrightarrow{AC}=(-a,a,0)$: $(0,0,a^2)$.</p>`,
      r`<p><b>d)</b> $\overrightarrow{EC}=(0,a,-a)$, $\overrightarrow{EA}=(a,0,-a)$: $(-a^2,-a^2,-a^2)$.</p>`,
      r`<p><b>e)</b> $\overrightarrow{OC}\times\overrightarrow{OE}=(a^2,0,0)$ e $\overrightarrow{OA}\cdot(a^2,0,0)=a^3$.</p><p><b>f)</b> $\overrightarrow{GB}=(0,0,-a)$ e $\overrightarrow{AF}=(0,0,a)$ são paralelos: $\vec 0$.</p>`],
    r`a) $(-a^2,-a^2,a^2)$ b) $(-a^2,-a^2,0)$ c) $(0,0,a^2)$ d) $(-a^2,-a^2,-a^2)$ e) $a^3$ f) $\vec 0$`);

  const u8 = [1, -2, 1], v8 = [1, 1, 1], w8 = [1, 0, -1];
  X(8, r`Sejam $\vec u=(1,-2,1)$, $\vec v=(1,1,1)$ e $\vec w=(1,0,-1)$. a) Usar o produto escalar para mostrar que são dois a dois ortogonais. b) Usar o produto vetorial para mostrar que o produto vetorial de quaisquer dois deles é paralelo ao terceiro. c) Mostrar que $\vec u\times(\vec v\times\vec w)=\vec 0$.`,
    [vec(u8, 'u', '>u'), vec(v8, 'v', '>v'), vec(w8, 'w', '>w'), ra([0, 0, 0], u8, v8, .4), ra([0, 0, 0], u8, w8, .6), ra([0, 0, 0], v8, w8, .8)],
    [r`<p><b>a)</b> $\vec u\cdot\vec v=1-2+1=0$, $\ \vec u\cdot\vec w=1+0-1=0$, $\ \vec v\cdot\vec w=1+0-1=0$ ✓.</p>`,
      { h: r`<p><b>b)</b> $\vec u\times\vec v=(-3,0,3)=-3\vec w$; $\ \vec u\times\vec w=(2,2,2)=2\vec v$; $\ \vec v\times\vec w=(-1,2,-1)=-\vec u$.</p><p>Faz sentido: três vetores mutuamente ortogonais — o vetorial de dois é ortogonal a ambos, e só sobra a direção do terceiro.</p>`, add: [vec(cross(u8, v8), 'r', 'u×v', null), vec(cross(v8, w8), 'o', 'v×w', null)].map((o) => Object.assign(o, { nolg: true })) },
      r`<p><b>c)</b> $\vec v\times\vec w=-\vec u$, e $\vec u\times(-\vec u)=\vec 0$ ∎.</p>`],
    r`a) $0,0,0$ &nbsp; b) $\vec u\times\vec v=-3\vec w$, $\vec u\times\vec w=2\vec v$, $\vec v\times\vec w=-\vec u$ &nbsp; c) $\vec 0$`);

  // ===================== B: vetores ortogonais =====================
  Deck.section('Exercícios · produto vetorial (B)', 'exv-b');

  const u9 = [-3, 2, 0], v9 = [0, -1, -2];
  X(9, r`Determinar um vetor simultaneamente ortogonal aos vetores $\vec u+2\vec v$ e $\vec v-\vec u$, sendo $\vec u=(-3,2,0)$ e $\vec v=(0,-1,-2)$.`,
    [vec(u9, 'u', '>u'), vec(v9, 'v', '>v')],
    [r`<p>$\vec u+2\vec v=(-3,0,-4)$ e $\vec v-\vec u=(3,-3,-2)$. Um vetor ortogonal aos dois é o produto vetorial deles.</p>`,
      { h: r`$$(-3,0,-4)\times(3,-3,-2)=\big(0\cdot(-2)-(-4)(-3),\;(-4)(3)-(-3)(-2),\;(-3)(-3)-0\big)=(-12,-18,9).$$`, add: [vec([-3, 0, -4], 'w', 'a', null), vec([3, -3, -2], 'o', 'b', null), vec([-12, -18, 9], 'r', 'a×b', null)].map((o) => Object.assign(o, { nolg: true })) }],
    r`Um deles: $(-12,-18,9)$ (qualquer múltiplo serve).`);

  const tA10 = [2, 3, 1], tB10 = [1, -1, 1], tC10 = [4, 1, -2];
  X(10, r`Obter um vetor ortogonal ao plano determinado pelos pontos $A(2,3,1)$, $B(1,-1,1)$ e $C(4,1,-2)$.`,
    [pt(tA10, 'A'), pt(tB10, 'B'), pt(tC10, 'C'), { poly: [tA10, tB10, tC10], c: 'u', a: .15 }],
    [r`<p>O plano contém $\overrightarrow{AB}$ e $\overrightarrow{AC}$; o vetor normal é $\overrightarrow{AB}\times\overrightarrow{AC}$.</p>`,
      r`$$\overrightarrow{AB}=(-1,-4,0),\quad\overrightarrow{AC}=(2,-2,-3).$$`,
      r`$$\overrightarrow{AB}\times\overrightarrow{AC}=\big((-4)(-3)-0,\;0\cdot2-(-1)(-3),\;(-1)(-2)-(-4)(2)\big)=(12,-3,10).$$`],
    r`$(12,-3,10)$`, { ansAdd: [vec([12, -3, 10], 'r', '>n', tA10)] });

  X(11, r`Dado $\vec v_1=(1,-2,1)$, determinar vetores $\vec v_2$ e $\vec v_3$ de modo que os três sejam mutuamente ortogonais.`,
    [vec([1, -2, 1], 'u', '>v_1')],
    [r`<p>Escolha $\vec v_2\perp\vec v_1$ qualquer: $x-2y+z=0$. Ex.: $(1,1,1)$ ($1-2+1=0$ ✓).</p>`,
      { h: r`<p>Para $\vec v_3$ use o vetorial (ortogonal aos dois): $\vec v_1\times\vec v_2=(-2-1,\;1-1,\;1+2)=(-3,0,3)\parallel(-1,0,1)$.</p>`, add: [vec([1, 1, 1], 'v', '>v_2'), vec([-1, 0, 1], 'w', '>v_3')] }],
    r`Uma solução: $\vec v_2=(1,1,1)$ e $\vec v_3=(-1,0,1)$.`, { ansAdd: [ra([0, 0, 0], [1, -2, 1], [1, 1, 1], .35), ra([0, 0, 0], [1, -2, 1], [-1, 0, 1], .5), ra([0, 0, 0], [1, 1, 1], [-1, 0, 1], .65)] });

  const u12 = [1, 1, 0], v12 = [-1, 1, 2], n12 = cross(u12, v12);
  X(12, r`Dados $\vec u=(1,1,0)$ e $\vec v=(-1,1,2)$, determinar: a) um vetor unitário simultaneamente ortogonal a $\vec u$ e $\vec v$; b) um vetor de módulo $5$ simultaneamente ortogonal a $\vec u$ e $\vec v$.`,
    [vec(u12, 'u', '>u'), vec(v12, 'v', '>v')],
    [{ h: r`$$\vec u\times\vec v=(1\cdot2-0,\;0\cdot(-1)-1\cdot2,\;1\cdot1-1\cdot(-1))=(2,-2,2),\quad|\vec u\times\vec v|=2\sqrt3.$$`, add: [vec(n12, 'r', '>u×v')] },
      { h: r`<p><b>a)</b> Normalizando: $\dfrac{(2,-2,2)}{2\sqrt3}=\left(\tfrac1{\sqrt3},-\tfrac1{\sqrt3},\tfrac1{\sqrt3}\right)$ (ou o oposto).</p>`, add: [vec(M(n12, 1 / (2 * s3)), 'o', '>û')] },
      r`<p><b>b)</b> Multiplique por $5$: $\left(\tfrac5{\sqrt3},-\tfrac5{\sqrt3},\tfrac5{\sqrt3}\right)$ (ou o oposto).</p>`],
    r`a) $\pm\left(\frac1{\sqrt3},-\frac1{\sqrt3},\frac1{\sqrt3}\right)$ &nbsp; b) $\pm\left(\frac5{\sqrt3},-\frac5{\sqrt3},\frac5{\sqrt3}\right)$`);

  X(13, r`Determinar um vetor de módulo $2$ ortogonal a $\vec u=(3,2,2)$ e a $\vec v=(0,1,1)$.`,
    [vec([3, 2, 2], 'u', '>u'), vec([0, 1, 1], 'v', '>v')],
    [{ h: r`$$\vec u\times\vec v=(2\cdot1-2\cdot1,\;2\cdot0-3\cdot1,\;3\cdot1-0)=(0,-3,3),\quad|\vec u\times\vec v|=3\sqrt2.$$`, add: [vec([0, -3, 3], 'r', '>u×v')] },
      r`<p>Unitário: $\dfrac{(0,-3,3)}{3\sqrt2}=\left(0,-\tfrac1{\sqrt2},\tfrac1{\sqrt2}\right)$. Com módulo $2$: $\left(0,-\sqrt2,\sqrt2\right)$.</p>`],
    r`$(0,-\sqrt2,\sqrt2)$ ou $(0,\sqrt2,-\sqrt2)$`, { ansAdd: [vec([0, -s2, s2], 'o', '>w')] });

  // ===================== C: módulo, áreas e distâncias =====================
  Deck.section('Exercícios · produto vetorial (C)', 'exv-c');

  const lA = [0, s3, 0], lB = [-1, 0, 0], lC = [0, -s3, 0], lD = [1, 0, 0];
  X(14, r`Com base na figura do losango (lado $2$, ângulo de $60^\circ$ em $A$), calcular: a) $|\overrightarrow{AB}\times\overrightarrow{AD}|$ b) $|\overrightarrow{BA}\times\overrightarrow{BC}|$ c) $|\overrightarrow{AB}\times\overrightarrow{DC}|$ d) $|\overrightarrow{AB}\times\overrightarrow{CD}|$ e) $|\overrightarrow{BD}\times\overrightarrow{AC}|$ f) $|\overrightarrow{BD}\times\overrightarrow{CD}|$`,
    [pt(lA, 'A'), pt(lB, 'B'), pt(lC, 'C'), pt(lD, 'D'), par(lA, lB, lC, lD)],
    [r`<p>Ângulos: $\hat A=\hat C=60^\circ$, $\hat B=\hat D=120^\circ$; diagonais $|\overrightarrow{AC}|=2\sqrt3$, $|\overrightarrow{BD}|=2$, perpendiculares.</p>`,
      r`<p><b>a)</b> $2\cdot2\sin60^\circ=2\sqrt3$. &nbsp; <b>b)</b> $2\cdot2\sin120^\circ=2\sqrt3$.</p>`,
      r`<p><b>c)</b> $\overrightarrow{DC}=\overrightarrow{AB}$ (paralelos) ⇒ $0$. &nbsp; <b>d)</b> $\overrightarrow{CD}=-\overrightarrow{AB}$ (paralelos) ⇒ $0$.</p>`,
      r`<p><b>e)</b> $\overrightarrow{BD}\perp\overrightarrow{AC}$: $2\cdot2\sqrt3\cdot\sin90^\circ=4\sqrt3$.</p>`,
      r`<p><b>f)</b> $|\overrightarrow{BD}\times\overrightarrow{CD}|$ é o dobro da área do triângulo $BCD$ (base $BD=2$, altura $\sqrt3$): $2\cdot\tfrac12\cdot2\cdot\sqrt3=2\sqrt3$.</p>`],
    r`a) $2\sqrt3$ b) $2\sqrt3$ c) $0$ d) $0$ e) $4\sqrt3$ f) $2\sqrt3$`);

  X(15, r`Sendo $|\vec u|=2\sqrt2$, $|\vec v|=4$ e $45^\circ$ o ângulo entre $\vec u$ e $\vec v$, calcular: a) $|2\vec u\times\vec v|$ &nbsp; b) $\left|\dfrac25\vec u\times\dfrac12\vec v\right|$`,
    (() => { const u = [2 * s2, 0, 0], v = V.polar(4, V.deg(45)); return [vec(u, 'u', '>u'), vec(v, 'v', '>v'), ang([0, 0, 0], u, v, .9, '45°'), par([0, 0, 0], u, A(u, v), v, 'w', .15)]; })(),
    [r`<p>$|\vec u\times\vec v|=2\sqrt2\cdot4\cdot\sin45^\circ=2\sqrt2\cdot4\cdot\tfrac{\sqrt2}2=8$.</p>`,
      r`<p><b>a)</b> $|2\vec u\times\vec v|=2\cdot8=16$. &nbsp; <b>b)</b> $\left|\tfrac25\cdot\tfrac12\,\vec u\times\vec v\right|=\tfrac15\cdot8=\tfrac85$.</p>`],
    r`a) $16$ &nbsp; b) $\dfrac85$`);

  X(16, r`Determinar $\vec u\cdot\vec v$, sabendo que $|\vec u\times\vec v|=12$, $|\vec u|=13$ e $\vec v$ é unitário.`,
    [vec([13, 0, 0], 'u', '>u'), vec([5 / 13, 12 / 13, 0], 'v', '>v')],
    [r`<p>$|\vec u\times\vec v|=|\vec u||\vec v|\sin\theta\Rightarrow12=13\cdot1\cdot\sin\theta\Rightarrow\sin\theta=\dfrac{12}{13}$.</p>`,
      r`<p>Então $\cos\theta=\pm\sqrt{1-\tfrac{144}{169}}=\pm\dfrac5{13}$ (o enunciado não diz se o ângulo é agudo ou obtuso).</p>`,
      r`<p>$\vec u\cdot\vec v=13\cdot1\cdot\cos\theta=\pm5$.</p>`],
    r`$5$ ou $-5$`, { ansAdd: [vec([-5 / 13, 12 / 13, 0], 'o', '>v')] });

  const u17 = [3, -1, 2], v17 = [-2, 2, 1];
  X(17, r`Dados $\vec u=(3,-1,2)$ e $\vec v=(-2,2,1)$, calcular: a) a área do paralelogramo determinado por $\vec u$ e $\vec v$; b) a altura do paralelogramo relativa à base definida pelo vetor $\vec v$.`,
    [vec(u17, 'u', '>u'), vec(v17, 'v', '>v'), par([0, 0, 0], u17, A(u17, v17), v17, 'w', .15)],
    [r`$$\vec u\times\vec v=\big((-1)(1)-2\cdot2,\;2(-2)-3\cdot1,\;3\cdot2-(-1)(-2)\big)=(-5,-7,4).$$`,
      { h: r`<p><b>a)</b> Área $=|\vec u\times\vec v|=\sqrt{25+49+16}=\sqrt{90}=3\sqrt{10}$.</p>`, add: [vec(cross(u17, v17), 'r', '>u×v')] },
      r`<p><b>b)</b> Área $=$ base $\times$ altura, com base $|\vec v|=3$: $h=\dfrac{3\sqrt{10}}3=\sqrt{10}$.</p>`],
    r`a) $3\sqrt{10}$ &nbsp; b) $\sqrt{10}$`);

  const p18 = { A: [4, 1, 2], B: [5, 0, 1], C: [-1, 2, -2], D: [-2, 3, -1] };
  X(18, r`Mostrar que o quadrilátero $ABCD$ de vértices $A(4,1,2)$, $B(5,0,1)$, $C(-1,2,-2)$ e $D(-2,3,-1)$ é um paralelogramo e calcular sua área.`,
    [pt(p18.A, 'A'), pt(p18.B, 'B'), pt(p18.C, 'C'), pt(p18.D, 'D'), par(p18.A, p18.B, p18.C, p18.D)],
    [r`<p>Paralelogramo $\iff\overrightarrow{AB}=\overrightarrow{DC}$.</p>`,
      r`<p>$\overrightarrow{AB}=(1,-1,-1)$ e $\overrightarrow{DC}=C-D=(1,-1,-1)$ ✓ — é paralelogramo.</p>`,
      r`<p>Área $=|\overrightarrow{AB}\times\overrightarrow{AD}|$, com $\overrightarrow{AD}=(-6,2,-3)$:</p>$$\overrightarrow{AB}\times\overrightarrow{AD}=(3+2,\;6+3,\;2-6)=(5,9,-4),\quad\sqrt{25+81+16}=\sqrt{122}.$$`],
    r`Área $=\sqrt{122}$`);

  const p19 = { A: [2, -4, 0], B: [1, -3, -1], M: [3, 2, -2] }, C19 = S(M(p19.M, 2), p19.A), D19 = S(M(p19.M, 2), p19.B);
  X(19, r`Dois vértices consecutivos de um paralelogramo são $A(2,-4,0)$ e $B(1,-3,-1)$ e o ponto médio das diagonais é $M(3,2,-2)$. Calcular a área do paralelogramo.`,
    [pt(p19.A, 'A'), pt(p19.B, 'B'), pt(p19.M, 'M', 'w')],
    [r`<p>As diagonais se cortam ao meio em $M$: $C=2M-A$ e $D=2M-B$.</p>`,
      { h: r`$$C=(4,8,-4),\qquad D=(5,7,-3).$$`, add: [pt(C19, 'C'), pt(D19, 'D'), par(p19.A, p19.B, C19, D19)] },
      r`<p>$\overrightarrow{AB}=(-1,1,-1)$ e $\overrightarrow{AD}=(3,11,-3)$.</p>$$\overrightarrow{AB}\times\overrightarrow{AD}=(-3+11,\;-3-3,\;-11-3)=(8,-6,-14),\quad\sqrt{64+36+196}=\sqrt{296}=2\sqrt{74}.$$`],
    r`Área $=2\sqrt{74}$`);

  X(20, r`Calcular o valor de $m$ para que a área do paralelogramo determinado por $\vec u=(m,-3,1)$ e $\vec v=(1,-2,2)$ seja igual a $\sqrt{26}$.`,
    [vec([2, -3, 1], 'u', '>u'), vec([1, -2, 2], 'v', '>v'), vec([0, -3, 1], 'o', '>u')],
    [r`$$\vec u\times\vec v=\big(-6+2,\;1-2m,\;-2m+3\big)=(-4,\,1-2m,\,3-2m).$$`,
      r`$$16+(1-2m)^2+(3-2m)^2=26\Rightarrow8m^2-16m+26=26\Rightarrow8m(m-2)=0.$$`],
    r`$m=0$ ou $m=2$`);

  const u21 = V.polar(6, 0), v21 = V.polar(4, V.deg(30));
  X(21, r`Sabendo que $|\vec u|=6$, $|\vec v|=4$ e $30^\circ$ o ângulo entre $\vec u$ e $\vec v$, calcular: a) a área do triângulo determinado por $\vec u$ e $\vec v$; b) a área do paralelogramo determinado por $\vec u$ e $(-\vec v)$; c) a área do paralelogramo determinado por $\vec u+\vec v$ e $\vec u-\vec v$.`,
    [vec(u21, 'u', '>u'), vec(v21, 'v', '>v'), ang([0, 0, 0], u21, v21, 1.2, '30°'), { poly: [[0, 0, 0], u21, v21], c: 'w', a: .2 }],
    [r`<p>$|\vec u\times\vec v|=6\cdot4\cdot\sin30^\circ=12$.</p>`,
      r`<p><b>a)</b> Triângulo: metade, $\tfrac{12}2=6$.</p>`,
      { h: r`<p><b>b)</b> $\vec u\times(-\vec v)=-(\vec u\times\vec v)$ tem o mesmo módulo: $12$.</p>`, add: [vec(M(v21, -1), 'o', '->v', null).l ? vec(M(v21, -1), 'o', '->v') : vec(M(v21, -1), 'o', '->v')] },
      r`<p><b>c)</b> $(\vec u+\vec v)\times(\vec u-\vec v)=-\vec u\times\vec v+\vec v\times\vec u=-2\,\vec u\times\vec v$, de módulo $2\cdot12=24$.</p>`],
    r`a) $6$ &nbsp; b) $12$ &nbsp; c) $24$`);

  const d1 = [-1, 3, 4], d2 = [1, -1, 2], u22 = M(A(d1, d2), .5), v22 = M(S(d1, d2), .5);
  X(22, r`Calcular a área do paralelogramo determinado pelos vetores $\vec u$ e $\vec v$, sabendo que suas diagonais são $\vec u+\vec v=(-1,3,4)$ e $\vec u-\vec v=(1,-1,2)$.`,
    [vec(d1, 'u', '>u+v'), vec(d2, 'v', '>u-v')],
    [r`<p>Se $\vec d_1=\vec u+\vec v$ e $\vec d_2=\vec u-\vec v$, então $\vec d_1\times\vec d_2=-2\,\vec u\times\vec v$, ou seja, <b>área $=\tfrac12|\vec d_1\times\vec d_2|$</b>.</p>`,
      r`$$\vec d_1\times\vec d_2=(6+4,\;4+2,\;1-3)=(10,6,-2),\quad|\vec d_1\times\vec d_2|=\sqrt{140}=2\sqrt{35}.$$`,
      { h: r`<p>Área $=\tfrac12\cdot2\sqrt{35}=\sqrt{35}$.</p><p>(Conferindo: $\vec u=(0,1,3)$, $\vec v=(-1,2,1)$, $\vec u\times\vec v=(-5,-3,1)$, módulo $\sqrt{35}$ ✓.)</p>`, add: [vec(u22, 'w', '>u'), vec(v22, 'o', '>v'), par([0, 0, 0], u22, d1, v22, 'w', .15)] }],
    r`$\sqrt{35}$`);

  const P23 = [4, 3, 3], A23 = [1, 2, -1], B23 = [3, 1, 1];
  X(23, r`Calcular a distância do ponto $P(4,3,3)$ à reta que passa por $A(1,2,-1)$ e $B(3,1,1)$.`,
    [pt(A23, 'A'), pt(B23, 'B'), pt(P23, 'P', 'v'), { L: [A23, S(B23, A23)], c: 'u', dash: true }],
    [r`<p>A distância é a altura do triângulo $ABP$ relativa à base $AB$: $d=\dfrac{|\overrightarrow{AB}\times\overrightarrow{AP}|}{|\overrightarrow{AB}|}$.</p>`,
      r`$$\overrightarrow{AB}=(2,-1,2),\quad\overrightarrow{AP}=(3,1,4),\quad\overrightarrow{AP}\times\overrightarrow{AB}=(6,2,-5),$$$$|\overrightarrow{AB}\times\overrightarrow{AP}|=\sqrt{36+4+25}=\sqrt{65},\quad|\overrightarrow{AB}|=3.$$`],
    r`$d=\dfrac{\sqrt{65}}3$`, { ansAdd: [{ s: [P23, A(A23, V.proj(S(P23, A23), S(B23, A23)))], c: 'r', l: 'd' }] });

  const t24a = { A: [-4, 1, 1], B: [1, 0, 1], C: [0, -1, 3] }, t24b = { A: [4, 2, 1], B: [1, 0, 1], C: [1, 2, 0] };
  X(24, r`Calcular a área do triângulo $ABC$ e a altura relativa ao lado $BC$, sendo dados: a) $A(-4,1,1)$, $B(1,0,1)$, $C(0,-1,3)$ &nbsp; b) $A(4,2,1)$, $B(1,0,1)$, $C(1,2,0)$.`,
    [pt(t24a.A, 'A'), pt(t24a.B, 'B'), pt(t24a.C, 'C'), { poly: [t24a.A, t24a.B, t24a.C], c: 'u', a: .15 }],
    [r`<p><b>a)</b> $\overrightarrow{AB}=(5,-1,0)$, $\overrightarrow{AC}=(4,-2,2)$, $\overrightarrow{AB}\times\overrightarrow{AC}=(-2,-10,-6)$, módulo $\sqrt{140}=2\sqrt{35}$.</p><p>Área $=\tfrac12\cdot2\sqrt{35}=\sqrt{35}$.</p>`,
      r`<p>Altura relativa a $BC$: $h=\dfrac{2\cdot\text{área}}{|\overrightarrow{BC}|}$ com $\overrightarrow{BC}=(-1,-1,2)$, $|\overrightarrow{BC}|=\sqrt6$: $h=\dfrac{2\sqrt{35}}{\sqrt6}$.</p>`,
      { h: r`<p><b>b)</b> $\overrightarrow{AB}=(-3,-2,0)$, $\overrightarrow{AC}=(-3,0,-1)$, $\overrightarrow{AB}\times\overrightarrow{AC}=(2,-3,-6)$, módulo $7$: área $=\tfrac72$.</p><p>$\overrightarrow{BC}=(0,2,-1)$, $|\overrightarrow{BC}|=\sqrt5$: $h=\dfrac{7}{\sqrt5}$.</p>`, set: [pt(t24b.A, 'A'), pt(t24b.B, 'B'), pt(t24b.C, 'C'), { poly: [t24b.A, t24b.B, t24b.C], c: 'u', a: .15 }] }],
    r`a) área $\sqrt{35}$, $h=\dfrac{2\sqrt{35}}{\sqrt6}$ &nbsp; b) área $\dfrac72$, $h=\dfrac7{\sqrt5}$`);

  const t25a = { P: [3, 0, 0], Q: [0, 3, 0], R: [0, 0, 2] }, t25b = { P: [2, 3, 0], Q: [0, 2, 1], R: [2, 0, 2] };
  X(25, r`Encontrar um vetor ortogonal ao plano determinado pelos pontos $P$, $Q$ e $R$ e calcular a área do triângulo $PQR$: a) $P(3,0,0)$, $Q(0,3,0)$, $R(0,0,2)$ &nbsp; b) $P(2,3,0)$, $Q(0,2,1)$, $R(2,0,2)$.`,
    [pt(t25a.P, 'P'), pt(t25a.Q, 'Q'), pt(t25a.R, 'R'), { poly: [t25a.P, t25a.Q, t25a.R], c: 'u', a: .15 }],
    [r`<p><b>a)</b> $\overrightarrow{PQ}=(-3,3,0)$, $\overrightarrow{PR}=(-3,0,2)$, $\overrightarrow{PQ}\times\overrightarrow{PR}=(6,6,9)=3(2,2,3)$.</p>`,
      { h: r`<p>O vetor normal é $t(2,2,3)$, $t\in\R$. Área $=\tfrac12\sqrt{36+36+81}=\tfrac12\sqrt{153}=\dfrac{3\sqrt{17}}2$.</p>`, add: [vec([6, 6, 9], 'r', '>n', t25a.P)] },
      { h: r`<p><b>b)</b> $\overrightarrow{PQ}=(-2,-1,1)$, $\overrightarrow{PR}=(0,-3,2)$, $\overrightarrow{PQ}\times\overrightarrow{PR}=(1,4,6)$.</p><p>Normal: $t(1,4,6)$. Área $=\tfrac12\sqrt{1+16+36}=\dfrac{\sqrt{53}}2$.</p>`, set: [pt(t25b.P, 'P'), pt(t25b.Q, 'Q'), pt(t25b.R, 'R'), { poly: [t25b.P, t25b.Q, t25b.R], c: 'u', a: .15 }, vec([1, 4, 6], 'r', '>n', t25b.P)] }],
    r`a) $t(2,2,3)$; $\dfrac{3\sqrt{17}}2$ &nbsp; b) $t(1,4,6)$; $\dfrac{\sqrt{53}}2$ &nbsp; ($t\in\R$)`);

  X(26, r`Calcular $z$, sabendo-se que $A(2,0,0)$, $B(0,2,0)$ e $C(0,0,z)$ são vértices de um triângulo de área $6$.`,
    [pt([2, 0, 0], 'A'), pt([0, 2, 0], 'B'), pt([0, 0, 4], 'C'), { poly: [[2, 0, 0], [0, 2, 0], [0, 0, 4]], c: 'u', a: .15 }],
    [r`$$\overrightarrow{AB}=(-2,2,0),\quad\overrightarrow{AC}=(-2,0,z),\quad\overrightarrow{AB}\times\overrightarrow{AC}=(2z,\;2z,\;4).$$`,
      r`<p>Área $=\tfrac12\sqrt{4z^2+4z^2+16}=6\Rightarrow\sqrt{8z^2+16}=12\Rightarrow8z^2=128$.</p><p>$z^2=16$.</p>`],
    r`$z=4$ ou $z=-4$`, { ansAdd: [pt([0, 0, -4], 'C', 'o'), { poly: [[2, 0, 0], [0, 2, 0], [0, 0, -4]], c: 'o', a: .12 }] });

  X(27, r`Dados os pontos $A(2,1,-1)$ e $B(0,2,1)$, determinar o ponto $C$ do eixo $Oy$ de modo que a área do triângulo $ABC$ seja $1{,}5$ u.a.`,
    [pt([2, 1, -1], 'A'), pt([0, 2, 1], 'B'), { L: [[0, 0, 0], [0, 1, 0]], c: 'y', dash: false, w: 2 }],
    [r`<p>$C=(0,y,0)$: $\overrightarrow{AB}=(-2,1,2)$, $\overrightarrow{AC}=(-2,y-1,1)$.</p>`,
      r`$$\overrightarrow{AB}\times\overrightarrow{AC}=(3-2y,\;-2,\;4-2y).$$`,
      r`<p>Área $=\tfrac32\Rightarrow|\cdot|=3\Rightarrow(3-2y)^2+4+(4-2y)^2=9\Rightarrow8y^2-28y+20=0\Rightarrow2y^2-7y+5=0$.</p><p>$y=\dfrac{7\pm3}4$.</p>`],
    r`$C(0,1,0)$ ou $C\left(0,\tfrac52,0\right)$`, { ansAdd: [pt([0, 1, 0], 'C₁', 'r'), pt([0, 2.5, 0], 'C₂', 'o')] });

  const q28 = { A: [4, 0, 0], B: [0, 0, 2], C: [0, 3, 0], D: [4, 3, -2] };
  X(28, r`Sabendo que os pontos $A(4,0,0)$, $B(0,0,2)$, $C(0,3,0)$ e $D(4,3,-2)$ são coplanares, calcular a área do quadrilátero $ABCD$.`,
    [pt(q28.A, 'A'), pt(q28.B, 'B'), pt(q28.C, 'C'), pt(q28.D, 'D'), { poly: [q28.A, q28.B, q28.C, q28.D], c: 'u', a: .14 }],
    [r`<p>Para um quadrilátero convexo, área $=\tfrac12|\overrightarrow{AC}\times\overrightarrow{BD}|$ (as diagonais).</p>`,
      { h: r`$$\overrightarrow{AC}=(-4,3,0),\quad\overrightarrow{BD}=(4,3,-4),\quad\overrightarrow{AC}\times\overrightarrow{BD}=(-12,-16,-24).$$`, add: [{ s: [q28.A, q28.C], c: 'g', dash: true }, { s: [q28.B, q28.D], c: 'g', dash: true }] },
      r`<p>$|\overrightarrow{AC}\times\overrightarrow{BD}|=\sqrt{144+256+576}=\sqrt{976}=4\sqrt{61}$; área $=\tfrac12\cdot4\sqrt{61}$.</p>`],
    r`Área $=2\sqrt{61}$`);

  const mM = [0, 1, 3], mN = [3, -2, 2], mP = [1, 0, 2], X1 = S(A(mM, mP), mN), X2 = S(A(mM, mN), mP), X3 = S(A(mN, mP), mM);
  X(29, r`Os pontos médios dos lados do triângulo $ABC$ são $M(0,1,3)$, $N(3,-2,2)$ e $P(1,0,2)$. Determinar a área do triângulo $ABC$.`,
    [pt(mM, 'M', 'w'), pt(mN, 'N', 'w'), pt(mP, 'P', 'w'), { poly: [mM, mN, mP], c: 'w', a: .2 }],
    [r`<p>O triângulo dos pontos médios tem lados paralelos aos de $ABC$ e <b>metade</b> do tamanho: sua área é $\tfrac14$ da de $ABC$.</p>`,
      r`$$\overrightarrow{MN}=(3,-3,-1),\quad\overrightarrow{MP}=(1,-1,-1),\quad\overrightarrow{MN}\times\overrightarrow{MP}=(2,2,0).$$`,
      r`<p>Área de $MNP=\tfrac12|(2,2,0)|=\tfrac12\cdot2\sqrt2=\sqrt2$. Logo área de $ABC=4\sqrt2$.</p>`,
      { h: r`<p>(Os vértices seriam $(-2,3,3)$, $(2,-1,3)$ e $(4,-3,1)$ — confira: $\overrightarrow{AB}\times\overrightarrow{AC}=(8,8,0)$, metade do módulo $=4\sqrt2$ ✓.)</p>`, add: [pt(X1, 'A', 'u'), pt(X2, 'B', 'u'), pt(X3, 'C', 'u'), { poly: [X1, X2, X3], c: 'u', a: .1 }] }],
    r`Área $=4\sqrt2$`);
})();
