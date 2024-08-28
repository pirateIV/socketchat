import { useEffect } from "react";
import { socket } from "@/socket";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "@/redux/usersSlice";

import Layout from "@/components/Layout";
import Fallback from "@/components/Fallback";
import MessagePanel from "@/components/MessagePanel";
import UsersPanel from "@/components/users/UsersPanel";

const Chat = () => {
  const dispatch = useDispatch();
  const { users, userSelected } = useSelector(({ user }) => user);

  const initReactiveProperties = (user) => {
    user.connected = user.connected;
    user.messages = [];
    user.hasNewMessages = false;
  };

  useEffect(() => {
    const handleUsers = (users) => {
      users = users.map((user) => ({
        ...user,
        self: user.userID === socket.userID,
        ...initReactiveProperties(user),
      }));

      dispatch(
        setUsers(
          users.sort((a, b) => {
            if (a.self) return -1;
            if (b.self) return 1;
            return a.username.localeCompare(b.username);
          }),
        ),
      );
    };

    const handleUserConnection = (user) => {
      initReactiveProperties(user);
      const exisitingUser = users.find((u) => u.userID === user.userID);

      if (!exisitingUser) {
        dispatch(setUsers([...users, user]));
        return;
      }
      dispatch(
        setUsers(
          users.map((u) => {
            if (u.userID === user.userID) {
              return { ...user, connected: user.connected };
            }
            return { ...u };
          }),
        ),
      );
    };
    const handleUserDisconnection = (id) => {
      dispatch(
        setUsers(
          users.map((user) => {
            if (user.userID === id) {
              return { ...user, connected: false };
            }
            return user;
          }),
        ),
      );
    };

    socket.on("users", handleUsers);
    socket.on("user connected", handleUserConnection);
    socket.on("user disconnected", handleUserDisconnection);

    return () => {
      socket.off("users");
      socket.off("user connected");
      socket.off("user disconnected");
    };
  }, [dispatch, users]);

  if (!userSelected) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Layout>
      <UsersPanel />
      <MessagePanel />
      <Fallback />
    </Layout>
  );
};

export default Chat;
