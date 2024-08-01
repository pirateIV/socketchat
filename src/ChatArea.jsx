import { socket } from "./socket";
import { useEffect, useState } from "react";

const ChatArea = () => {
  const [activity, setActivity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("user joined", ({ username, numUsers }) => {
      setMessage(`${username} joined`);
      console.log(`${username} joined`);
    });
  }, [socket]);

  let activityTimer;

  useEffect(() => {
    const handleActivity = (name) => {
      setActivity(`${name} is typing...`);

      // clear an exisiting timer before setting a new one
      if (activityTimer) {
        clearInterval(activityTimer);
      }

      activityTimer = setInterval(() => {
        setActivity("");
      }, 1000);
    };

    socket.on("activity", (name) => {
      handleActivity(name);
    });

    return () => {
      clearTimeout(activityTimer);
      socket.off("activity", handleActivity);
    };
  }, []);

  return (
    <div className="h-40 flex-auto overflow-y-auto bg-black/30">
      <div className="p-5 text-center">
        {activity && (
          <div id="activity" className="bg-white p-3 text-sm">
            {activity}
          </div>
        )}
      </div>
      {message && <div className="bg-white p-3 text-sm">Wale Joined</div>}
    </div>
  );
};

export default ChatArea;
