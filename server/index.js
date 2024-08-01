import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import connectDB from "./config/db.js";
import jwt from "jsonwebtoken";

// Initialiaze express and HTTP sever
const app = express();
const httpServer = createServer(app);

app.use(cors());

// connect to Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// connnect to database
connectDB();

// Define the directoryname
const __dirname = dirname(fileURLToPath(import.meta.url));

// Start the server
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`Server running on port ${3000}`);
});

app.post("/login", async (req, res) => {
  const username = req.body;

  const token = authorizeUser(username);
  res.status(201).json({ message: "user created", token });
});

const authorizeUser = (username) => {
  const secretKey = "@e./!?>&%$&O@edexaqwef00//.";
  const options = { expiresIn: "1h" };

  const token = jwt.sign({ username }, secretKey, options);

  return token;
};

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);

  socket.on("add user", (username) => {
    if (!username) {
      return new Error("invalid username");
    }

    authorizeUser(username);

    socket.handshake.auth.username = username;
    console.log(socket.handshake.auth.username);
  });

  socket.on("disconnect", (reason) => {
    console.log(`user ${socket.id} disconnected due to ${reason}`);
  });
});

// io.use((socket, next) => {
//   const token = socket.handshake.query.token;
// });
