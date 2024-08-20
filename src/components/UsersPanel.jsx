import Users from "@/components/Users";
import SocketLogo from "@/components/SocketLogo";

const UsersPanel = ({ users, setUsers, selectedUser, setSelectedUser }) => {
  return (
    <aside className="h-screen text-white w-72 bg-gradient-to-b from-blue-500 to-indigo-600">
      <header className="ps-3 p-5">
        <div className="text-4xl text-left">
          <SocketLogo />
        </div>
      </header>

      <Users
        users={users}
        setUsers={setUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </aside>
  );
};

export default UsersPanel;
