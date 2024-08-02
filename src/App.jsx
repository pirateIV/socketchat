import { socket } from "./socket";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TheFooter from "./TheFooter";
import ChatArea from "./ChatArea";
import LoginDialog from "./login";
import { Toaster } from "./components/ui/toaster";
import { useEffect, useState } from "react";
import SocketLogo from "./SocketLogo";

const App = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
        initReactiveProperties(user);
      });

      // put the current user first, and then sort by username
      setAllUsers(
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
      setAllUsers([...allUsers, user]);
    });
  }, [socket]);

  const initReactiveProperties = (user) => {
    user.connected = true;
    user.messages = [];
    user.hasNewMessages = false;
  };

  window.addEventListener("keydown", (e) => {
    if (!e.target.matches("textarea")) {
      if (e.key === "d") {
        socket.disconnect();
      } else if (e.key === "c") {
        socket.connect();
      }
    }
  });

  return (
    <>
      <div className="grid grid-cols-auto-1fr h-full">
        <Sidebar
          allUsers={allUsers}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        {selectedUser ? (
          <div className="bg-cover bg-chat-bg">
            <div className="flex flex-col h-full justify-between">
              <Header />
              <ChatArea />
              <TheFooter />
            </div>
          </div>
        ) : (
          <SocketLogo />
        )}
        <LoginDialog />
      </div>
      <Toaster className="bg-purple-950" />
    </>
  );
};

export default App;
