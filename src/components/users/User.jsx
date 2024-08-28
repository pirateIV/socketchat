import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { cn } from "@/lib/utils";

import Username from "./Username";
import UserAvatar from "../custom-ui/UserAvatar";
import UserStatus from "./UserStatus";

const User = ({ user, selected, onSelect }) => {
  const {
    username,
    userID,
    self,
    imgSrc,
    connected,
    hasNewMessages,
    unreadMessages,
  } = user;

  const avatarProps = { connected, username, imgSrc };
  const statusProps = { connected, hasNewMessages, unreadMessages, userID };

  return (
    <Link
      className={cn(
        selected ? "selected" : "",
        "user me-1.5 transition-all duration-500",
      )}
      title={username}
      onClick={onSelect}
      aria-label={`select ${username}`}
    >
      <div className="flex items-center ms-3 gap-1.5">
        <UserAvatar {...avatarProps} />

        <div className="px-2 py-3">
          <Username self={self} username={username} />
          <UserStatus {...statusProps} />
        </div>
      </div>
    </Link>
  );
};

export default User;
