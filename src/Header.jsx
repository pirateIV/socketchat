import { socket } from "./socket";
import useSocketConnection from "./hooks/useSocketConnection";

const Header = () => {
  return (
    <header>
      <div className="bg-white h-24 p-3 shadow-lg">
        <div>
          <h3 className="text-lg font-gentium font-semibold">
            {/* {socket.id || lastActive.sid} */}
          </h3>
          <div>
            {/* <small className="opacity-80">
              {!isConnected ? `last active: ${lastActive.time}` : "active"}
            </small> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
