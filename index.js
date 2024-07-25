import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import connectDB from "./config/db.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
connectDB();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));


app.post("/new", (req, res) => {});

const port = process.env.PORT || 3000;
httpServer.listen(port, () => console.log(`Server running on port ${3000}`));

const connectedUsers = new Map(); // To store user data keyed by socket id

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);

  // connectedUsers.set(socket.id, {
  //   id: socket.id,
  //   username: socket.handshake.query.username,
  // });

  socket.on("disconnect", (reason) => {
    console.log(`user ${socket.id} disconnected due to ${reason}`);
  });
});
