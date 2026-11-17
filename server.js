// Servidor estático mínimo (sem dependências além do KaTeX servido de node_modules).
// Railway injeta a porta em process.env.PORT.
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');
const KATEX = path.join(__dirname, 'node_modules', 'katex', 'dist');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};
const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.json', '.svg']);

function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p === '/' || p === '') p = '/index.html';
  let base = PUBLIC;
  if (p.startsWith('/vendor/katex/')) {
    base = KATEX;
    p = p.slice('/vendor/katex'.length);
  }
  const full = path.normalize(path.join(base, p));
  if (!full.startsWith(base)) return null; // path traversal
  return full;
}

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('ok');
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405);
    return res.end();
  }
  let file;
  try { file = resolveFile(req.url); } catch { file = null; }
  if (!file) { res.writeHead(400); return res.end('Bad request'); }

  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Não encontrado');
    }
    const ext = path.extname(file).toLowerCase();
    const headers = {
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      // conteúdo muda pouco; fontes/vendor podem ser cacheadas por mais tempo
      // fontes/KaTeX: cache longo; o resto revalida sempre (Last-Modified -> 304)
      'Cache-Control': file.startsWith(KATEX) ? 'public, max-age=604800' : 'no-cache',
      'Last-Modified': st.mtime.toUTCString(),
      'X-Content-Type-Options': 'nosniff',
    };
    const ims = req.headers['if-modified-since'];
    if (ims && new Date(ims).getTime() >= Math.floor(st.mtimeMs / 1000) * 1000) {
      res.writeHead(304, headers);
      return res.end();
    }
    const wantsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] || '');
    const stream = fs.createReadStream(file);
    if (wantsGzip && COMPRESSIBLE.has(ext)) {
      headers['Content-Encoding'] = 'gzip';
      headers['Vary'] = 'Accept-Encoding';
      res.writeHead(200, headers);
      if (req.method === 'HEAD') return res.end();
      stream.pipe(zlib.createGzip()).pipe(res);
    } else {
      headers['Content-Length'] = st.size;
      res.writeHead(200, headers);
      if (req.method === 'HEAD') return res.end();
      stream.pipe(res);
    }
    stream.on('error', () => res.destroy());
  });
});

server.listen(PORT, '0.0.0.0', () => console.log(`Vetores interativo rodando na porta ${PORT}`));
