import { socket } from "../socket";
import { useEffect, useState } from "react";

const useSocketConnection = () => {
  const [lastActiveTime, setLastActiveTime] = useState(null);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
      setLastActiveTime(new Date().toLocaleTimeString());
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
  }, []);
  return { isConnected, lastActiveTime };
};

export default useSocketConnection;
