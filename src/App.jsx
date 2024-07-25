import { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useState } from "react";
import Sidebar from "./Sidebar";

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastActiveTime, setLastActiveTime] = useState(null);
  const textAreaRef = useRef(null);

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

  window.addEventListener("keydown", (e) => {
    if (!e.target.matches("textarea")) {
      if (e.key === "d") {
        socket.disconnect();
      } else if (e.key === "c") {
        socket.connect();
      }
    }
  });

  return (
    <>
      <div className="grid grid-cols-[auto,1fr] h-full" id="grid">
        <Sidebar isConnected={isConnected} />
        <div className="bg-cover bg-[url('./messaging-bg.webp')]">
          <div className="flex flex-col h-full justify-between">
            <header>
              <div className="bg-white h-24 p-3 shadow-lg">
                <h3 className="text-lg font-gentium font-semibold">
                  {socket.id}
                </h3>
                <div>
                  <small className="opacity-80">
                    {!isConnected ? `last active: ${lastActiveTime}` : "active"}
                  </small>
                </div>
              </div>
            </header>

            <div className="h-40 flex-auto overflow-y-auto bg-black/30">
              <div className="p-5"></div>
            </div>

            <footer className="bg-white p-3 border-t border-black/20 shadow-lg">
              <form className="flex items-end gap-3">
                <label htmlFor="chat_message"></label>
                <textarea
                  // rows="5"
                  ref={textAreaRef}
                  name="chat_message"
                  placeholder="Send a message..."
                  maxLength="2000"
                  className="w-full border h-auto overflow-y-auto text-sm overflow-hidden border-gray-200 p-3 rounded-md outline-none focus:border-gray-400"
                ></textarea>
                <div className="controls">
                  <button
                    title="Send"
                    className="p-4 rounded-md bg-gray-200 hover:bg-gray-300"
                  >
                    <div i-send-msg="true"></div>
                  </button>
                </div>
              </form>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
