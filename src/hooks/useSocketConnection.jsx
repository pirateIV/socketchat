import { useEffect, useState } from "react";

const useSocketConnection = (socket) => {
  const [lastActive, setLastActive] = useState({ sid: socket.id, time: null });
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setLastActive({
        sid: socket?.id,
        time: new Date().toLocaleTimeString(),
      });
      console.log(`user connected ${socket.id}`);
    }

    function onDisconnect() {
      setIsConnected(false);
      setLastActive({
        ...lastActive,
        time: new Date().toLocaleTimeString(),
      });
      console.log(`user disconnected ${socket.id}`);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
  }, [socket]);
  return { isConnected, lastActive };
};

export default useSocketConnection;
