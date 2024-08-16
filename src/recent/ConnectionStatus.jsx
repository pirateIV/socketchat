const ConnectionStatus = ({ isConnected }) => {
  return (
    <div className="flex items-center gap-2 pt-1.5">
      <i
        id="online-status"
        className={`icon ${isConnected ? "connected" : ""}`}
      ></i>
      <span id="connection-status" className="opacity-40 text-xs text-right">
        {isConnected ? "online" : "offline"}
      </span>
    </div>
  );
};

export default ConnectionStatus;
