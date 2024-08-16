const Header = ({ selectedUser }) => {
  return (
    <header>
      <div className="bg-white h-24 p-3 shadow-sm shadow-black/30 border-b-2 border-purple-500">
        <div>
          <h3 className="text-3xl">{selectedUser.username}</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
