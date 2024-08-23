import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { socket } from "@/socket";
import UserAvatar from "@/components/user/UserAvatar";
import UserStatus from "@/components/user/UserStatus";

const MessagePanel = ({ selectedUser, users, setUsers }) => {
  const {
    userID,
    username,
    connected,
    self,
    messages,
    imgSrc,
    hasNewMessages,
  } = selectedUser || {};

  const [message, setMessage] = useState("");

  const handleKeydown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePrivateMessage(e);
    }
  };

  const sender = users.find((user) => user.self === true && user);
  const displaySender = (messages, index) => {
    const currentMessage = messages[index];
    const previousMessage = messages[index - 1];

    if (index === 0 || currentMessage.fromSelf !== previousMessage.fromSelf) {
      return currentMessage.fromSelf ? "(Yourself)" : sender.username;
    }
    return null;
  };

  const handlePrivateMessage = (e) => {
    e.preventDefault();

    if (selectedUser) {
      socket.emit("private message", {
        message,
        to: userID,
      });
      messages.push({ message, fromSelf: true });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("private message", ({ message, from, to }) => {
      console.log({ message, from, to });
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          const fromSelf = socket.userID === from;
          if (user.userID === (fromSelf ? to : from)) {
            user.messages.push({
              message,
              fromSelf,
              from,
            });
            if (user.userID !== userID) {
              user.hasNewMessages = true;
            }
            return { ...user };
          }
          return user;
        }),
      );
    });
  }, [socket]);

  return (
    <>
      {selectedUser && (
        <div className="bg-chat-bg bg-cover max-h-screen">
          <div className="flex flex-col justify-between bg-gradient-to-b h-full from-black/60 to-gray-900/90 p-5">
            <header className="selected-user-header bg-white shadow-black shadow-sm rounded-md p-4 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <UserAvatar
                  size="lg"
                  fontSize="lg"
                  imgSrc={imgSrc}
                  username={username}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {username}&nbsp;
                  <strong className="text-sm text-gray-400">
                    {self ? "(Yourself)" : ""}
                  </strong>
                </h3>
                <UserStatus
                  connected={connected}
                  hasNewMessages={hasNewMessages}
                />
              </div>
            </header>

            <section className="flex-auto h-40 overflow-y-auto">
              <ul className="messages">
                {messages.map((msg, i) => (
                  <li
                    key={i}
                    className={`chat ${!msg.fromSelf ? "chat-start" : "chat-end"}`}
                  >
                    <div className="chat-image avata">
                      <div className="flex items-center justify-center">
                        <div
                          className={
                            displaySender(messages, i) ? null : "opacity-0"
                          }
                        >
                          <UserAvatar
                            username={
                              !msg.fromSelf ? sender?.username : username
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="chat-header text-white">
                      {displaySender(messages, i) && (
                        <span>
                          {msg.fromSelf ? "Yourself" : username}&nbsp;
                        </span>
                      )}
                      <time className="text-xs opacity-50">00:00</time>
                    </div>
                    <div className="chat-bubble rounded-md text-sm text-white bg-blue-500 shadow-gray-800/60 shadow-sm">
                      {msg.message}
                    </div>
                    {/* <div className="chat-footer opacity-50">Delivered</div> */}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="mt-5">
                <form
                  onSubmit={handlePrivateMessage}
                  className="relative flex flex-col items-end gap-3 justify-end"
                >
                  <textarea
                    rows="4"
                    value={message}
                    autoFocus={true}
                    autoComplete="true"
                    onKeyDown={handleKeydown}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Message ${self ? "Yourself" : username}`}
                    className={cn(
                      "w-full text-sm rounded-md border border-gray-200 transition duration-500 resize-none",
                      "p-5 bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    )}
                  ></textarea>

                  <div className="absolute bottom-3 right-3">
                    <button
                      type="submit"
                      disabled={!message}
                      title="send message"
                      className={cn(
                        "inline-flex items-center justify-center h-9 w-9 ps-1 text-sm",
                        "rounded-full tranisition duration-300 text-gray-100 bg-blue-500 disabled:opacity-40",
                      )}
                    >
                      <i icon-send-msg=""></i>
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default MessagePanel;
