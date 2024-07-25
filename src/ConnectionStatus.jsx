const ConnectionStatus = ({ isConnected }) => {
  return (
    <div className="flex items-center gap-2 pt-1.5">
      <div
        id="online-status"
        className={`w-3 h-3 rounded-full ${
          isConnected ? "bg-green-500" : "bg-red-500"
        }`}
      ></div>
      <span className="opacity-40 text-xs text-right" id="connection-status">
        {isConnected ? "online" : "offline"}
      </span>
    </div>
  );
};

export default ConnectionStatus;
