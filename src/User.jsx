import ConnectionStatus from "./ConnectionStatus";

const User = ({ user, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`user ${isSelected ? "bg-blue-300/15" : ""} py-4 px-2.5`}
    >
      <div className="relative">
        <div className="name flex items-center gap-3">
          <p className="font-gentium font-bold text-sm">
            <span>{user.username} </span>
            <span className="text-xs opacity-65">
              {user.self && "(Yourself)"}
            </span>
          </p>
        </div>
        <ConnectionStatus isConnected={user.connected} />
        {user.hasNewMessages && <div className="new-messages">!</div>}
      </div>
    </div>
  );
};

export default User;
