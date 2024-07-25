import { socket } from "../socket";
import { useEffect, useState } from "react";

const useSocketConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastActiveTime, setLastActiveTime] = useState(null);

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
