# Vetores em R³ — aula interativa

Apresentação interativa de **Vetores (Geometria Analítica)**: vetores no plano e no espaço, produto escalar e produto vetorial
(a ementa termina antes do produto misto), com um espaço 3D em canvas (gira sozinho, arraste para girar, roda = zoom),
os **50 exercícios de produto escalar** e os **29 de produto vetorial** resolvidos passo a passo.

## Rodar localmente
```bash
npm install
npm start        # http://localhost:3000
```

## Deploy no Railway
1. Suba esta pasta para um repositório no GitHub (o `node_modules` é ignorado).
2. No Railway: **New Project → Deploy from GitHub repo** e escolha o repositório.
3. O Railway detecta o `package.json` (Nixpacks), roda `npm install` e `npm start`. A porta vem de `PORT` (já tratada em `server.js`).
4. Em **Settings → Networking**, clique em **Generate Domain**.

Alternativa pelo CLI: `railway up` dentro da pasta.

## Estrutura
- `server.js` — servidor estático (gzip, `/health`, serve o KaTeX de `node_modules`).
- `public/js/engine3d.js` — motor 3D próprio (projeção, vetores, planos, arcos…).
- `public/js/app.js` — slides, passos, índice, grade de exercícios, atalhos.
- `public/js/c1…c6` — conteúdo (teoria e exercícios). Cada exercício é um objeto `Deck.ex({...})`.

Atalhos: `→`/`Espaço` avança, `←` volta, `I` índice, `E` exercícios, `R` rotação, `G` grade, `F` foco no 3D, `T` tema.
