import { socket } from "./socket";
import useSocketConnection from "./hooks/useSocketConnection";

const Header = ({ selectedUser }) => {
  console.log(selectedUser);

  return (
    <header>
      <div className="bg-white h-24 p-3 shadow-lg">
        <div>
          <h3 className="text-lg font-gentium font-semibold">
            {selectedUser.username}
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
