import User from "@/User";
import SocketLogo from "@/SocketLogo";

const Users = ({ users, setUsers, selectedUser, setSelectedUser }) => {
  const handleSelectUser = (user) => {
    setSelectedUser(() => {
      // if selected user had new messages, clear them
      if (user.hasNewMessages) {
        user.hasNewMessages = false;
      }
      return user;
    });

    // Update the users state to reflect the change in `hasNewMessages`
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.userID === user.userID ? { ...u, hasNewMessages: false } : u,
      ),
    );
  };

  return (
    <aside className="h-screen text-white w-72 bg-gradient-to-b from-blue-500 to-indigo-600">
      <header className="ps-3 p-5">
        <div className="text-4xl text-left">
          <SocketLogo />
        </div>
      </header>

      <h1 className="m-5 text-lg font-semibold">Users</h1>
      <div className="users ms-3 mb-3 space-y-1 h-[calc(100dvh-180px)] overflow-y-auto">
        {users.map((user) => (
          <User
            user={user}
            key={user.userID}
            selected={selectedUser === user}
            onSelect={() => handleSelectUser(user)}
          />
        ))}
      </div>
    </aside>
  );
};

export default Users;
