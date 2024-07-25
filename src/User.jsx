import { socket } from "./socket";
import { Link } from "react-router-dom";
import ConnectionStatus from "./ConnectionStatus";
import useSocketConnection from "./hooks/useSocketConnection";

const User = () => {
  const { isConnected } = useSocketConnection();

  return (
    <div>
      {socket.id ? (
        <Link to={socket.id} className="block bg-blue-200/15 py-4 px-2.5">
          <div className="flex items-center gap-3">
            <p className="font-bold font-gentium text-sm">
              <span>{socket.id?.substring(0, 14)} </span>
              <span className="text-xs opacity-65">(Yourself)</span>
            </p>
          </div>
          <ConnectionStatus isConnected={isConnected} />
        </Link>
      ) : null}
    </div>
  );
};

export default User;
