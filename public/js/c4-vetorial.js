// Parte 3: teoria do produto vetorial.
(function () {
  const A = V.add, S = V.sub, M = V.mul, cross = V.cross;

  // ============================ A: definição e propriedades ============================
  Deck.section('Produto vetorial · definição e propriedades', 'vet-a');

  const u0 = [3, -1, -2], v0 = [2, 4, -1], w0 = cross(u0, v0); // (9,-1,14)
  Deck.slide({
    id: 'vet-def', title: 'Produto vetorial: definição e cálculo',
    base: [{ v: u0, c: 'u', l: '>u' }, { v: v0, c: 'v', l: '>v' }],
    steps: [
      { h: r`<p>O produto vetorial é uma operação que recebe <b>dois vetores de $\R^3$</b> e devolve um <b>vetor</b> $\vec u\times\vec v$.</p>
        ${DEF('Definição (determinante simbólico)', r`$$\vec u\times\vec v=\begin{vmatrix}\vec i&\vec j&\vec k\\x_1&y_1&z_1\\x_2&y_2&z_2\end{vmatrix}=\begin{vmatrix}y_1&z_1\\y_2&z_2\end{vmatrix}\vec i-\begin{vmatrix}x_1&z_1\\x_2&z_2\end{vmatrix}\vec j+\begin{vmatrix}x_1&y_1\\x_2&y_2\end{vmatrix}\vec k$$`)}
        <p>(Laplace pela 1ª linha. Note o <b>sinal negativo</b> no $\vec j$.)</p>` },
      { h: r`<h3>Exemplo: $\vec u=(3,-1,-2)$ e $\vec v=(2,4,-1)$</h3>
        <p>$\vec i$: $\begin{vmatrix}-1&-2\\4&-1\end{vmatrix}=1+8=9$</p>
        <p>$\vec j$: $-\begin{vmatrix}3&-2\\2&-1\end{vmatrix}=-(-3+4)=-1$</p>
        <p>$\vec k$: $\begin{vmatrix}3&-1\\2&4\end{vmatrix}=12+2=14$</p>`,
        add: [{ v: w0, c: 'r', l: '>u×v' }] },
      { h: r`${TIP('Dispositivo prático', r`<p>Escreva os dois vetores em linha e repita as duas primeiras colunas à direita. As componentes são as diferenças dos produtos das diagonais:</p>$$\begin{matrix}x_1&y_1&z_1&x_1&y_1\\x_2&y_2&z_2&x_2&y_2\end{matrix}$$<p>$x=y_1z_2-z_1y_2$, $\ y=z_1x_2-x_1z_2$, $\ z=x_1y_2-y_1x_2$. Assim o sinal do meio nunca se perde.</p>`)}` },
      { h: r`<p>$\vec u\times\vec v=(9,-1,14)$. Confira com o escalar: $\ (\vec u\times\vec v)\cdot\vec u=27+1-28=0$ ✓ e $\ (\vec u\times\vec v)\cdot\vec v=18-4-14=0$ ✓ — o resultado é perpendicular aos dois.</p>`,
        add: [{ ra: { at: [0, 0, 0], a: w0, b: u0, s: 1.4 }, c: 'w' }, { ra: { at: [0, 0, 0], a: w0, b: v0, s: 1.1 }, c: 'w' }] },
    ],
  });

  Deck.slide({
    id: 'vet-prop', title: 'Propriedades e a tabela de i, j, k',
    base: [{ v: [2, 0, 0], c: 'x', l: '>i' }, { v: [0, 2, 0], c: 'y', l: '>j' }, { v: [0, 0, 2], c: 'z', l: '>k' }],
    steps: [
      { h: r`<h3>Propriedades</h3><ol>
        <li>$\vec u\times\vec v=-(\vec v\times\vec u)$ &nbsp; (<b>anticomutativo</b>: trocar a ordem inverte o sentido)</li>
        <li>$\vec u\times(\vec v+\vec w)=\vec u\times\vec v+\vec u\times\vec w$ &nbsp; e &nbsp; $(\alpha\vec u)\times\vec v=\alpha(\vec u\times\vec v)$</li>
        <li>$\vec u\times\vec v=\vec 0\iff\vec u\parallel\vec v$ (ou algum é nulo). Em particular $\vec u\times\vec u=\vec 0$.</li></ol>` },
      { h: r`<h3>Vetores canônicos</h3><p>Na ordem cíclica $\vec i\to\vec j\to\vec k\to\vec i$ o produto é positivo:</p>
        $$\vec i\times\vec j=\vec k,\qquad\vec j\times\vec k=\vec i,\qquad\vec k\times\vec i=\vec j.$$`,
        add: [{ v: [0, 0, 2], c: 'r', o: [0, 0, 0.0], dash: true, nolg: true, w: 1.5 }, { arc: { at: [0, 0, 0], a: [1, 0, 0], b: [0, 1, 0], r: 1.1 }, l: 'i→j = k', c: 'z' }] },
      { h: r`<p>Contra o ciclo, o sinal muda: $\ \vec j\times\vec i=-\vec k,\ \ \vec k\times\vec j=-\vec i,\ \ \vec i\times\vec k=-\vec j$. E $\vec i\times\vec i=\vec j\times\vec j=\vec k\times\vec k=\vec 0$.</p>` },
      { h: r`${OK('Dica de ementa', r`<p>Alguns exercícios pedem $(\vec u\times\vec v)\cdot\vec w$ — é o <b>produto misto</b>, assunto que está <b>fora</b> da ementa. Aqui ele aparece só como conta: faça o vetorial e depois o escalar, que você já domina.</p>`)}` },
    ],
  });

  // ============================ B: direção e sentido ============================
  Deck.section('Produto vetorial · direção e sentido', 'vet-b');
  Deck.slide({
    id: 'vet-dir', title: 'Direção e sentido: regra da mão direita',
    base: [{ v: [3, 0, 0], c: 'u', l: '>u' }, { v: [1, 2.5, 0], c: 'v', l: '>v' }, { poly: [[0, 0, 0], [3, 0, 0], [4, 2.5, 0], [1, 2.5, 0]], c: 'g', a: .1 }],
    steps: [
      { h: r`<p>Se $\vec u,\vec v$ são <b>não nulos e não paralelos</b>, $\vec u\times\vec v$ tem:</p>
        <ul><li><b>direção</b>: perpendicular a $\vec u$ <i>e</i> a $\vec v$ — ou seja, ao plano deles ($(\vec u\times\vec v)\cdot\vec u=0=(\vec u\times\vec v)\cdot\vec v$);</li>
        <li><b>sentido</b>: regra da mão direita;</li><li><b>módulo</b>: próximo slide.</li></ul>`,
        add: [{ v: cross([3, 0, 0], [1, 2.5, 0]), c: 'r', l: '>u×v' }, { ra: { at: [0, 0, 0], a: [0, 0, 1], b: [3, 0, 0], s: .6 }, c: 'w' }, { ra: { at: [0, 0, 0], a: [0, 0, 1], b: [1, 2.5, 0], s: .5 }, c: 'w' }] },
      { h: r`<h3>Regra da mão direita</h3><p>Gire os dedos de $\vec u$ para $\vec v$ (pelo menor ângulo): o <b>polegar</b> aponta o sentido de $\vec u\times\vec v$.</p><p>Aqui $\vec u\times\vec v$ aponta <b>para cima</b>.</p>` },
      { h: r`<p>Se trocamos a ordem, o polegar inverte: $\vec v\times\vec u=-\vec u\times\vec v$ aponta <b>para baixo</b>.</p>`,
        add: [{ v: cross([1, 2.5, 0], [3, 0, 0]), c: 'o', l: '>v×u' }] },
      { h: r`${TIP('Na dúvida, use i, j, k', r`<p>Compare com $\vec i\times\vec j=\vec k$: se $\vec u$ "parece" $\vec i$ e $\vec v$ "parece" $\vec j$ (nessa ordem), $\vec u\times\vec v$ "parece" $\vec k$.</p>`)}` },
    ],
  });

  // ============================ C: módulo, área e aplicações ============================
  Deck.section('Produto vetorial · módulo, área e aplicações', 'vet-c');
  Deck.slide({
    id: 'vet-modulo', title: 'Módulo: |u×v| = |u||v| sen θ  e a área',
    controls: [{ id: 'th', label: 'Ângulo θ entre u e v', min: 5, max: 175, step: 5, val: 40, unit: '°' }],
    base: [],
    dyn(vals) {
      const t = V.deg(vals.th), u = [3, 0, 0], v = V.polar(2.4, t), n = cross(u, v), area = V.norm(n);
      const f = (x) => (Math.round(x * 100) / 100).toString().replace('.', '{,}');
      return {
        objs: [{ v: u, c: 'u', l: '>u' }, { v, c: 'v', l: '>v' }, { poly: [[0, 0, 0], u, A(u, v), v], c: 'w', a: .2 }, { v: n, c: 'r', l: '>u×v' }, { arc: { at: [0, 0, 0], a: u, b: v, r: .7 }, l: 'θ', c: 'w' }, { s: [v, [v[0], 0, 0]], c: 'g', dash: true, l: 'h' }],
        info: `$|\\vec u\\times\\vec v|=3\\cdot2{,}4\\cdot\\sin${vals.th}^\\circ=${f(area)}$ &nbsp;= <b>área do paralelogramo</b>`,
      };
    },
    steps: [
      { h: r`${DEF('Módulo do produto vetorial', r`$$|\vec u\times\vec v|=|\vec u|\,|\vec v|\,\sin\theta,\qquad\theta=\angle(\vec u,\vec v).$$`)}
        <p>(Vem da identidade de Lagrange: $|\vec u\times\vec v|^2=|\vec u|^2|\vec v|^2-(\vec u\cdot\vec v)^2$, e $1-\cos^2\theta=\sin^2\theta$.)</p>` },
      { h: r`<h3>Interpretação geométrica</h3><p>A altura do paralelogramo sobre a base $|\vec u|$ é $|\vec v|\sin\theta$. Logo</p>
        $$\text{Área do paralelogramo}=|\vec u\times\vec v|,\qquad\text{Área do triângulo}=\tfrac12|\vec u\times\vec v|.$$
        <p>Mova o controle: com $\theta=90^\circ$ a área é máxima; com $\theta\to0^\circ$ ou $180^\circ$ ela some (vetores paralelos ⇒ produto nulo).</p>` },
      { h: r`${WARN('Escalar × vetorial', r`<p>$\vec u\cdot\vec v=|\vec u||\vec v|\cos\theta$ (<b>número</b>, mede o "alinhamento") e $|\vec u\times\vec v|=|\vec u||\vec v|\sin\theta$ (módulo de um <b>vetor</b>, mede a "área").</p>`)}` },
    ],
  });

  const tA = [2, 3, 1], tB = [1, -1, 1], tC = [4, 1, -2], nAB = S(tB, tA), nAC = S(tC, tA), nn = cross(nAB, nAC);
  Deck.slide({
    id: 'vet-aplic', title: 'Aplicações: normal ao plano, área, altura, distância',
    base: [{ p: tA, l: 'A', c: 'g' }, { p: tB, l: 'B', c: 'g' }, { p: tC, l: 'C', c: 'g' }, { poly: [tA, tB, tC], c: 'u', a: .15 }],
    steps: [
      { h: r`<h3>1. Vetor ortogonal ao plano de $A,B,C$</h3><p>$\overrightarrow{AB}\times\overrightarrow{AC}$ é perpendicular a ambos os lados, logo ao plano.</p>
        <p>Ex.: $A(2,3,1),B(1,-1,1),C(4,1,-2)$: $\overrightarrow{AB}=(-1,-4,0)$, $\overrightarrow{AC}=(2,-2,-3)$, e $\overrightarrow{AB}\times\overrightarrow{AC}=(12,-3,10)$.</p>`,
        add: [{ v: nAB, o: tA, c: 'u', l: 'AB', nolg: true }, { v: nAC, o: tA, c: 'v', l: 'AC', nolg: true }, { v: nn, o: tA, c: 'r', l: '>n', lg: '\\vec n=\\overrightarrow{AB}\\times\\overrightarrow{AC}=(12,-3,10)' }] },
      { h: r`<h3>2. Área do triângulo</h3>$$S=\tfrac12|\overrightarrow{AB}\times\overrightarrow{AC}|=\tfrac12\sqrt{144+9+100}=\tfrac{\sqrt{253}}2.$$` },
      { h: r`<h3>3. Altura relativa a um lado</h3><p>Da fórmula $S=\tfrac12\,\text{base}\cdot h$:</p>$$h=\frac{2S}{|\text{base}|}=\frac{|\overrightarrow{AB}\times\overrightarrow{AC}|}{|\overrightarrow{BC}|}.$$` },
      { h: r`<h3>4. Distância de um ponto $P$ a uma reta $AB$</h3><p>É a altura do triângulo $ABP$ relativa à base $AB$:</p>$$d(P,AB)=\frac{|\overrightarrow{AB}\times\overrightarrow{AP}|}{|\overrightarrow{AB}|}.$$`,
        set: [{ p: [1, 2, 0], l: 'A', c: 'g' }, { p: [4, 0, 2], l: 'B', c: 'g' }, { s: [[1, 2, 0], [4, 0, 2]], c: 'u' }, { L: [[1, 2, 0], [3, -2, 2]], c: 'u', dash: true }, { p: [3, 4, 3], l: 'P', c: 'v' }, { s: [[3, 4, 3], V.add([1, 2, 0], V.proj(S([3, 4, 3], [1, 2, 0]), [3, -2, 2]))], c: 'r', l: 'd' }] },
      { h: r`${TIP('Resumo', r`<p>Vetorial = vetor ⟂ aos dois, com módulo = <b>área</b>. Escalar = número, com sinal = <b>ângulo</b>.</p>`)}` },
    ],
  });
})();
