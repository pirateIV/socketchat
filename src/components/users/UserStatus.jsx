const UserStatus = ({ connected, hasNewMessages, unreadMessages, userID }) => {
  return (
    <div className="user-status">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <small className="opacity-60">{userID?.substring(0, 7)}...</small>
        </div>
        {hasNewMessages && <div className="new-messages">👶🏾</div>}
      </div>
    </div>
  );
};

export default UserStatus;
