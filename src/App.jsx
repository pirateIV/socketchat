import { socket } from "./socket";
import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import LoginDialog from "./login";
import GridContainer from "./GridContainer";
import ChatContainer from "./ChatContainer";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const sidebarProps = { users, selectedUser, setSelectedUser };

  useEffect(() => {
    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
        initReactiveProperties(user);
      });

      // put the current user first, and then sort by username
      setUsers(
        users.sort((a, b) => {
          if (a.self) return -1;
          if (b.self) return 1;
          if (a.username < b.username) return -1;
          return a.username > b.username ? 1 : 0;
        }),
      );
    });

    socket.on("user connected", (user) => {
      initReactiveProperties(user);
      setUsers((prevUsers) => [...prevUsers, user]);
    });
  }, [socket]);

  const initReactiveProperties = (user) => {
    user.connected = true;
    user.messages = [];
    user.hasNewMessages = false;
  };

  return (
    <ChatContainer>
      <Sidebar {...sidebarProps} />
      <GridContainer users={users} selectedUser={selectedUser}>
        <Header />
        <ChatArea />
      </GridContainer>
      <LoginDialog />
    </ChatContainer>
  );
};

export default App;
