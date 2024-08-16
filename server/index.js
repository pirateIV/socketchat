import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "crypto";
import cors from "cors";
import { InMemorySessionStore } from "./sessionStore.js";

// Initialiaze express and HTTP sever
const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

// connect to Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5174", "https://socket-chat-ix.vercel.app"],
  },
});

// Define the directoryname
const __dirname = dirname(fileURLToPath(import.meta.url));

// Start the server
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`Server running on port ${3000}`);
});

const randomID = () => crypto.randomBytes(8).toString("hex");
const sessionStore = new InMemorySessionStore();

io.use((socket, next) => {
  const { sessionID, username } = socket.handshake.auth;

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
    return next(new Error("invalid username"));
  }
  socket.sessionID = randomID();
  socket.userID = randomID();
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

  // emit session details
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  // join the "userID" room
  socket.join(socket.userID);

  // fetch existing users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);

  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });

  // forward private message to the right recipient
  socket.on("private message", ({ content, to }) => {
    // the "private message" event will broadcast to "user socket id" except this socket
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });

  socket.on("disconnect", (reason) => {
    console.log(`user ${socket.id} disconnected due to ${reason}`);
    socket.broadcast.emit("user disconnected", socket.id);
  });
});
