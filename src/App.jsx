import { socket } from "./socket";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TheFooter from "./TheFooter";

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
        <div className="bg-cover bg-[url('messaging-bg.webp')]">
          <div className="flex flex-col h-full justify-between">
            <Header />
            <div className="h-40 flex-auto overflow-y-auto bg-black/30">
              <div className="p-5"></div>
            </div>
            <TheFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
