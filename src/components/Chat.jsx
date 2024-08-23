import { useEffect, useState } from "react";
import { socket } from "@/socket";
import Layout from "@/components/Layout";
import UsersPanel from "@/components/UsersPanel";
import MessagePanel from "@/components/MessagePanel";

// Dummy users data
// const dummyUsers = [
//   {
//     userID: 1,
//     self: false,
//     username: "Alice",
//     connected: true,
//     messages: [],
//     hasNewMessages: true,
//     unreadMessages: 0,
//     imgSrc: "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
//   },
//   {
//     userID: 2,
//     self: false,
//     username: "Bob",
//     connected: true,
//     messages: [],
//     hasNewMessages: false,
//     unreadMessages: 0,
//     imgSrc: "",
//   },
//   {
//     userID: 3,
//     self: false,
//     username: "Charlie",
//     connected: false,
//     messages: [],
//     hasNewMessages: false,
//     unreadMessages: 0,
//     imgSrc: "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
//   },
//   {
//     userID: 4,
//     self: false,
//     username: "David",
//     connected: true,
//     messages: [],
//     hasNewMessages: true,
//     unreadMessages: 0,
//     imgSrc: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
//   },
// ];

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const initReactiveProperties = (user) => {
    user.connected = true;
    user.messages = [];
    user.hasNewMessages = false;
  };

  useEffect(() => {
    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.userID;
        initReactiveProperties(user);
      });

      setUsers(
        users.sort((a, b) => {
          if (a.self) return -1;
          if (b.self) return 1;
          // if (a.username < b.username) return -1;
          // return a.username > b.username ? 1 : 0;
          return a.username.localeCompare(b.username);
        }),
      );
    });

    socket.on("user connected", (user) => {
      initReactiveProperties(user);
      setUsers((prevUsers) => {
        const existingUser = prevUsers.find((u) => u.userID === user.userID);
        if (existingUser) {
          existingUser.connected = true;
          return [...prevUsers];
        }
        return [...prevUsers, user];
      });
    });

    socket.on("user disconnected", (id) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.userID === id) {
            return { ...user, connected: false };
          }
          return user;
        }),
      );
    });
  }, [socket]);

  return (
    <Layout>
      <UsersPanel
        users={users}
        setUsers={setUsers}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <MessagePanel
        users={users}
        setUsers={setUsers}
        selectedUser={selectedUser}
      />
    </Layout>
  );
};

export default Chat;
