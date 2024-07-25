import { useRef, useState } from "react";

const TheFooter = () => {
  const textAreaRef = useRef();
  const [chatMessage, setChatMessage] = useState("");

  return (
    <footer className="bg-black/30 p-3">
      <form>
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
            className="w-full border h-auto overflow-y-auto text-sm overflow-hidden border-gray-400 p-3 rounded-md outline-none focus:border-gray-400 shadow-sm"
          ></textarea>
          <div className="controls">
            <button
              title="Send"
              type="submit"
              disabled={chatMessage}
              className="p-4 rounded-md bg-white hover:bg-gray-300 shadow-sm"
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
