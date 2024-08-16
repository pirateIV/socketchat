import { useEffect, useState } from "react";
import { socket } from "../socket";

const ChatArea = ({ users, selectedUser }) => {
  const [message, setMessage] = useState("");

  const handleOnMessage = (e, content) => {
    e.preventDefault();

    if (selectedUser) {
      socket.emit("private message", {
        content,
        to: selectedUser.userID,
      });
      selectedUser.messages.push({ content, fromSelf: true });
      setMessage("");
    }
  };

  const displaySender = (messages, index) => {
    const currentMessage = messages[index];
    const previousMessage = messages[index - 1];
    if (index === 0 || currentMessage.fromSelf !== previousMessage.fromSelf) {
      return currentMessage.fromSelf ? "(Yourself)" : selectedUser.username;
    }
    return null;
  };

  return (
    <>
      <div className="h-40 flex-auto overflow-y-auto bg-black/30">
        <div className="m-3">
          <ul className="messages">
            {selectedUser.messages.map((msg, i) => (
              <li
                key={i}
                className={`flex ${msg.fromSelf ? "text-right justify-end *:ps-12" : "text-left justify-start *:pe-10"}`}
              >
                <div className="bg-white shadow-sm shadow-black/30 py-1 px-3 my-0.5 rounded-md">
                  <dl>
                    {displaySender(selectedUser.messages, i) && (
                      <strong className="w-max text-sm font-bold">
                        {displaySender(selectedUser.messages, i)}
                      </strong>
                    )}
                  </dl>
                  <dt>{msg.content}</dt>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="bg-black/30 p-3">
        <form onSubmit={(e) => handleOnMessage(e, message)}>
          <div className="flex items-end gap-3">
            <label htmlFor="chat_message" className="sr-only">
              Send Message
            </label>
            <textarea
              rows="4"
              value={message}
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
