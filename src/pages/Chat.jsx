import { useEffect } from "react";
import { socket } from "@/socket";
import { useAppDispatch } from "@/app/hooks";
import { connectUser, disconnectUser, setUsers } from "@/redux/usersSlice";

import Layout from "@/components/Layout";
import Fallback from "@/components/Fallback";
import UsersPanel from "@/components/users/UsersPanel";
import MessagePanel from "@/components/MessagePanel";

const Chat = () => {
  const dispatch = useAppDispatch();

  const initReactiveProperties = (user) => ({
    ...user,
    connected: user.connected,
    self: user.userID === socket.userID,
    messages: [],
    hasNewMessages: false,
  });

  useEffect(() => {
    socket.on("users", (users) => {
      const initUsers = users.map(initReactiveProperties);
      dispatch(setUsers(initUsers));
    });

    socket.on("user connected", (user) => {
      dispatch(connectUser({ ...user, ...initReactiveProperties(user) }));
    });

    socket.on("user disconnected", (id) => {
      dispatch(disconnectUser(id));
    });
  }, []);

  return (
    <Layout>
      <UsersPanel />
      <MessagePanel />
      <Fallback />
    </Layout>
  );
};

export default Chat;
