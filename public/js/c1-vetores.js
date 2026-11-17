// Parte 0 e 1: abertura, vetores no plano e no espaço + revisão.
(function () {
  const A = V.add, S = V.sub, M = V.mul;

  Deck.section('Abertura');

  Deck.slide({
    id: 'capa', title: 'Vetores em R³',
    base: [
      { v: [3, 0, 0], c: 'x', l: '>i', nolg: true }, { v: [0, 3, 0], c: 'y', l: '>j', nolg: true }, { v: [0, 0, 3], c: 'z', l: '>k', nolg: true },
      { v: [2, 3, 2], c: 'u', l: '>u' }, { v: [3, -1, 1], c: 'v', l: '>v' }, { v: [5, 2, 3], c: 'r', l: '>u+v', o: [0, 0, 0], dash: true },
    ],
    steps: [
      { h: r`<p style="font-size:1.1rem">Aula interativa de <b>Vetores</b> (Geometria Analítica): do plano ao espaço, <b>produto escalar</b> e <b>produto vetorial</b>.</p>
        ${TIP('Como funciona', '<p>À direita está o espaço $\\R^3$ — ele gira sozinho, devagar. <b>Arraste</b> para girar, use a <b>roda</b> para zoom. Cada passo da explicação aparece com <kbd>→</kbd>.</p>')}` },
      { h: r`<h3>O roteiro</h3><ol>
        <li><b>Vetores</b> em $\R^2$ e $\R^3$: coordenadas, operações, módulo.</li>
        <li><b>Produto escalar</b>: ângulo, ortogonalidade, projeção, ângulos diretores.</li>
        <li><b>Produto vetorial</b>: vetor normal, áreas, distâncias.</li>
        <li><b>Resumo</b>: tipos de operações e fórmulas-chave.</li></ol>
        <p>Entre a teoria, você encontra os <b>50 exercícios de produto escalar</b> e os <b>29 de produto vetorial</b>, todos resolvidos com gráfico.</p>` },
      { h: r`<div class="box ok"><b class="t">Ementa</b>A matéria termina logo <b>antes do produto misto</b>.</div>` },
    ],
  });

  // ------------------------------------------------------------------
  Deck.section('1 · Vetores', 'Vetores');

  Deck.slide({
    id: 'o-que-e', title: 'O que é um vetor?',
    base: [{ p: [0, 0, 0], l: 'O', c: 'g' }],
    steps: [
      { h: r`<p>Um vetor é um <b>segmento orientado</b>: uma seta. Ele é descrito por três coisas:</p>
        <ul><li><b>módulo</b> (comprimento) $|\vec v|$;</li><li><b>direção</b> (reta suporte);</li><li><b>sentido</b> (para onde aponta).</li></ul>`,
        add: [{ v: [3, 2, 1], c: 'u', l: '>v' }] },
      { h: r`<p>A seta pode estar em qualquer lugar: setas com <b>mesmo módulo, direção e sentido</b> são o <b>mesmo vetor</b>. Cada seta é um <i>representante</i>.</p>`,
        add: [{ v: [3, 2, 1], o: [0, -2, 0], c: 'u', dash: true, nolg: true }, { v: [3, 2, 1], o: [-1, 0, -2], c: 'u', dash: true, nolg: true }, { v: [3, 2, 1], o: [0, 3, 1], c: 'u', dash: true, nolg: true }] },
      { h: r`${TIP('Ideia-chave', '<p>O representante mais útil é o que <b>começa na origem</b>. Aí o vetor é identificado com o ponto onde termina.</p>')}` },
    ],
  });

  Deck.slide({
    id: 'base-plano', title: 'Vetores no plano: base e combinação linear',
    base: [{ v: [1, 0, 0], c: 'x', l: '>e_1' }, { v: [0, 1, 0], c: 'y', l: '>e_2' }],
    steps: [
      { h: r`<p>Dados $\vec e_1,\vec e_2$ <b>não paralelos</b>, todo vetor $\vec v$ do plano se escreve de modo <b>único</b> como</p>$$\vec v = a\,\vec e_1 + b\,\vec e_2 .$$<p>$B=\{\vec e_1,\vec e_2\}$ é uma <b>base</b>; $a,b$ são as <b>coordenadas</b> de $\vec v$ em $B$.</p>` },
      { h: r`<p>Exemplo do material: $\vec v = 5\vec e_1+4\vec e_2$. Caminhamos 5 passos em $\vec e_1$ e 4 em $\vec e_2$.</p>`,
        add: [{ v: [5, 0, 0], c: 'u', dash: true, nolg: true }, { v: [0, 4, 0], o: [5, 0, 0], c: 'v', dash: true, nolg: true }, { v: [5, 4, 0], c: 'r', l: '>v' }] },
      { h: r`<p>Outros: $\vec a=-2\vec e_1+3\vec e_2$ e $\vec b=3\vec e_1-2\vec e_2$ — coeficientes negativos invertem o sentido.</p>`,
        add: [{ v: [-2, 3, 0], c: 'w', l: '>a' }, { v: [3, -2, 0], c: 'p', l: '>b' }] },
      { h: r`${DEF('Base canônica', '<p>A base mais usada é a <b>ortonormal</b> (vetores ortogonais e de módulo 1) do plano cartesiano: $\\vec i=(1,0)$ e $\\vec j=(0,1)$. Então $\\vec v=x\\vec i+y\\vec j=(x,y)$.</p>')}` },
    ],
  });

  Deck.slide({
    id: 'operacoes', title: 'Operações com vetores',
    base: [{ v: [3, 1, 0], c: 'u', l: '>u' }, { v: [1, 3, 0], c: 'v', l: '>v' }],
    steps: [
      { h: r`<p>Com $\vec u=(x_1,y_1)$ e $\vec v=(x_2,y_2)$ (o mesmo vale em $\R^3$, com mais uma coordenada):</p>
        $$\vec u+\vec v=(x_1+x_2,\;y_1+y_2),\qquad \alpha\vec u=(\alpha x_1,\;\alpha y_1)$$<p>Somamos e multiplicamos <b>coordenada a coordenada</b>.</p>` },
      { h: r`<h3>Soma: regra do paralelogramo</h3><p>Colocamos os dois com a mesma origem; $\vec u+\vec v$ é a diagonal.</p>`,
        add: [{ v: [1, 3, 0], o: [3, 1, 0], c: 'v', dash: true, nolg: true }, { v: [3, 1, 0], o: [1, 3, 0], c: 'u', dash: true, nolg: true }, { v: [4, 4, 0], c: 'r', l: '>u+v' }] },
      { h: r`<h3>Multiplicação por escalar</h3><p>$2\vec u$ dobra o comprimento; $-\vec u$ inverte o sentido (mesma direção!).</p>`,
        add: [{ v: [6, 2, 0], c: 'o', l: '2>u', o: [0, 0, -0.01], lp: 1.02, nolg: true }, { v: [-3, -1, 0], c: 'p', l: '->u', nolg: true }] },
      { h: r`<h3>Subtração</h3><p>$\vec u-\vec v=\vec u+(-\vec v)$: é o vetor que <b>vai da ponta de $\vec v$ até a ponta de $\vec u$</b>.</p>`,
        set: [{ v: [3, 1, 0], c: 'u', l: '>u' }, { v: [1, 3, 0], c: 'v', l: '>v' }, { v: [2, -2, 0], c: 'r', l: '>u-v' }, { v: [2, -2, 0], o: [1, 3, 0], c: 'r', dash: true, nolg: true }] },
      { h: r`<p>As propriedades de sempre valem: comutativa e associativa da soma, $\vec u+\vec 0=\vec u$, $\vec u+(-\vec u)=\vec 0$, $\alpha(\beta\vec u)=(\alpha\beta)\vec u$, $\alpha(\vec u+\vec v)=\alpha\vec u+\alpha\vec v$, $(\alpha+\beta)\vec u=\alpha\vec u+\beta\vec u$ e $1\cdot\vec u=\vec u$.</p>` },
    ],
  });

  Deck.slide({
    id: 'dois-pontos', title: 'Vetor definido por dois pontos',
    base: [{ p: [1, 4, 0], l: 'A', c: 'g' }, { p: [4, 1, 0], l: 'B', c: 'g' }],
    steps: [
      { h: r`<p>O vetor de $A(x_A,y_A)$ até $B(x_B,y_B)$ é</p>$$\overrightarrow{AB}=B-A=(x_B-x_A,\;y_B-y_A).$$<p>"Ponta menos origem."</p>`,
        add: [{ v: [3, -3, 0], o: [1, 4, 0], c: 'u', l: 'AB', lg: '\\overrightarrow{AB}=(3,-3)' }] },
      { h: r`<p>Com $A(1,4)$ e $B(4,1)$: $\overrightarrow{AB}=(4-1,\,1-4)=(3,-3)$. O representante com origem em $O$ termina em $(3,-3)$.</p>`,
        add: [{ v: [3, -3, 0], c: 'u', dash: true, nolg: true }, { p: [3, -3, 0], c: 'u' }] },
      { h: r`${DEF('Ponto médio', '<p>$M$ divide $AB$ ao meio: $M-A=B-M$, logo $$M=\\frac{A+B}{2}=\\left(\\frac{x_A+x_B}{2},\\frac{y_A+y_B}{2},\\frac{z_A+z_B}{2}\\right).$$</p>')}`,
        add: [{ p: [2.5, 2.5, 0], l: 'M', c: 'r' }] },
    ],
  });

  Deck.slide({
    id: 'r3', title: 'Do plano para o espaço: R³',
    base: [{ v: [1, 0, 0], c: 'x', l: '>i' }, { v: [0, 1, 0], c: 'y', l: '>j' }, { v: [0, 0, 1], c: 'z', l: '>k' }],
    steps: [
      { h: r`<p>No espaço juntamos mais um eixo e um vetor: a base canônica é $\{\vec i,\vec j,\vec k\}$, com $\vec i=(1,0,0)$, $\vec j=(0,1,0)$, $\vec k=(0,0,1)$. Todo vetor é $\vec v=x\vec i+y\vec j+z\vec k=(x,y,z)$.</p>` },
      { h: r`<p>O ponto $P(2,4,3)$ corresponde ao vetor $\overrightarrow{OP}=2\vec i+4\vec j+3\vec k$ — as coordenadas do ponto são as do vetor.</p>`,
        add: [{ box: [2, 4, 3], c: 'g' }, { v: [2, 0, 0], c: 'x', dash: true, nolg: true }, { v: [0, 4, 0], o: [2, 0, 0], c: 'y', dash: true, nolg: true }, { v: [0, 0, 3], o: [2, 4, 0], c: 'z', dash: true, nolg: true }, { v: [2, 4, 3], c: 'u', l: 'OP', lg: '\\overrightarrow{OP}=2\\vec i+4\\vec j+3\\vec k' }, { p: [2, 4, 3], l: 'P(2,4,3)', c: 'u' }] },
      { h: r`<p>Cada par de eixos forma um plano coordenado ($xy$, $xz$, $yz$). Os três planos dividem o espaço em <b>8 octantes</b>.</p>`,
        add: [{ poly: [[0, 0, 0], [4, 0, 0], [4, 5, 0], [0, 5, 0]], c: 'z', a: 0.07 }, { poly: [[0, 0, 0], [4, 0, 0], [4, 0, 4], [0, 0, 4]], c: 'y', a: 0.07 }, { poly: [[0, 0, 0], [0, 5, 0], [0, 5, 4], [0, 0, 4]], c: 'x', a: 0.07 }] },
      { h: r`<p>Tudo se estende: igualdade, soma, escalar, vetor por dois pontos, ponto médio — sempre <b>coordenada a coordenada</b>.</p>` },
    ],
  });

  Deck.slide({
    id: 'octantes', title: 'Os 8 octantes',
    base: [],
    steps: [
      { h: r`<p>O octante é determinado pelo <b>sinal</b> de $(x,y,z)$. Os pontos aparecem no espaço: gire e confira!</p>
        <table class="t"><tr><th>1º</th><th>2º</th><th>3º</th><th>4º</th></tr><tr><td>$(+,+,+)$</td><td>$(-,+,+)$</td><td>$(-,-,+)$</td><td>$(+,-,+)$</td></tr>
        <tr><th>5º</th><th>6º</th><th>7º</th><th>8º</th></tr><tr><td>$(+,+,-)$</td><td>$(-,+,-)$</td><td>$(-,-,-)$</td><td>$(+,-,-)$</td></tr></table>`,
        add: [[1, 1, 1], [-1, 1, 1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [-1, -1, -1], [1, -1, -1]].map((p, i) => ({ p: M(p, 2), l: r`${i + 1}º`, c: i < 4 ? 'u' : 'v' })) },
    ],
  });

  Deck.slide({
    id: 'modulo', title: 'Paralelismo, módulo e vetor unitário',
    base: [{ v: [2, 3, 6], c: 'u', l: '>v' }],
    steps: [
      { h: r`<h3>Módulo</h3><p>Pelo teorema de Pitágoras (duas vezes):</p>$$|\vec v|=\sqrt{x^2+y^2+z^2}.$$<p>Para $\vec v=(2,3,6)$: $|\vec v|=\sqrt{4+9+36}=7$.</p>`,
        add: [{ s: [[2, 3, 0], [2, 3, 6]], c: 'g', dash: true }, { s: [[0, 0, 0], [2, 3, 0]], c: 'g', dash: true }] },
      { h: r`<h3>Vetor unitário</h3><p>Dividir pelo módulo dá um vetor de módulo 1 e mesmo sentido (<b>normalizar</b>):</p>$$\hat v=\frac{\vec v}{|\vec v|}=\left(\tfrac27,\tfrac37,\tfrac67\right).$$`,
        add: [{ v: [2 / 7, 3 / 7, 6 / 7], c: 'r', l: '>v̂', lg: '\\hat v=\\left(\\frac27,\\frac37,\\frac67\\right)' }] },
      { h: r`<h3>Paralelismo</h3><p>$\vec u\parallel\vec v$ se $\vec u=\lambda\vec v$, isto é, <b>coordenadas proporcionais</b>:</p>$$\frac{x_1}{x_2}=\frac{y_1}{y_2}=\frac{z_1}{z_2}.$$<p>Ex.: $(4,6,12)=2\vec v$ é paralelo a $\vec v$.</p>`,
        add: [{ v: [4, 6, 12], c: 'o', dash: true, l: '2>v', nolg: true }] },
    ],
  });

  // ------------------------- Revisão (PDF 2) -------------------------
  Deck.section('Revisão de vetores (exercícios do PDF 2)', 'Revisão');

  Deck.ex({
    g: 'R', n: 1, t: 'Igualdade de vetores', tag: 'PDF 2',
    stmt: r`Determine $x$ e $y$ para que $\vec u=(x-1,\,3)$ e $\vec v=(3,\,y+4)$ sejam iguais.`,
    base: [{ v: [3, 3, 0], c: 'u', l: '>u=>v' }],
    steps: [r`<p>Vetores iguais têm <b>coordenadas iguais</b>.</p>`, r`$$x-1=3\Rightarrow x=4,\qquad 3=y+4\Rightarrow y=-1.$$`],
    ans: r`$x=4$ e $y=-1$, e $\vec u=\vec v=(3,3)$.`,
  });
  Deck.ex({
    g: 'R', n: 2, t: 'Combinação linear no plano', tag: 'PDF 2',
    stmt: r`Encontre $a,b$ tais que $\vec w=a\vec u+b\vec v$, com $\vec u=(10,2)$, $\vec v=(3,5)$ e $\vec w=(-1,2)$.`,
    base: [{ v: [10, 2, 0], c: 'u', l: '>u' }, { v: [3, 5, 0], c: 'v', l: '>v' }, { v: [-1, 2, 0], c: 'w', l: '>w' }],
    steps: [r`<p>Em coordenadas: $(-1,2)=(10a+3b,\;2a+5b)$, um sistema:</p>$$\begin{cases}10a+3b=-1\\2a+5b=2\end{cases}$$`,
      r`<p>Multiplique a 2ª por 5: $10a+25b=10$. Subtraia da 1ª: $-22b=-11\Rightarrow b=\tfrac12$.</p><p>Então $10a=-1-\tfrac32=-\tfrac52\Rightarrow a=-\tfrac14$.</p>`],
    ansAdd: [{ v: M([10, 2, 0], -0.25), c: 'u', dash: true, nolg: true }, { v: M([3, 5, 0], 0.5), o: M([10, 2, 0], -0.25), c: 'v', dash: true, nolg: true }],
    ans: r`$a=-\tfrac14$ e $b=\tfrac12$. Confira: $-\tfrac14(10,2)+\tfrac12(3,5)=(-1,2)$ ✓`,
  });
  Deck.ex({
    g: 'R', n: 3, t: 'Dividir um segmento em 3 partes', tag: 'PDF 2',
    stmt: r`Sendo $A(-2,4)$ e $B(4,1)$, determine $F$ e $G$ que dividem $\overrightarrow{AB}$ em 3 segmentos de mesmo comprimento.`,
    base: [{ p: [-2, 4, 0], l: 'A', c: 'g' }, { p: [4, 1, 0], l: 'B', c: 'g' }, { v: [6, -3, 0], o: [-2, 4, 0], c: 'u', l: 'AB', nolg: true }],
    steps: [r`$$\overrightarrow{AB}=B-A=(6,-3).$$`, r`<p>Cada terço é $\tfrac13\overrightarrow{AB}=(2,-1)$.</p>`, r`$$F=A+\tfrac13\overrightarrow{AB}=(0,3),\qquad G=A+\tfrac23\overrightarrow{AB}=(2,2).$$`],
    ansAdd: [{ p: [0, 3, 0], l: 'F', c: 'r' }, { p: [2, 2, 0], l: 'G', c: 'r' }],
    ans: r`$F(0,3)$ e $G(2,2)$.`,
  });
  Deck.ex({
    g: 'R', n: 4, t: 'Combinação linear em R³', tag: 'PDF 2',
    stmt: r`Dados $A(0,1,-1)$, $B(1,2,-1)$ e $\vec u=(-2,-1,1)$, $\vec v=(3,0,-1)$, $\vec w=(-2,2,2)$, verifique se existem $a,b,c$ com $\overrightarrow{AB}=a\vec u+b\vec v+c\vec w$.`,
    base: [{ v: [-2, -1, 1], c: 'u', l: '>u' }, { v: [3, 0, -1], c: 'v', l: '>v' }, { v: [-2, 2, 2], c: 'w', l: '>w' }, { v: [1, 1, 0], c: 'r', l: 'AB', lg: '\\overrightarrow{AB}=(1,1,0)' }],
    steps: [r`$$\overrightarrow{AB}=(1,1,0)=(-2a+3b-2c,\;-a+2c,\;a-b+2c).$$`,
      r`$$\begin{cases}-2a+3b-2c=1\\-a+2c=1\\a-b+2c=0\end{cases}$$`,
      r`<p>Da 2ª: $a=2c-1$. Da 3ª: $b=a+2c=4c-1$. Na 1ª: $-4c+2+12c-3-2c=1\Rightarrow 6c=2\Rightarrow c=\tfrac13$.</p><p>Logo $a=-\tfrac13$, $b=\tfrac13$.</p>`],
    ans: r`Existem: $a=-\tfrac13,\;b=\tfrac13,\;c=\tfrac13$ — ou seja, $\overrightarrow{AB}$ é combinação de $\vec u,\vec v,\vec w$.`,
  });
  Deck.ex({
    g: 'R', n: 5, t: 'Quarto vértice do paralelogramo', tag: 'PDF 2',
    stmt: r`Encontre o vértice oposto a $B$ no paralelogramo $ABCD$, sendo $A(3,-2,4)$, $B(5,1,-3)$ e $C(0,1,2)$.`,
    base: [{ p: [3, -2, 4], l: 'A', c: 'g' }, { p: [5, 1, -3], l: 'B', c: 'g' }, { p: [0, 1, 2], l: 'C', c: 'g' }, { poly: [[3, -2, 4], [5, 1, -3], [0, 1, 2]], c: 'u', a: .1 }],
    steps: [r`<p>Num paralelogramo as diagonais têm o mesmo ponto médio; o vértice oposto a $B$ é $D$, então $\overrightarrow{AD}=\overrightarrow{BC}$.</p>`,
      r`$$D=A+C-B=(3+0-5,\;-2+1-1,\;4+2+3)=(-2,-2,9).$$`],
    ansAdd: [{ p: [-2, -2, 9], l: 'D', c: 'r' }, { poly: [[3, -2, 4], [5, 1, -3], [0, 1, 2], [-2, -2, 9]], c: 'r', a: .12 }],
    ans: r`$D(-2,-2,9)$.`,
  });
  Deck.ex({
    g: 'R', n: 6, t: 'Ponto na reta e mediana', tag: 'PDF 2',
    stmt: r`(a) $P(-3,m,n)$ pertence à reta por $A(1,-2,4)$ e $B(-1,-3,1)$: ache $m,n$.<br>(b) No triângulo $A(4,-1,-2)$, $B(2,5,-6)$, $C(1,-1,-2)$, calcule o comprimento da mediana relativa ao lado $AB$.`,
    base: [{ p: [1, -2, 4], l: 'A', c: 'g' }, { p: [-1, -3, 1], l: 'B', c: 'g' }, { L: [[1, -2, 4], [-2, -1, -3]], c: 'o', dash: true }],
    steps: [r`<p><b>(a)</b> $\overrightarrow{AB}=(-2,-1,-3)$ e $\overrightarrow{AP}=(-4,\,m+2,\,n-4)$ devem ser paralelos: $\overrightarrow{AP}=t\overrightarrow{AB}$.</p>`,
      r`<p>$-4=-2t\Rightarrow t=2$. Então $m+2=-2\Rightarrow m=-4$ e $n-4=-6\Rightarrow n=-2$.</p>`,
      { h: r`<p><b>(b)</b> A mediana relativa a $AB$ liga $C$ ao ponto médio $M$ de $AB$: $M=\frac{A+B}{2}=(3,2,-4)$, $\overrightarrow{CM}=(2,3,-2)$, $|\overrightarrow{CM}|=\sqrt{4+9+4}=\sqrt{17}$.</p>`,
        set: [{ p: [4, -1, -2], l: 'A', c: 'g' }, { p: [2, 5, -6], l: 'B', c: 'g' }, { p: [1, -1, -2], l: 'C', c: 'g' }, { poly: [[4, -1, -2], [2, 5, -6], [1, -1, -2]], c: 'u', a: .1 }, { p: [3, 2, -4], l: 'M', c: 'r' }, { s: [[1, -1, -2], [3, 2, -4]], c: 'r', l: 'mediana' }] }],
    ans: r`(a) $m=-4,\;n=-2$. &nbsp; (b) $\sqrt{17}$.`,
  });
})();
