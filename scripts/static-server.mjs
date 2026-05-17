import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve(process.argv[2] || "out");
const port = Number(process.argv[3] || 3000);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
};

function resolveRequestPath(urlPath) {
  const cleanPath = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(
    /^(\.\.[/\\])+/,
    "",
  );
  const candidates = [
    join(root, cleanPath),
    join(root, `${cleanPath}.html`),
    join(root, cleanPath, "index.html"),
  ];

  for (const candidate of candidates) {
    const resolved = resolve(candidate);
    if (!resolved.startsWith(root + sep) && resolved !== root) {
      continue;
    }
    if (existsSync(resolved) && statSync(resolved).isFile()) {
      return resolved;
    }
  }

  return join(root, "404.html");
}

const server = createServer((request, response) => {
  const filePath = resolveRequestPath(request.url || "/");
  const ext = extname(filePath);

  response.setHeader("Content-Type", contentTypes[ext] || "application/octet-stream");
  response.statusCode = filePath.endsWith("404.html") ? 404 : 200;
  createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
