const io = require("socket.io-client");

const socket = io("ws://localhost:3000/chat");

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
  socket.emit("message", { msg: "Hello from test client" });
});

socket.on("message", (data) => {
  console.log("Received from server:", data);
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
