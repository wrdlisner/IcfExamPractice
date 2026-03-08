import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8'
};

const server = createServer(async (req, res) => {
  const url = req.url || '/';
  let filePath = 'static/index.html';

  if (url === '/questions.json') {
    filePath = 'data/questions.json';
  } else if (url === '/app.js') {
    filePath = 'static/app.js';
  } else if (url === '/styles.css') {
    filePath = 'static/styles.css';
  }

  try {
    const content = await readFile(join(process.cwd(), filePath));
    res.writeHead(200, { 'Content-Type': mime[extname(filePath)] || 'text/plain; charset=utf-8' });
    res.end(content);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`ICF practice app running at http://localhost:${port}`);
});
