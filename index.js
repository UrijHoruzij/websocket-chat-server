"use strict";
const WebSocketServer = require("ws").WebSocketServer;
const wss = new WebSocketServer({ port: 3000 });

console.log("The server is running: 3000");
wss.on("connection", (ws) => {
  console.log(`User connected`);
  ws.on("message", (msg) => {
    const message = JSON.parse(msg);
    console.log(message);
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(message));
      }
    });
  });
  ws.on("disconnect", () => console.log(`User disconnected`));
});
