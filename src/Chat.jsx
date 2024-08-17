import Users from "@/Users";
import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user/UserAvatar";
import UserStatus from "@/components/user/UserStatus";
import { twMerge } from "tailwind-merge";
import VercelIcon from "./components/icons/VercelIcon";

// Dummy users data
const dummyUsers = [
  {
    userID: 1,
    self: false,
    username: "Alice",
    messages: [],
    hasNewMessages: true,
    connected: true,
    imgSrc: "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
  },
  {
    userID: 2,
    self: false,
    username: "Bob",
    messages: [],
    hasNewMessages: false,
    connected: true,
    imgSrc: "",
  },
  {
    userID: 3,
    self: false,
    username: "Charlie",
    messages: [],
    hasNewMessages: false,
    connected: false,
    imgSrc: "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
  },
  {
    userID: 4,
    self: false,
    username: "David",
    messages: [],
    hasNewMessages: true,
    connected: true,
    imgSrc: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
  },
];

const Chat = () => {
  const [users, setUsers] = useState([...dummyUsers]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  const initReactiveProperties = (user) => {
    user.connected = true;
    user.messages = [];
    user.hasNewMessages = false;
  };

  useEffect(() => {
    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = socket.id === user.userID;
        initReactiveProperties(user);
      });
      setUsers((prevUsers) => [...prevUsers, ...users]);
    });

    socket.on("user connected", (user) => {
      initReactiveProperties(user);
      setUsers((prevUsers) => [...prevUsers, user]);
    });

    socket.on("user disconnected", (id) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.userID === id) {
            user.connected = false;
            return user;
          }
          return user;
        }),
      );
    });
  }, [socket]);

  const handlePrivateMessage = (e) => {
    e.preventDefault();
    console.log("form submitted...", message);
    setMessage("");
    // ...
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePrivateMessage(e);
    }
  };

  const { username, connected, self, messages, imgSrc, hasNewMessages } =
    selectedUser || {};
  const usersProps = { users, selectedUser, setSelectedUser };

  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-auto-1fr">
        <Users {...usersProps} />
        {selectedUser && (
          <div className="flex-1 bg-gray-600 p-5">
            <header className="selected-user-header bg-white shadow-black shadow-sm rounded-md p-4 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <UserAvatar
                  size="lg"
                  fontSize="lg"
                  imgSrc={imgSrc}
                  username={username}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {username}&nbsp;
                  <strong className="text-sm text-gray-400">
                    {self ? "(Yourself)" : ""}
                  </strong>
                </h3>
                <UserStatus
                  connected={connected}
                  hasNewMessages={hasNewMessages}
                />
              </div>
            </header>

            <section>
              <div className="mt-5">
                <form
                  onSubmit={handlePrivateMessage}
                  className="flex flex-col items-end gap-3 justify-end"
                >
                  <textarea
                    value={message}
                    autoFocus={true}
                    onKeyDown={handleKeydown}
                    onChange={(e) => setMessage(e.target.value)}
                    className={twMerge([
                      "w-full rounded-md border border-gray-200 transition duration-500",
                      "p-5 text-sm outline-none focus:ring-2 focus:ring-blue-500",
                    ])}
                  ></textarea>
                  <Button
                    title="submit"
                    disabled={!message}
                    className="bg-blue-500 disabled:bg-gray-400"
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default Chat;
