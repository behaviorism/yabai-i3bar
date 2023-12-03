const { WIDGET, WIDGET_ID, YABAI_PATH, NODE_PATH } = require("../constants");

const PORT = 11337;

if (typeof window === "undefined") {
  const http = require("http");
  const { exec } = require("child_process");
  const { createHash } = require("crypto");

  exec(
    `sh ./src/refreshServer/refresher.sh ${WIDGET_ID} ${YABAI_PATH} ${PORT}`
  );

  var refresh = () => {};

  const server = http.createServer(async (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, POST, GET, PUT, DELETE"
    );

    if (request.method === "POST") {
      const body = await new Promise((resolve) => {
        let body = [];
        request
          .on("data", (chunk) => body.push(chunk))
          .on("end", () => {
            resolve(Buffer.concat(body).toString());
          });
      });

      if (body === "refresh") {
        refresh();
      }
    }

    response.writeHead(200);
    response.write("OK");
    response.end();
  });

  server.on("upgrade", (request, socket) => {
    const acceptKey = request.headers["sec-websocket-key"];
    const responseKey = createHash("sha1")
      .update(acceptKey + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11", "binary")
      .digest("base64");

    const headers = [
      "HTTP/1.1 101 Switching Protocols",
      "Upgrade: websocket",
      "Connection: Upgrade",
      `Sec-WebSocket-Accept: ${responseKey}`,
      "\r\n",
    ];

    socket.write(headers.join("\r\n"));

    refresh = () => {
      const message = "refresh";

      const payloadLength = Buffer.from(message).length;

      const frame = Buffer.alloc(2 + payloadLength);
      frame.writeUInt8(0x81, 0);
      frame.writeUInt8(payloadLength, 1);
      frame.write(message, 2, "utf-8");

      socket.write(frame);
    };
  });

  server.listen(PORT);
}

var refreshHandler = () => {};

module.exports.setRefresherHandler = (_refreshHandler) =>
  (refreshHandler = _refreshHandler);

var ws;

module.exports.init = async () => {
  if (ws) {
    return;
  }

  // eslint-disable-next-line import/no-unresolved
  const { run } = require("uebersicht");

  try {
    await run(`${NODE_PATH} ${WIDGET}/src/refreshServer/refreshServer.js &`);
  } catch (error) {}

  ws = new WebSocket(`ws://localhost:${PORT}`);

  ws.onmessage = (event) => {
    if (event.data === "refresh") {
      refreshHandler();
    }
  };
};
