const ConnectionStatus = ({ isConnected }) => {
  return (
    <p id="connection-status">status: {isConnected ? "online" : "offline"}</p>
  );
};

export default ConnectionStatus;
