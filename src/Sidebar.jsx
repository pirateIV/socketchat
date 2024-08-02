import { useState } from "react";
import User from "./User";

const Sidebar = ({ allUsers, selectedUser, setSelectedUser }) => {
  const handleUserSelect = (userID) => {
    setSelectedUser(userID);
  };

  return (
    <aside>
      <header className="text-3xl p-3 h-24">
        <div i-socket-logo="true"></div>
      </header>

      <div className="flex flex-col h-[calc(100vh-6rem)] overflow-auto gap-0">
        {allUsers.map((user) => (
          <User
            user={user}
            key={user.userID}
            isSelected={user.userID === selectedUser}
            onSelect={() => handleUserSelect(user.userID)}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
