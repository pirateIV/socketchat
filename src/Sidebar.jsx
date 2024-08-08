import { useState } from "react";
import User from "./User";

const Sidebar = ({ users, selectedUser, setSelectedUser }) => {
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    user.hasNewMessages = false;
  };

  return (
    <aside>
      <header className="h-24 p-3 text-3xl">
        <div i-socket-logo=""></div>
      </header>

      <div className="flex flex-col h-[calc(100vh-6rem)] overflow-auto gap-0">
        {users.map((user) => (
          <User
            user={user}
            key={user.userID}
            onSelect={() => handleUserSelect(user)}
            isSelected={user?.userID === selectedUser?.userID}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
