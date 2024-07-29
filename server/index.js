import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";

// Initialiaze express and HTTP sever
const app = express();
const httpServer = createServer(app);

app.use(cors());

// connect to Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    // process.env.NODE_ENV === "production"
    //   ? false
    //   : ["http://localhost:5173", "http://127.0.0.1:5173"],
  },
});

// connnect to database
// connectDB();

// Define the directoryname
const __dirname = dirname(fileURLToPath(import.meta.url));

// Start the server
const port = process.env.PORT || 3000;
httpServer.listen(port, (token) => {
  if (!token) console.warn("port already in use");
  console.log(`Server running on port ${3000}`);
});

let numUsers = 0;

io.on("connection", (socket) => {
  let addedUser = false;
  console.log(`user ${socket.id} connected`);

  // when the client emits "add user", this listens then executes
  socket.on("add user", (username) => {
    if (addedUser) return;

    socket.username = username;
    ++numUsers;
    addedUser = true;

    socket.broadcast.emit("user joined", {
      username: socket.username,
      numUsers: numUsers,
    });
  });

  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name);
  });

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
  });
});

// Socket.IO connection handling
// io.on("connection", (socket) => {
//   console.log(`a user connected ${socket.id}`);

//   const clients = io.sockets.adapter.rooms;
//   socket.emit("clients_list", [...clients.keys()]);

//   // Upon connection
//   socket.emit("message", "Welcome to Private Messaging");

//   // Upon connection -only to user
//   socket.broadcast.emit("message", `User ]${socket.id} connected`);

//   // Listen for activity
//   socket.on("activity", (name) => {
//     socket.broadcast.emit("activity", name);
//   });

//   // receive and emit message back to the client
//   socket.on("chat message", (msg) => {
//     console.log(msg);
//     io.emit("chat message", msg);
//   });

//   // get list of connected clients
//   const clientsCount = io.engine.clientsCount;
//   socket.emit("getCount", clientsCount);

//   const rooms = io.of("/").adapter.rooms;
//   const sids = io.of("/").adapter.sids;

//   io.of("/").adapter.on("create-room", (room) => {
//     console.log(`room ${room} was created`);
//     socket.broadcast.emit("create-room", `room ${room} was created`);
//   });

//   socket.on("disconnect", (reason) => {
//     console.log(`user ${socket.id} disconnected due to ${reason}`);
//     socket.broadcast.emit("message", `User ${socket.id} disconnected`);
//   });
// });
