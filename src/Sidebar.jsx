import User from "./User";

const Sidebar = () => {
  return (
    <aside className="h-full w-64 bg-gradient-to-b from-purple-950/90 to-purple-950 border-r-2 border-purple-500 text-white">
      <header className="text-3xl p-3 h-24">
        <div i-socket-logo="true"></div>
      </header>

      <div className="flex flex-col h-[calc(100vh-6rem)] overflow-auto gap-0">
        <User />
      </div>
    </aside>
  );
};

export default Sidebar;
