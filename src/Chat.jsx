import { useEffect, useState } from "react";
import { socket } from "./socket";

const Chat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [ping, setPing] = useState(0);
  
  useEffect(() => {
    socket.on("message", (msg) => {
      setChatMessage(msg);
    });
  }, [socket]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPing((prevPing) => prevPing + 1);
      socket.emit("ping", ping, socket.id);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {chatMessage} {ping}
    </div>
  );
};

export default Chat;
