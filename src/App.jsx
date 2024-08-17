import { useState } from "react";
import Chat from "./Chat";
import SelectUsername from "./SelectUsername";
import VercelIcon from "./components/icons/VercelIcon";

const App = () => {
  const [username, setUsername] = useState("John");
  const [userSelected, setUserSelected] = useState(false);

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
        <a href="http://github.com/" title="Visit Repository on Github">
          <div
            i-simple-icons:github=""
            className="text-gray-800 text-lg transition duration-300 hover:text-gray-900"
          ></div>
        </a>
      </div>
    </div>
  );
};

export default App;
