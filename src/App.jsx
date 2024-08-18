import { useEffect, useState } from "react";
import Chat from "./Chat";
import SelectUsername from "./SelectUsername";
import VercelIcon from "./components/icons/VercelIcon";
import { socket } from "./socket";

const App = () => {
  const [username, setUsername] = useState("User");
  const [userSelected, setUserSelected] = useState(false);

  useEffect(() => {
    socket.on("connect_error", (err) => {
      if (err.message === "Invalid username") {
        setUserSelected(false);
      }
    });

    return () => {
      socket.off("connect_error");
    };
  }, [socket]);

  return (
    <div className="relative">
      <Chat />
      {!userSelected && (
        <SelectUsername
          username={username}
          setUsername={setUsername}
          setUserSelected={setUserSelected}
        />
      )}
      <div className="flex absolute bottom-5 right-5 items-center gap-3">
        <a href="https://vercel.com" title="Go to vercel">
        <VercelIcon />
        </a>
        <a
          href="https://github.com/pirateIV/socketchat"
          title="Visit Repository on Github"
        >
          <div
            i-simple-icons:github=""
            className={`${userSelected ? "text-gray-800" : "text-white"} text-lg transition duration-300 hover:scale-125`}
          ></div>
        </a>
      </div>
    </div>
  );
};

export default App;
