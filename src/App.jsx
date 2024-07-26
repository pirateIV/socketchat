import { socket } from "./socket";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TheFooter from "./TheFooter";
import { useEffect, useState } from "react";

const App = () => {
  const [activity, setActivity] = useState("");

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
      <div className="grid grid-cols-[auto,1fr] h-full">
        <Sidebar />
        <div className="bg-cover bg-[url('./assets/messaging-bg.webp')]">
          <div className="flex flex-col h-full justify-between">
            <Header />
            <div className="h-40 flex-auto overflow-y-auto bg-black/30">
              <div className="p-5 text-center">
                {activity && (
                  <div id="activity" className="bg-white p-3 text-sm">
                    {activity}
                  </div>
                )}
              </div>
            </div>
            <TheFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
