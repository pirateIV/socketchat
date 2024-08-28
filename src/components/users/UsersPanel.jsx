import { cn } from "@/lib/utils";
import { useAppSelector } from "@/app/hooks";
import Users from "@/components/users/Users";
import SocketLogo from "../SocketLogo";

const UsersPanel = ({ isOpen, setIsOpen }) => {
  const { selectedUser } = useAppSelector(({ user }) => user);

  return (
    <aside
      className={cn(
        isOpen ? "translate-x-0" : "-translate-x-full",
        "h-screen lg:block fixed inset-y-0 left-0 transition duration-300 lg:static z-20 text-white w-72 bg-gradient-to-b from-blue-500 to-indigo-600 lg:translate-x-0",
      )}
    >
      <header className="relative p-3">
        <div className="text-4xl text-left">
          <SocketLogo />
          {selectedUser && (
            <button
              type="button"
              icon-close-x=""
              onClick={() => setIsOpen(false)}
              className="absolute lg:hidden z-30 top-8 right-5 w-3 h-3 flex items-center transition duration-300 justify-center text-white hover:opacity-70"
            >
              <span className="sr-only">Close Sidebar</span>
            </button>
          )}
        </div>
      </header>

      <Users />
    </aside>
  );
};

export default UsersPanel;
