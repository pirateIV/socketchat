import http from "http";
import { Server } from "socket.io";

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://socket-chat-ix.vercel.app"],
  },
});

import crypto from "crypto";
const randomId = () => crypto.randomBytes(8).toString("hex");

import { InMemorySessionStore } from "./sessionStore.js";
const sessionStore = new InMemorySessionStore();

io.use((socket, next) => {
  const { username, sessionID } = socket.handshake.auth;

  console.log(username, sessionID);

  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }

  if (!username) {
    return next(new Error("Invalid username"));
  }

  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  // persist session
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  console.log(sessionStore);

  // emit session details
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }

  socket.emit("users", users);

  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });

  socket.on("private message", ({ message, to }) => {
    socket.to(to).emit("private message", {
      message,
      from: socket.id,
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.id);
  });
});

const port = process.env.PORT || 4000;
httpServer.listen(port, () => console.log(`Server running on port ${port}`));
