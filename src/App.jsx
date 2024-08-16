import { useState } from "react";
import Chat from "./Chat";
import SelectUsername from "./SelectUsername";

const App = () => {
  const [username, setUsername] = useState("");
  const [userSelected, setUserSelected] = useState(false);

  return (
    <div className="app">
      {userSelected ? (
        <Chat />
      ) : (
        <SelectUsername
          username={username}
          setUsername={setUsername}
          setUserSelected={setUserSelected}
        />
      )}
    </div>
  );
};

export default App;
