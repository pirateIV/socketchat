import { socket } from "./socket";
import ConnectionStatus from "./ConnectionStatus";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ isConnected }) => {
  return (
    <aside className="h-full w-64 bg-gradient-to-b from-purple-950/90 to-purple-950 border-r-2 border-purple-500 text-white">
      <header className="text-3xl p-3 h-24">
        <div i-socket-logo="true"></div>
      </header>

      <div className="flex flex-col h-[calc(100vh-6rem)] gap-0 overflow-auto">
        {socket.id ? (
          <Link to={socket.id} className="block bg-blue-200/15 py-4 px-2.5">
            <div className="flex items-center gap-3">
              <p className="font-bold font-gentium text-sm">
                {socket.id?.substring(0, 14)}{" "}
                <span className="text-xs opacity-65">(Yourself)</span>
              </p>
            </div>
            <ConnectionStatus isConnected={isConnected} />
          </Link>
        ) : null}
      </div>
    </aside>
  );
};

export default Sidebar;
