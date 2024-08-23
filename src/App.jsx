import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { cn } from "@/lib/utils";
import Chat from "@/components/Chat";
import VercelIcon from "@/components/icons/VercelIcon";
import SelectUsername from "@/components/SelectUsername";

const App = () => {
  const [username, setUsername] = useState("");
  const [userSelected, setUserSelected] = useState(false);

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");

    if (sessionID) {
      setUserSelected(true);
      socket.auth = { sessionID };
      socket.connect();
    }

    socket.on("session", ({ sessionID, userID }) => {
      // attach the session to the next reconnection attempt
      socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      socket.userID = userID;
    });

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

      <div className="flex w-full absolute items-center gap-3 bottom-7">
        <div
          className={cn(
            "flex items-center gap-3 transition duration-300",
            !userSelected ? "translate-x-[calc(98vw-100%)]" : "translate-x-10",
          )}
        >
          <a href="https://vercel.com" title="Go to vercel">
            <VercelIcon />
          </a>

          <a
            title="Visit Repository on Github"
            href="https://github.com/pirateIV/socketchat"
          >
            <div
              className={cn(
                // userSelected ? "text-gray-800" : "text-white",
                "text-lg text-white  transition duration-300 hover:scale-125",
              )}
              i-simple-icons:github=""
            ></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
