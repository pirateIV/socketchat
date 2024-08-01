import { socket } from "./socket";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TheFooter from "./TheFooter";
import ChatArea from "./ChatArea";
import LoginDialog from "./login";
import { Toaster } from "./components/ui/toaster";

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
      <div className="grid grid-cols-auto-1fr h-full">
        <Sidebar />
        <div className="bg-cover bg-chat-bg">
          <div className="flex flex-col h-full justify-between">
            <Header />
            <ChatArea />
            <TheFooter />
          </div>
        </div>
        <LoginDialog />
      </div>
      <Toaster className="bg-purple-950" />
    </>
  );
};

export default App;
