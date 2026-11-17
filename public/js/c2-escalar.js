// Parte 2: teoria do produto escalar (os exercícios ficam em c3-ex-escalar.js e são intercalados via Deck.order).
(function () {
  const A = V.add, S = V.sub, M = V.mul;

  // ============================ A: definição algébrica e propriedades ============================
  Deck.section('Produto escalar · definição e propriedades', 'esc-a');

  Deck.slide({
    id: 'esc-alg', title: 'Produto escalar: definição algébrica',
    base: [{ v: [2, 3, 1], c: 'u', l: '>u' }, { v: [4, -1, 2], c: 'v', l: '>v' }],
    steps: [
      { h: r`${DEF('Definição', r`<p>Para $\vec u=(x_1,y_1,z_1)$ e $\vec v=(x_2,y_2,z_2)$,</p>$$\vec u\cdot\vec v=x_1x_2+y_1y_2+z_1z_2.$$`)}
        <p>Multiplica coordenada a coordenada e soma. O resultado é um <b>número</b> (escalar), não um vetor.</p>` },
      { h: r`<p>Exemplo: $\vec u=(2,3,1)$ e $\vec v=(4,-1,2)$:</p>$$\vec u\cdot\vec v=2\cdot4+3\cdot(-1)+1\cdot2=8-3+2=7.$$` },
      { h: r`${WARN('Cuidado com os tipos', r`<p>$\vec u\cdot\vec v$ é <b>número</b>. Por isso $(\vec u\cdot\vec v)\,\vec w$ é um <b>vetor</b> (número × vetor), mas $(\vec u\cdot\vec v)\cdot\vec w$ <b>não existe</b> (número · vetor).</p>`)}` },
    ],
  });

  Deck.slide({
    id: 'esc-prop', title: 'Propriedades do produto escalar',
    base: [{ v: [2, 3, 6], c: 'u', l: '>u' }, { s: [[0, 0, 0], [2, 3, 6]], c: 'g' }],
    steps: [
      { h: r`<p>Para quaisquer vetores $\vec u,\vec v,\vec w$ e número $k$:</p>
        <ol><li>$\vec u\cdot\vec v=\vec v\cdot\vec u$ (comutativa)</li>
        <li>$\vec u\cdot(\vec v+\vec w)=\vec u\cdot\vec v+\vec u\cdot\vec w$ (distributiva)</li>
        <li>$(k\vec u)\cdot\vec v=k(\vec u\cdot\vec v)=\vec u\cdot(k\vec v)$</li></ol>
        <p>Todas decorrem de contas com coordenadas (os números reais já têm essas propriedades).</p>` },
      { h: r`<h3>O produto de um vetor por ele mesmo</h3>
        $$\vec u\cdot\vec u=x^2+y^2+z^2=|\vec u|^2\ \ge 0,\qquad \vec u\cdot\vec u=0\iff\vec u=\vec 0.$$
        <p>Daí $|\vec u|=\sqrt{\vec u\cdot\vec u}$. Para $\vec u=(2,3,6)$: $\vec u\cdot\vec u=49$, $|\vec u|=7$.</p>` },
      { h: r`${TIP('Regra de ouro', r`<p>Para <b>calcular módulos</b> a partir de produtos, sempre use $|\vec u|^2=\vec u\cdot\vec u$ e distribua. É a ferramenta para problemas só com módulos e ângulos.</p>`)}` },
    ],
  });

  Deck.slide({
    id: 'esc-notaveis', title: 'Produtos notáveis com vetores',
    base: [{ v: [3, 1, 0], c: 'u', l: '>u' }, { v: [1, 3, 0], c: 'v', l: '>v' }],
    steps: [
      { h: r`<p>Distribuindo (propriedades 1–3):</p>
        $$|\vec u+\vec v|^2=(\vec u+\vec v)\cdot(\vec u+\vec v)=|\vec u|^2+2\,\vec u\cdot\vec v+|\vec v|^2$$`,
        add: [{ v: [4, 4, 0], c: 'r', l: '>u+v' }] },
      { h: r`$$|\vec u-\vec v|^2=|\vec u|^2-2\,\vec u\cdot\vec v+|\vec v|^2$$
        $$(\vec u+\vec v)\cdot(\vec u-\vec v)=|\vec u|^2-|\vec v|^2$$`,
        add: [{ v: [2, -2, 0], c: 'o', l: '>u-v' }] },
      { h: r`${DEF('Como usar', r`<p>Em problemas com $|\vec u|$, $|\vec v|$ e $\vec u\cdot\vec v$ dados, <b>nunca</b> precisamos das coordenadas: expandimos e substituímos. Ex.: $(\vec u-3\vec v)\cdot\vec u=|\vec u|^2-3\,\vec u\cdot\vec v$.</p>`)}` },
    ],
  });

  // ============================ B: definição geométrica ============================
  Deck.section('Produto escalar · definição geométrica', 'esc-b');

  const th = V.deg(50), uu = [4, 0, 0], vv = [3 * Math.cos(th), 3 * Math.sin(th), 0];
  Deck.slide({
    id: 'esc-geo', title: 'Definição geométrica: u·v = |u||v|cos θ',
    base: [{ v: uu, c: 'u', l: '>u' }, { v: vv, c: 'v', l: '>v' }, { arc: { at: [0, 0, 0], a: uu, b: vv, r: 0.9 }, l: 'θ', c: 'w' }],
    steps: [
      { h: r`<p>Se $\vec u,\vec v\ne\vec 0$ e $\theta\in[0^\circ,180^\circ]$ é o ângulo entre eles (com a mesma origem):</p>
        ${DEF('Definição geométrica', r`$$\vec u\cdot\vec v=|\vec u|\,|\vec v|\cos\theta$$`)}` },
      { h: r`<h3>Por que vale? Lei dos cossenos</h3><p>O triângulo de lados $\vec u$, $\vec v$ e $\vec v-\vec u$ dá</p>
        $$|\vec v-\vec u|^2=|\vec u|^2+|\vec v|^2-2|\vec u||\vec v|\cos\theta.\tag{1}$$`,
        add: [{ v: S(vv, uu), o: uu, c: 'r', l: '>v-u' }] },
      { h: r`<p>Mas, pelo produto notável,</p>$$|\vec v-\vec u|^2=|\vec u|^2+|\vec v|^2-2\,\vec u\cdot\vec v.\tag{2}$$
        <p>Comparando (1) e (2): $\vec u\cdot\vec v=|\vec u||\vec v|\cos\theta$. ∎</p>` },
      { h: r`${OK('As duas fórmulas são a mesma coisa', r`<p>Com coordenadas você obtém $\vec u\cdot\vec v$ somando produtos; com módulos e ângulo, usa $|\vec u||\vec v|\cos\theta$. Escolha a que o enunciado permite.</p>`)}` },
    ],
  });

  // ============================ C: ângulo e ortogonalidade ============================
  Deck.section('Produto escalar · ângulo e ortogonalidade', 'esc-c');

  Deck.slide({
    id: 'esc-angulo', title: 'Ângulo entre vetores e o sinal de u·v',
    controls: [{ id: 'th', label: 'Ângulo θ entre u e v', min: 0, max: 180, step: 5, val: 50, unit: '°' }],
    base: [{ v: [3, 0, 0], c: 'u', l: '>u' }],
    dyn(vals) {
      const t = V.deg(vals.th), v = [2.4 * Math.cos(t), 2.4 * Math.sin(t), 0];
      const dot = 3 * 2.4 * Math.cos(t), p = V.proj(v, [3, 0, 0]);
      const kind = vals.th < 90 ? '<b style="color:var(--ok)">agudo</b> → $\\vec u\\cdot\\vec v>0$' : vals.th === 90 ? '<b style="color:var(--warn)">reto</b> → $\\vec u\\cdot\\vec v=0$ (ortogonais)' : '<b style="color:var(--bad)">obtuso</b> → $\\vec u\\cdot\\vec v<0$';
      return {
        objs: [{ v, c: 'v', l: '>v' }, { arc: { at: [0, 0, 0], a: [3, 0, 0], b: v, r: 0.8 }, l: 'θ', c: 'w' }, { v: p, c: 'r', dash: true, nolg: true, w: 2 }, { s: [v, p], c: 'g', dash: true }],
        info: `$|\\vec u|=3,\\ |\\vec v|=2{,}4$ &nbsp; $\\vec u\\cdot\\vec v=3\\cdot2{,}4\\cos ${vals.th}^\\circ=${(Math.round(dot * 100) / 100).toString().replace('.', '{,}')}$<br>Ângulo ${kind}`,
      };
    },
    steps: [
      { h: r`<p>Isolando o cosseno:</p>${DEF('Ângulo entre dois vetores', r`$$\cos\theta=\frac{\vec u\cdot\vec v}{|\vec u|\,|\vec v|},\qquad 0^\circ\le\theta\le180^\circ.$$`)}
        <p>Como $|\vec u|,|\vec v|>0$, o <b>sinal de $\vec u\cdot\vec v$ é o sinal de $\cos\theta$</b>. Mova o controle abaixo e observe:</p>` },
      { h: r`<table class="t"><tr><th>$\vec u\cdot\vec v$</th><th>ângulo</th></tr><tr><td>$>0$</td><td>agudo ($0^\circ\le\theta<90^\circ$)</td></tr><tr><td>$=0$</td><td>reto ($\vec u\perp\vec v$)</td></tr><tr><td>$<0$</td><td>obtuso ($90^\circ<\theta\le180^\circ$)</td></tr></table>
        <p>O traço verde é a "sombra" de $\vec v$ sobre $\vec u$ — a projeção, que veremos adiante.</p>` },
    ],
  });

  Deck.slide({
    id: 'esc-ortog', title: 'Ortogonalidade e desigualdades',
    base: [{ v: [2, 2, 0], c: 'u', l: '>u' }, { v: [-1, 1, 2], c: 'v', l: '>v' }, { ra: { at: [0, 0, 0], a: [2, 2, 0], b: [-1, 1, 2], s: 0.5 }, c: 'w' }],
    steps: [
      { h: r`${DEF('Vetores ortogonais', r`$$\vec u\perp\vec v\iff\vec u\cdot\vec v=0$$`)}<p>Aqui $\vec u=(2,2,0)$ e $\vec v=(-1,1,2)$: $-2+2+0=0$ ✓. O vetor nulo é ortogonal a todos.</p>` },
      { h: r`<h3>Pitágoras vetorial</h3><p>Se $\vec u\perp\vec v$, o termo $2\vec u\cdot\vec v$ some:</p>$$|\vec u+\vec v|^2=|\vec u|^2+|\vec v|^2.$$`,
        add: [{ v: [1, 3, 2], c: 'r', l: '>u+v' }, { v: [2, 2, 0], o: [-1, 1, 2], c: 'u', dash: true, nolg: true }, { v: [-1, 1, 2], o: [2, 2, 0], c: 'v', dash: true, nolg: true }] },
      { h: r`<h3>Duas desigualdades</h3><ul><li><b>Schwarz:</b> $|\vec u\cdot\vec v|\le|\vec u||\vec v|$ (pois $|\cos\theta|\le1$).</li>
        <li><b>Triangular:</b> $|\vec u+\vec v|\le|\vec u|+|\vec v|$ (o caminho direto é o mais curto).</li></ul>` },
    ],
  });

  Deck.slide({
    id: 'esc-ferramentas', title: 'Caixa de ferramentas: "ache o vetor tal que…"',
    base: [{ v: [2, -1, 3], c: 'u', l: '>u' }],
    steps: [
      { h: r`<p>Muitos exercícios pedem um vetor $\vec v=(x,y,z)$ que cumpra condições. Cada condição vira uma <b>equação</b>:</p>
        <table class="t" style="text-align:left"><tr><th>Condição</th><th>Equação</th></tr>
        <tr><td>paralelo a $\vec u$</td><td>$\vec v=\lambda\vec u$</td></tr>
        <tr><td>ortogonal a $\vec u$</td><td>$x_1x+y_1y+z_1z=0$</td></tr>
        <tr><td>ortogonal ao eixo $Ox$ / $Oy$ / $Oz$</td><td>$x=0$ / $y=0$ / $z=0$</td></tr>
        <tr><td>módulo $m$</td><td>$x^2+y^2+z^2=m^2$</td></tr>
        <tr><td>ângulo $\theta$ com $\vec u$</td><td>$\vec u\cdot\vec v=|\vec u||\vec v|\cos\theta$</td></tr>
        <tr><td>ângulo agudo/obtuso com $\vec u$</td><td>$\vec u\cdot\vec v>0$ / $<0$ (escolhe o sinal)</td></tr></table>` },
      { h: r`${TIP('Estratégia', r`<p>Conte equações e incógnitas. Quando o módulo entra, aparece $\pm$: o ângulo "agudo/obtuso" serve para escolher uma das soluções.</p>`)}` },
    ],
  });

  // ============================ D: ângulos diretores ============================
  Deck.section('Produto escalar · ângulos diretores', 'esc-d');
  Deck.slide({
    id: 'esc-diretores', title: 'Ângulos diretores e cossenos diretores',
    base: [{ v: [2, 3, 6], c: 'u', l: '>v' }],
    steps: [
      { h: r`<p>Os <b>ângulos diretores</b> de $\vec v$ são os ângulos que ele forma com $\vec i,\vec j,\vec k$ (os eixos): $\alpha,\beta,\gamma$.</p>
        <p>Pelo produto escalar com $\vec i=(1,0,0)$:</p>$$\cos\alpha=\frac{\vec v\cdot\vec i}{|\vec v||\vec i|}=\frac{x}{|\vec v|},\quad\cos\beta=\frac{y}{|\vec v|},\quad\cos\gamma=\frac{z}{|\vec v|}.$$`,
        add: [{ arc: { at: [0, 0, 0], a: [1, 0, 0], b: [2, 3, 6], r: 1.6 }, l: 'α', c: 'x' }, { arc: { at: [0, 0, 0], a: [0, 1, 0], b: [2, 3, 6], r: 2.2 }, l: 'β', c: 'y' }, { arc: { at: [0, 0, 0], a: [0, 0, 1], b: [2, 3, 6], r: 2.8 }, l: 'γ', c: 'z' }] },
      { h: r`<p>Para $\vec v=(2,3,6)$, $|\vec v|=7$: $\cos\alpha=\tfrac27,\ \cos\beta=\tfrac37,\ \cos\gamma=\tfrac67$.</p>` },
      { h: r`${DEF('Os cossenos formam o vetor unitário', r`<p>$$\frac{\vec v}{|\vec v|}=(\cos\alpha,\cos\beta,\cos\gamma)\quad\Rightarrow\quad\cos^2\alpha+\cos^2\beta+\cos^2\gamma=1.$$</p>`)}
        <p>Conferindo: $\tfrac{4+9+36}{49}=1$ ✓. Vice-versa: um vetor de módulo $m$ com ângulos diretores dados é $m(\cos\alpha,\cos\beta,\cos\gamma)$ — só existe se a soma dos cossenos² for 1.</p>`,
        add: [{ v: [2 / 7, 3 / 7, 6 / 7], c: 'r', l: '>v̂', lg: '\\hat v=(\\cos\\alpha,\\cos\\beta,\\cos\\gamma)' }] },
    ],
  });

  // ============================ E: projeção ============================
  Deck.section('Produto escalar · projeção ortogonal', 'esc-e');
  const pu = [4, 2, 0], pv = [1, 3, 2], p1 = V.proj(pv, pu), p2 = S(pv, p1);
  Deck.slide({
    id: 'esc-proj', title: 'Projeção ortogonal e decomposição',
    base: [{ v: pu, c: 'u', l: '>u' }, { v: pv, c: 'v', l: '>v' }],
    steps: [
      { h: r`<p>Queremos a "sombra" de $\vec v$ sobre a reta de $\vec u$: um vetor $\vec v_1\parallel\vec u$ tal que $\vec v-\vec v_1\perp\vec u$.</p>` },
      { h: r`<p>$\vec v_1=\lambda\vec u$ e $(\vec v-\lambda\vec u)\cdot\vec u=0\Rightarrow\lambda=\dfrac{\vec v\cdot\vec u}{\vec u\cdot\vec u}$:</p>
        ${DEF('Projeção de v sobre u', r`$$\operatorname{proj}_{\vec u}\vec v=\frac{\vec v\cdot\vec u}{\vec u\cdot\vec u}\,\vec u=\frac{\vec v\cdot\vec u}{|\vec u|^2}\,\vec u$$`)}` },
      { h: r`<p>Exemplo: $\vec u=(4,2,0)$, $\vec v=(1,3,2)$. $\vec v\cdot\vec u=4+6=10$, $\vec u\cdot\vec u=20$:</p>
        $$\vec v_1=\tfrac{10}{20}(4,2,0)=(2,1,0).$$`, add: [{ v: p1, c: 'r', l: '>v_1' }, { s: [pv, p1], c: 'g', dash: true }] },
      { h: r`<h3>Decomposição</h3>$$\vec v=\vec v_1+\vec v_2,\quad\vec v_2=\vec v-\vec v_1=(-1,2,2)\perp\vec u.$$
        <p>Confira: $\vec v_2\cdot\vec u=-4+4+0=0$ ✓.</p>`, add: [{ v: p2, o: p1, c: 'o', l: '>v_2' }, { ra: { at: p1, a: M(pu, -1), b: p2, s: 0.4 }, c: 'w' }] },
      { h: r`${TIP('Medida da projeção', r`<p>O <b>comprimento</b> (com sinal) da projeção é $\dfrac{\vec v\cdot\vec u}{|\vec u|}=|\vec v|\cos\theta$. Se $\vec u\perp\vec v$, a projeção é $\vec 0$.</p>`)}` },
    ],
  });
})();
