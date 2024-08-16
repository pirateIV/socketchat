import { socket } from "../socket";
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

  const initReactiveProperties = (user) => {
    user.connected = true;
    user.messages = [];
    user.hasNewMessages = false;
  };

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

    socket.on("session", ({ sessionID, userID }) => {
      // attatch the sessionID to the next reconnection attempt
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      socket.userID = userID;
    });

    socket.on("private message", ({ content, from, to }) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          const fromSelf = socket.userID === from;
          if (user.userID === fromSelf ? to : from) {
            user.messages.push({
              content,
              fromSelf,
            });
            if (user !== selectedUser) {
              user.hasNewMessages = true;
            }
            return user;
          }
          return user;
        }),
      );
    });

    socket.on("user connected", (user) => {
      initReactiveProperties(user);
      setUsers((prevUsers) => [...prevUsers, user]);
    });

    socket.on("disconnect", () => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.self) {
            user.connected = false;
            return user;
          }
          return user;
        }),
      );
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

    return () => {
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
      socket.off("private message");
      socket.off("connnect");
      socket.off("disconnect");
    };
  }, [socket]);

  // window.addEventListener("keypress", (e) => {
  //   if (e.target.matches("textarea")) return;

  //   if (e.key === "c") socket.connect();
  //   if (e.key === "d") socket.disconnect();
  // });

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
