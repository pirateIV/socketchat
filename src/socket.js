import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? false : "http://localhost:3000";

export const socket = io("https://socketchat-xe13.onrender.com");
socket.onAny((event, ...args) => {
  console.log(event, args);
});
