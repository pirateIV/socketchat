import { useEffect, useState } from "react";
import { socket } from "./socket";

const ChatArea = ({ users, selectedUser }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {}, []);

  const handleOnMessage = (e, content) => {
    e.preventDefault();

    if (selectedUser) {
      socket.emit("private message", {
        content,
        to: selectedUser.userID,
      });
      selectedUser.messages.push({ content, fromSelf: true });
      console.log(selectedUser);
    }
  };
  return (
    <>
      <div className="h-40 flex-auto overflow-y-auto bg-black/30">
        <div className="p-5 text-center"></div>
      </div>
      <footer className="bg-black/30 p-3">
        <form onSubmit={(e) => handleOnMessage(e, message)}>
          <div className="flex items-end gap-3">
            <label htmlFor="chat_message" className="sr-only">
              Send Message
            </label>
            <textarea
              rows="4"
              maxLength="2000"
              autoCorrect="true"
              placeholder="Send a message..."
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border h-auto overflow-y-auto text-sm overflow-hidden border-gray-400 p-3 rounded-md outline-none focus:border-gray-400 shadow-sm"
            ></textarea>
            <div className="controls">
              <button
                title="Send"
                type="submit"
                className="p-4 rounded-md bg-white hover:bg-gray-300 shadow-sm disabled:cursor-not-allowed"
              >
                <div i-send-msg="true"></div>
              </button>
            </div>
          </div>
        </form>
      </footer>
    </>
  );
};

export default ChatArea;
