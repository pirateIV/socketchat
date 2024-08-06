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
app.use(express.json());

// connect to Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// connnect to database
// connectDB();

// Define the directoryname
const __dirname = dirname(fileURLToPath(import.meta.url));

// Start the server
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`Server running on port ${3000}`);
});

// app.post("/login", async (req, res, next) => {
//   const { username } = req.body;
//   console.log(req.body);
//   if (!username) {
//     return next(new Error("Username is missing"));
//   }

//   const token = authorizeUser(username);
//   res.status(201).json({ message: "user created", token });
// });

const secretKey = "@e./!?>&%$&O@edexaqwef00//.";

const authorizeUser = (username) => {
  const payload = { username };
  const options = { expiresIn: "1h" };

  const token = jwt.sign(payload, secretKey, options);

  return token;
};

io.use((socket, next) => {
  const { username } = socket.handshake.auth;
  if (!username) {
    return next(new Error("invalid username"));
  }
  console.log(username);
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
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

    /**
     * The code above is equivalent to:
     *
     * socket.to(to).except(socket.id).emit("private message", {
     *    content,
     *    from: socket.id
     * })
     */
  });

  socket.on("disconnect", (reason) => {
    console.log(`user ${socket.id} disconnected due to ${reason}`);
  });
});
