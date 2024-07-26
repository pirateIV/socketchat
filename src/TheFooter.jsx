import { useEffect, useRef, useState } from "react";
import { socket } from "./socket";

const TheFooter = () => {
  const textAreaRef = useRef();
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log(msg);
      setMessages([...messages, msg]);
    });

    socket.on("clients_list", (clientsList) => {
      console.log(clientsList);
    });

    socket.on("getCount", (clientsCount) => {
      console.log(clientsCount);
    });
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!chatMessage) return;
    socket.emit("chat message", {
      chatMessage,
      id: socket.id,
      date: new Date().getTime(),
      sentAt: new Date().toLocaleTimeString(),
    });
  };

  const emitActivity = () => {
    socket.emit("activity", socket.id);
  };

  return (
    <footer className="bg-black/30 p-3">
      <form onSubmit={sendMessage}>
        <div className="flex items-end gap-3">
          <label htmlFor="chat_message" className="sr-only">
            Send Message
          </label>
          <textarea
            rows="4"
            ref={textAreaRef}
            maxLength="2000"
            autoCorrect="true"
            name="chat_message"
            placeholder="Send a message..."
            onKeyPress={emitActivity}
            onChange={(e) => setChatMessage(e.target.value)}
            className="w-full border h-auto overflow-y-auto text-sm overflow-hidden border-gray-400 p-3 rounded-md outline-none focus:border-gray-400 shadow-sm"
          ></textarea>
          <div className="controls">
            <button
              title="Send"
              type="submit"
              disabled={!chatMessage}
              className="p-4 rounded-md bg-white hover:bg-gray-300 shadow-sm disabled:cursor-not-allowed"
            >
              <div i-send-msg="true"></div>
            </button>
          </div>
        </div>
      </form>
    </footer>
  );
};

export default TheFooter;
