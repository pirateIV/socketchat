import UserAvatar from "./components/user/UserAvatar";
import UserStatus from "./components/user/UserStatus";

const User = ({ user, selected, onSelect }) => {
  return (
    <a
      title={user.name}
      onClick={onSelect}
      className={`user transition-all duration-500 ${selected ? "selected" : ""}`}
    >
      <div className="flex items-center ms-3 gap-1.5">
        <UserAvatar name={user.name} imgSrc={user.imgSrc} />
        <div className="px-2 py-3">
          <div className="user-name text-white">{user.name}</div>
          <UserStatus user={user} />
        </div>
      </div>
    </a>
  );
};

export default User;
