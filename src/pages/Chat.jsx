import { useEffect } from "react";
import { socket } from "@/socket";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectUser, disconnectUser, setUsers } from "@/redux/usersSlice";

import Layout from "@/components/Layout";
import Fallback from "@/components/Fallback";
import UsersPanel from "@/components/users/UsersPanel";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import MessagePanel from "@/components/MessagePanel";

const Chat = () => {
  const dispatch = useAppDispatch();
  const { users, selectedUser } = useAppSelector(({ user }) => user);

  const initReactiveProperties = (user) => ({
    ...user,
    connected: user.connected,
    messages: [],
    hasNewMessages: false,
  });

  useEffect(() => {
    socket.on("users", (users) => {
      dispatch(setUsers(users.map(initReactiveProperties)));
    });

    socket.on("user connected", (user) => {
      dispatch(connectUser(user));
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
