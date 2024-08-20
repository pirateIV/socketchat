const UserStatus = ({ connected, hasNewMessages, unreadMessages }) => {
  return (
    <div className="user-status">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className={`icon ${connected ? "connected" : ""} `}></div>
          <small className="opacity-60">
            {connected ? "online" : "offline"}
          </small>
        </div>
        {hasNewMessages && <div className="new-messages">👶🏾</div>}
      </div>
    </div>
  );
};

export default UserStatus;
