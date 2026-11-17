// Fechamento: tipos de operações e resumo final.
(function () {
  const cross = V.cross;
  const vec = (v, c, l, o) => Object.assign({ v, c, l }, o ? { o } : {});
  const ang = (at, a, b, r, l, c = 'w') => ({ arc: { at, a, b, r }, l, c });

  Deck.section('Resumo final', 'fim');

  Deck.slide({
    id: 'tipos', title: 'Quais operações fazem sentido? Número ou vetor?',
    base: [vec([2, 1, 0], 'u', '>u'), vec([1, 2, 1], 'v', '>v'), vec([0, 1, 2], 'w', '>w'), vec([1, 1, -1], 'r', '>v-w')],
    steps: [
      { h: r`<p>Pergunta-chave diante de uma expressão: <b>de que tipo</b> é cada pedaço — número (escalar) ou vetor?</p>
        <table class="t"><tr><th>Operação</th><th>Entra</th><th>Sai</th></tr>
        <tr><td>$\vec a+\vec b$, $\vec a-\vec b$</td><td>vetor, vetor</td><td>vetor</td></tr>
        <tr><td>$k\,\vec a$</td><td>número, vetor</td><td>vetor</td></tr>
        <tr><td>$\vec a\cdot\vec b$</td><td>vetor, vetor</td><td><b>número</b></td></tr>
        <tr><td>$\vec a\times\vec b$</td><td>vetor, vetor ($\R^3$)</td><td><b>vetor</b></td></tr></table>` },
      { h: r`<p>Exemplo: $\vec u\cdot(\vec v-\vec w)$. Como $\vec v-\vec w$ é um <b>vetor</b>, temos produto escalar de dois vetores, que resulta num número. <b>Faz sentido</b> (e vale $\vec u\cdot\vec v-\vec u\cdot\vec w$ pela distributiva).</p>` },
      { h: r`<table class="t"><tr><th>Expressão</th><th>Faz sentido?</th><th>Por quê</th></tr>
        <tr><td>$(\vec u\cdot\vec v)\,\vec w$</td><td>✓</td><td>número × vetor = vetor</td></tr>
        <tr><td>$(\vec u\cdot\vec v)\cdot\vec w$</td><td style="color:var(--bad)">✗</td><td>número $\cdot$ vetor: o escalar exige dois vetores</td></tr>
        <tr><td>$\vec u\times(\vec v\cdot\vec w)$</td><td style="color:var(--bad)">✗</td><td>vetor $\times$ número: o vetorial exige dois vetores</td></tr>
        <tr><td>$(\vec u\cdot\vec v)\times\vec w$</td><td style="color:var(--bad)">✗</td><td>número $\times$ vetor</td></tr>
        <tr><td>$\vec u\times(\vec v\times\vec w)$</td><td>✓</td><td>vetor $\times$ vetor = vetor</td></tr>
        <tr><td>$\vec u\cdot(\vec v\times\vec w)$</td><td>✓</td><td>vetor $\cdot$ vetor = número (produto misto)</td></tr>
        <tr><td>$\vec u+(\vec v\cdot\vec w)$</td><td style="color:var(--bad)">✗</td><td>vetor + número</td></tr></table>` },
    ],
  });

  // ---------------- Resumo ----------------
  Deck.slide({
    id: 'resumo', title: 'Resumo: tudo em uma tela',
    base: [{ v: [3, 0, 0], c: 'u', l: '>u' }, { v: [1, 2.5, 0], c: 'v', l: '>v' }, { v: cross([3, 0, 0], [1, 2.5, 0]), c: 'r', l: '>u×v' }, ang([0, 0, 0], [3, 0, 0], [1, 2.5, 0], .8, 'θ'), { v: V.proj([1, 2.5, 0], [3, 0, 0]), c: 'o', dash: true, nolg: true }],
    steps: [
      { h: r`<table class="t" style="text-align:left;width:100%"><tr><th></th><th>Produto escalar</th><th>Produto vetorial</th></tr>
        <tr><td><b>Resultado</b></td><td>número</td><td>vetor</td></tr>
        <tr><td><b>Coordenadas</b></td><td>$x_1x_2+y_1y_2+z_1z_2$</td><td>determinante com $\vec i,\vec j,\vec k$</td></tr>
        <tr><td><b>Geométrico</b></td><td>$|\vec u||\vec v|\cos\theta$</td><td>$|\vec u||\vec v|\sin\theta$ (módulo)</td></tr>
        <tr><td><b>Zero quando</b></td><td>$\vec u\perp\vec v$</td><td>$\vec u\parallel\vec v$</td></tr>
        <tr><td><b>Comutativo?</b></td><td>sim</td><td>não: $\vec u\times\vec v=-\vec v\times\vec u$</td></tr>
        <tr><td><b>Serve para</b></td><td>ângulo, módulo, projeção, ortogonalidade</td><td>normal ao plano, áreas, distância ponto–reta</td></tr></table>` },
      { h: r`<h3>Fórmulas-chave</h3>
        <p>$|\vec u|^2=\vec u\cdot\vec u$ &nbsp;·&nbsp; $\cos\theta=\dfrac{\vec u\cdot\vec v}{|\vec u||\vec v|}$ &nbsp;·&nbsp; $\cos^2\alpha+\cos^2\beta+\cos^2\gamma=1$</p>
        <p>$\operatorname{proj}_{\vec u}\vec v=\dfrac{\vec v\cdot\vec u}{\vec u\cdot\vec u}\vec u$ &nbsp;·&nbsp; $S_\triangle=\tfrac12|\overrightarrow{AB}\times\overrightarrow{AC}|$ &nbsp;·&nbsp; $d(P,AB)=\dfrac{|\overrightarrow{AB}\times\overrightarrow{AP}|}{|\overrightarrow{AB}|}$</p>` },
      { h: r`${OK('Bom estudo!', r`<p>Use o <b>botão Exercícios</b> no topo para revisitar qualquer um dos 79 exercícios resolvidos. A matéria termina aqui — o produto misto fica para a próxima etapa. Bons estudos!</p>`)}` },
    ],
  });
})();
