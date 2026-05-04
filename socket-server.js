const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Socket.io Operational Hub");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket"]
});

// Low-level diagnostic for incoming upgrade requests
server.on("upgrade", (req, socket, head) => {
  console.log(
    "🔍 [SOCKET_HUB]: Incoming websocket upgrade request from",
    req.headers.origin,
  );
});

io.on("connection", (socket) => {
  console.log("🌐 [SOCKET_SERVER]: New handshake established:", socket.id);

  socket.on("new-message", (data) => {
    console.log(
      "📩 [SOCKET_SERVER]: Relaying message signal for inquiry:",
      data.inquiryId,
    );
    // Broadcast to all clients
    io.emit("new-message", data);
  });

  socket.on("disconnect", () => {
    console.log("⚠️ [SOCKET_SERVER]: Connection severed:", socket.id);
  });
});

const PORT = 3005;
server.listen(PORT, () => {
  console.log(`🚀 [SOCKET_HUB]: External server active on port ${PORT}`);
});
