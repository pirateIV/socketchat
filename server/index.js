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
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5173", "http://127.0.0.1:5173"],
  },
});

// connnect to database
// connectDB();

// Define the directoryname
const __dirname = dirname(fileURLToPath(import.meta.url));

// Start the server
const port = process.env.PORT || 3000;
httpServer.listen(port, () => console.log(`Server running on port ${3000}`));

// Map to store data keyed by socket ID
const connectedUsers = new Map();

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);

  // Upon connection
  socket.emit("message", "Welcome to Private Messaging");

  // socket.on("ping", (ping, socketId) => {
  //   console.log(ping, socketId);
  // });

  socket.on("disconnect", (reason) => {
    console.log(`user ${socket.id} disconnected due to ${reason}`);
  });
});
