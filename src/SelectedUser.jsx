import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { socket } from "@/socket";
import UserAvatar from "@/components/user/UserAvatar";
import UserStatus from "@/components/user/UserStatus";

const SelectedUser = ({ selectedUser, users, setUsers }) => {
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
      return currentMessage.fromSelf ? "Yourself" : sender.username;
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
    socket.on("private message", ({ message, from }) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.userID === from) {
            user.messages.push({
              message,
              fromSelf: user.userID !== from,
            });
            if (user !== selectedUser) {
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
        <div className="bg-chat-bg bg-cover">
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
                    <div className="chat-image avatar">
                      <div className="flex items-center justify-center">
                        <div
                          className={
                            !displaySender(messages, i) ? "opacity-0" : null
                          }
                        >
                          <UserAvatar
                            username={msg.fromSelf ? sender.username : username}
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
                    <div className="chat-bubble text-sm text-white bg-blue-500">
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
                  className="flex flex-col items-end gap-3 justify-end"
                >
                  <textarea
                    value={message}
                    autoFocus={true}
                    onKeyDown={handleKeydown}
                    rows="4"
                    placeholder={`Message ${self ? "Yourself" : username}`}
                    onChange={(e) => setMessage(e.target.value)}
                    className={twMerge([
                      "w-full rounded-md border border-gray-200 transition duration-500 resize-none",
                      "p-5 text-sm bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    ])}
                  ></textarea>
                  <button
                    title="submit"
                    disabled={!message}
                    className="sr-only"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedUser;
