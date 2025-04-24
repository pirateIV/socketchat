/* eslint-disable no-undef */
import http from "node:http";
import { Server } from "socket.io";

const httpServer = http.createServer();

const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("user", socket.id, "disconnected");
  });
});

const port = process.env.PORT || 4000;
httpServer.listen(port, () => {
  console.log("Server running on port", port);
});
