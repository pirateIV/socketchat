import { useState } from "react";
import SocketLogo from "./SocketLogo";
import User from "./User";
import UserAvatar from "./components/user/UserAvatar";
import UserStatus from "./components/user/UserStatus";

// Dummy users data
const dummyUsers = [
  {
    id: 1,
    self: false,
    name: "Alice",
    messages: [],
    hasNewMessages: true,
    connected: true,
    imgSrc: "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
  },
  {
    id: 2,
    self: true,
    name: "Bob",
    messages: [],
    hasNewMessages: false,
    connected: true,
    imgSrc: "",
  },
  {
    id: 3,
    self: false,
    name: "Charlie",
    messages: [],
    hasNewMessages: false,
    connected: false,
    imgSrc: "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
  },
  {
    id: 4,
    self: false,
    name: "David",
    messages: [],
    hasNewMessages: true,
    connected: true,
    imgSrc: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
  },
];

const Chat = () => {
  const [users, setUsers] = useState([...dummyUsers]);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-auto-1fr">
        <aside className="h-screen text-white w-72 bg-gradient-to-b from-blue-500 to-indigo-600">
          <header className="p-5">
            <div className="text-4xl text-left">
              <SocketLogo />
            </div>
          </header>
          <h1 className="m-5 text-lg font-semibold">Users</h1>
          <div className="users ms-3 me-1 mb-3 space-y-1 h-96 overflow-y-auto">
            {users.map((user) => (
              <User
                user={user}
                key={user.id}
                selected={selectedUser === user}
                onSelect={() => setSelectedUser(user)}
              />
            ))}
          </div>
        </aside>
        {selectedUser && (
          <div className="flex-1 bg-gray-100 p-5">
            <header className="selected-user-header bg-white shadow-black shadow-sm rounded-md p-4 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <UserAvatar
                  size="lg"
                  fontSize="lg"
                  name={selectedUser.name}
                  imgSrc={selectedUser.imgSrc}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedUser.name}
                </h3>
                <UserStatus user={selectedUser} />
              </div>
            </header>
          </div>
        )}
      </div>
    </main>
  );
};

export default Chat;
