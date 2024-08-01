import { Outlet, useLocation } from "react-router-dom";
import { socket } from "./socket";

const ChatApp = () => {
  const { pathname } = useLocation();

  console.log(socket.username);
  console.log(socket);
  return (
    <main>
      {pathname === "/" && (
        <>
          <div className="i-socket-logo h-52 w-52"></div>
          <button>Start</button>
        </>
      )}
      <Outlet />
    </main>
  );
};

export default ChatApp;
