import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { socket } from "@/socket";
import { setSelectedUser, setUsers } from "@/redux/usersSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import UserAvatar from "@/components/custom-ui/UserAvatar";
import UserStatus from "@/components/users/UserStatus";
import InputIcon from "@/components/custom-ui/inputButton";

const MessagePanel = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();
  const { users, selectedUser } = useAppSelector(({ user }) => user);

  const {
    userID,
    username,
    connected,
    self,
    messages,
    imgSrc,
    hasNewMessages,
  } = selectedUser || {};
  // const {selectedUser} =

  const [message, setMessage] = useState("");

  const handleKeydown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePrivateMessage(e);
    }
  };

  const sender = users.find((user) => user.self === true && user);
  console.log(sender);
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

    if (!message.trim()) return;

    if (selectedUser) {
      socket.emit("private message", {
        message,
        to: userID,
      });
      // messages.push({ message, fromSelf: true });
      dispatch(
        setSelectedUser({
          ...selectedUser,
          messages: [...messages, { message, fromSelf: true }],
        }),
      );
      setMessage("");
    }
  };

  // const handleNewMessages = (user) => {};

  console.log(users);
  useEffect(() => {
    socket.on("private message", ({ message, from, to }) => {
      console.log({ message, from, to });
      console.log(
        users.map((user) => {
          const fromSelf = socket.userID === from;
          if (user.userID === fromSelf ? to : from) {
            return {
              ...user,
              messages: [...user.messages, { message, fromSelf }],
              hasNewMessages: user.userID !== selectedUser?.userID,
            };
          }
          return user;
        }),
      );
    });
  }, [socket]);

  return (
    <>
      {selectedUser && (
        <div className="bg-chat-bg bg-cover h-screen">
          <div className="flex flex-col justify-between bg-gradient-to-b h-full from-black/70 to-black/90 p-5">
            <header className="selected-user-header bg-white shadow-black shadow-sm rounded-md p-4 flex items-center space-x-4">
              <button
                icon-hamburger-menu=""
                className="block lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open Sidebar</span>
              </button>
              <div className="flex-shrink-0">
                <UserAvatar
                  size="lg"
                  fontSize="lg"
                  imgSrc={imgSrc}
                  username={username}
                  showConnection={false}
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
                            displaySender(messages, i) ? null : "opacity-0"
                          }
                        >
                          <UserAvatar
                            username={
                              !msg.fromSelf ? sender?.username : username
                            }
                            showConnection={false}
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
                    placeholder={`Message ${self ? "Yourself" : username}...`}
                    className={cn(
                      "w-full text-sm text-white p-5 rounded-md transition duration-500 outline-none resize-none",
                      "bg-gradient-to-b from-[#636261] to-[#555] border-t !border-t-gray-400 !bg-white border border-transparent focus:border-blue-500",
                    )}
                  ></textarea>

                  <div className="absolute bottom-3 right-4 flex items-center gap-3 flex-row-reverse divide-x-reverse divide-x">
                    {!message.trim() ? (
                      <InputIcon
                        type="submit"
                        icon-send-msg=""
                        disabled={!message.trim()}
                        title="Message must not be empty"
                        aria-label="Message must not be empty"
                        className="disabled:opacity-70 disabled:text-white disabled:bg-white text-blue-500"
                      />
                    ) : (
                      <InputIcon
                        type="submit"
                        icon-send-msg-fill=""
                        disabled={!message.trim()}
                        title="Send Message"
                        aria-label="Send Message"
                        className="disabled:opacity-70 disabled:text-white disabled:bg-white text-blue-500"
                      />
                    )}

                    <div className="flex items-center gap-3 space-x-reverse space-x-3">
                      <InputIcon
                        type="button"
                        title="add image"
                        icon-add-image=""
                        aria-label="Add Image"
                      />

                      <InputIcon
                        type="button"
                        title="record voice message"
                        icon-microphone=""
                        aria-label="Record Voice Message"
                      />
                    </div>
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
