import Users from "@/components/Users";
import SocketLogo from "@/components/SocketLogo";
import { cn } from "@/lib/utils";

const UsersPanel = ({
  users,
  isOpen,
  setIsOpen,
  setUsers,
  selectedUser,
  setSelectedUser,
}) => {
  return (
    <aside
      className={cn(
        isOpen ? "translate-x-0" : "-translate-x-full",
        "h-screen lg:block fixed inset-y-0 left-0 transition duration-300  lg:static z-20 text-white w-72 bg-gradient-to-b from-blue-500 to-indigo-600 lg:translate-x-0",
      )}
    >
      <header className="relative ps-3 p-5">
        <div className="text-4xl text-left">
          <SocketLogo />
          <button
            type="button"
            icon-close-x=""
            onClick={() => setIsOpen(false)}
            className="absolute lg:hidden z-30 top-8 right-5 w-3 h-3 flex items-center justify-center text-white hover:text-slate-200"
          >
            <span className="sr-only">Close Sidebar</span>
          </button>
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
