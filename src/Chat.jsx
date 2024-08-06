import { useEffect, useState } from "react";
import { socket } from "./socket";

const Chat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [ping, setPing] = useState(0);

  useEffect(() => {}, [socket]);

  return (
    <div>
      {chatMessage} {ping}
    </div>
  );
};

export default Chat;
