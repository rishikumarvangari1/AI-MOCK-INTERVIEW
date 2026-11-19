const http = require("node:http");
const { Duplex } = require("node:stream");

function createFakeSocket(rawRequest) {
  const chunks = [];
  let pushed = false;

  const socket = new Duplex({
    allowHalfOpen: true,
    read() {
      if (!pushed) {
        pushed = true;
        this.push(rawRequest);
      }
    },
    write(chunk, _encoding, callback) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      callback();
    },
  });

  socket.remoteAddress = "127.0.0.1";
  socket.remoteFamily = "IPv4";
  socket.remotePort = 54321;
  socket.localAddress = "127.0.0.1";
  socket.localPort = 5000;
  socket.encrypted = false;
  socket.setTimeout = () => socket;
  socket.setNoDelay = () => socket;
  socket.setKeepAlive = () => socket;
  socket.cork = () => {};
  socket.uncork = () => {};
  socket.ref = () => socket;
  socket.unref = () => socket;

  return { socket, chunks };
}

function decodeChunkedBody(buffer) {
  let offset = 0;
  const parts = [];

  while (offset < buffer.length) {
    const lineEnd = buffer.indexOf("\r\n", offset);
    if (lineEnd === -1) break;
    const sizeHex = buffer.slice(offset, lineEnd).toString("ascii").split(";")[0].trim();
    const size = Number.parseInt(sizeHex, 16);
    if (!Number.isFinite(size) || size === 0) break;
    const start = lineEnd + 2;
    parts.push(buffer.slice(start, start + size));
    offset = start + size + 2;
  }

  return Buffer.concat(parts);
}

function parseRawHttpResponse(rawBuffer) {
  const headerEnd = rawBuffer.indexOf("\r\n\r\n");
  if (headerEnd === -1) {
    throw new Error("Incomplete HTTP response received");
  }

  const headerText = rawBuffer.slice(0, headerEnd).toString("latin1");
  const lines = headerText.split("\r\n");
  const statusLine = lines.shift() || "";
  const statusMatch = statusLine.match(/^HTTP\/\d\.\d\s+(\d+)/);
  const status = statusMatch ? Number(statusMatch[1]) : 500;

  const headers = new Map();
  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();
    headers.set(key, value);
  }

  let bodyBuffer = rawBuffer.slice(headerEnd + 4);
  if ((headers.get("transfer-encoding") || "").toLowerCase().includes("chunked")) {
    bodyBuffer = decodeChunkedBody(bodyBuffer);
  }

  const text = bodyBuffer.toString("utf8");

  return {
    status,
    headers: {
      get: (name) => headers.get(name.toLowerCase()) ?? null,
    },
    text: async () => text,
    json: async () => JSON.parse(text),
  };
}

function createTestClient(app) {
  const server = http.createServer(app);

  return function request(path, options = {}) {
    return new Promise((resolve, reject) => {
      const method = (options.method || "GET").toUpperCase();
      const rawHeaders = options.headers || {};
      const headers = {};

      for (const [k, v] of Object.entries(rawHeaders)) {
        headers[k.toLowerCase()] = v;
      }

      const bodyBuffer =
        options.body === undefined || options.body === null
          ? Buffer.alloc(0)
          : Buffer.isBuffer(options.body)
            ? options.body
            : Buffer.from(String(options.body), "utf8");

      headers.host = headers.host || "localhost:5000";
      headers.connection = "close";
      if (bodyBuffer.length > 0 && !headers["content-length"]) {
        headers["content-length"] = String(bodyBuffer.length);
      }

      const headerLines = Object.entries(headers)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\r\n");

      const rawRequest = Buffer.concat([
        Buffer.from(`${method} ${path} HTTP/1.1\r\n${headerLines}\r\n\r\n`, "latin1"),
        bodyBuffer,
      ]);

      const { socket, chunks } = createFakeSocket(rawRequest);

      socket.on("finish", () => {
        try {
          resolve(parseRawHttpResponse(Buffer.concat(chunks)));
        } catch (err) {
          reject(err);
        }
      });

      socket.on("error", reject);

      server.emit("connection", socket);
    });
  };
}

module.exports = { createTestClient };
