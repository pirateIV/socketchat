import { socket } from "./socket";
import useSocketConnection from "./hooks/useSocketConnection";

const Header = () => {
  const { isConnected, lastActiveTime } = useSocketConnection();

  return (
    <header>
      <div className="bg-white h-24 p-3 shadow-lg">
        {socket.id && (
          <div>
            <h3 className="text-lg font-gentium font-semibold">{socket.id}</h3>
            <div>
              <small className="opacity-80">
                {!isConnected ? `last active: ${lastActiveTime}` : "active"}
              </small>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
