import React from "react";
import { useEffect } from "react";
import { socket } from "./socket";
import { useState } from "react";
import Chat from "./Chat";
import ConnectionStatus from "./ConnectionStatus";
import Sidebar from "./Sidebar";

const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
  }, []);

  return (
    <>
      <div className="grid grid-rows-[1fr,max-content]">
        <Sidebar />
        <div>
          <h1>Private Messaging</h1>
          <Chat />
          <ConnectionStatus isConnected={isConnected} />
        </div>
      </div>
    </>
  );
};

export default App;
