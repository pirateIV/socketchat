import { cn } from "@/lib/utils";
import UserAvatar from "./user/UserAvatar";
import UserStatus from "./user/UserStatus";

const User = ({ user, selected, onSelect }) => {
  const { username, self, imgSrc, connected, hasNewMessages, unreadMessages } =
    user;

  return (
    <a
      id="user"
      title={username}
      onClick={onSelect}
      aria-label={`select ${username}`}
      className={cn(
        selected ? "selected" : "",
        "user me-1.5 transition-all duration-500",
      )}
    >
      <div className="flex items-center ms-3 gap-1.5">
        <UserAvatar username={username} imgSrc={imgSrc} />

        <div className="px-2 py-3">
          <div className="user-name text-white">
            {username}&nbsp;
            <strong className="!text-sm font-gentium text-gray-200">
              {self ? "(Yourself)" : ""}
            </strong>
          </div>

          <UserStatus
            connected={connected}
            hasNewMessages={hasNewMessages}
            unreadMessages={unreadMessages}
          />
        </div>
      </div>
    </a>
  );
};

export default User;
