import { useEffect, useState } from "react";

import { socket } from "@/socket";
import {
  setMessagesPerUser,
  setSelectedUserMessages,
} from "@/redux/usersSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import UserStatus from "@/components/users/UserStatus";
import UserAvatar from "@/components/custom-ui/UserAvatar";
import InputIcon from "@/components/custom-ui/inputButton";
import { cn } from "@/lib/utils";

const MessagePanel = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector(({ user }) => user);

  const { username, connected, self, imgSrc, messages, hasNewMessages } =
    selectedUser || {};

  const [message, setMessage] = useState("");
  console.log(messages);

  // const handleKeydown = (e) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     handlePrivateMessage(e);
  //   }
  // };

  const handlePrivateMessage = (e) => {
    e.preventDefault();
    dispatch(
      setSelectedUserMessages({
        message,
        from: socket.userID,
        fromSelf: true,
      }),
    );
    socket.emit("private message", { message, to: selectedUser.userID });
  };

  useEffect(() => {
    socket.on("private message", (message) => {
      dispatch(setMessagesPerUser(message));
      console.log(message);
    });
  }, []);

  const displaySender = (messages, index) => {
    const currentMessage = messages[index];
    const previousMessage = messages[index - 1];

    if (index === 0 || currentMessage.fromSelf !== previousMessage.fromSelf) {
      return true;
    }
    return false;
  };

  return (
    <>
      {selectedUser.username && (
        <div className="bg-chat-bg bg-cover h-screen">
          <div className="flex flex-col justify-between bg-gradient-to-b h-full from-black/70 to-black/90 p-5">
            <header className="selected-user-header shadow-black shadow-sm rounded-md p-4 flex items-center space-x-4">
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

            <section className="flex-auto pt-3 h-40 overflow-x-hidden overflow-y-scroll">
              <ul className="messages">
                {messages?.map((msg, index) => (
                  <li
                    key={index}
                    className={cn(
                      "chat [column-gap:6px]",
                      msg.fromSelf ? "chat-end" : "chat-start",
                      !displaySender(messages, index) && "ml-9",
                    )}
                  >
                    <div className="chat-image avatar">
                      <div className="flex items-center justify-center !overflow-visible">
                        {displaySender(messages, index) && !msg.fromSelf && (
                          <div className={cn("-translate-y-3.5")}>
                            <UserAvatar
                              username={username}
                              showConnection={false}
                              fontSize="sm"
                              size="sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="chat-bubble relative pb-4 rounded-md text-sm text-white bg-slate-700 shadow-gray-800/60 shadow-sm">
                      {!msg.fromSelf && (
                        <span className="absolute top-1 left-3 font-medium text-[11px] text-yellow-400 cursor-pointer hover:underline">
                          {username}
                        </span>
                      )}
                      <div className={cn("pe-14", !msg.fromSelf && "pt-3.5")}>
                        {msg.message}
                      </div>
                      <time className="absolute text-[10px] bottom-0.5 right-3 opacity-70">
                        00:00
                      </time>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="mt-5">
                <form
                  onSubmit={(e) => handlePrivateMessage(e)}
                  className="relative flex flex-col items-end gap-3 justify-end"
                >
                  {/* <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    className="block w-full text-white p-3"
                    id=""
                  ></textarea> */}
                  {
                    <textarea
                      rows="4"
                      value={message}
                      autoFocus={true}
                      autoComplete="true"
                      // onKeyDown={handleKeydown}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Message ${self ? "Yourself" : username}...`}
                      className={cn(
                        "w-full text-sm text-white p-5 rounded-md transition duration-500 outline-none resize-none",
                        "bg-gradient-to-b from-[#636261] to-[#555] border-t !border-t-gray-400 !bg-white border border-transparent focus:border-blue-500",
                      )}
                    ></textarea>
                  }

                  <div className="absolute bottom-3 right-4 flex items-center gap-3 flex-row-reverse divide-x-reverse divide-x">
                    <InputIcon
                      type="submit"
                      icon-send-msg-fill=""
                      disabled={!message.trim()}
                      title="Send Message"
                      aria-label="Send Message"
                      className="disabled:opacity-70 disabled:text-white disabled:bg-white text-blue-500"
                    />

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
