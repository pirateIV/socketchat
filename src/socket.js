import { io } from "socket.io-client";

// const token = localStorage.getItem("token");

const URL =
  process.env.NODE_ENV === "production"
    ? "https://socketchat-xe13.onrender.com"
    : "http://localhost:4000";

export const socket = io(URL, {
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});
