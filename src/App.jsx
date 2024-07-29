import { socket } from "./socket";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TheFooter from "./TheFooter";
import ChatArea from "./ChatArea";

const App = () => {
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
        <div className="hidden bg-cover bg-chatBg">
          <div className="flex flex-col h-full justify-between">
            <Header />
            <ChatArea />
            <TheFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
