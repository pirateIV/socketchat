import http from "http";
import { Server } from "socket.io";

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:5173"] },
});

io.use((socket, next) => {
  const { username } = socket.handshake.auth;

  if (!username) {
    return next(new Error("Invalid username"));
  }
  socket.username = username;
  socket.userID = socket.id;
  next();
});

io.on("connection", (socket) => {
  console.log(socket.id, "connected");

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
