import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { cn } from "@/lib/utils";
import Chat from "@/pages/Chat";
import VercelIcon from "@/components/icons/VercelIcon";
import SelectUsername from "@/pages/SelectUsername";
import { useDispatch, useSelector } from "react-redux";
import { setUserSelected } from "./redux/usersSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userSelected } = useAppSelector(({ user }) => user);

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");

    if (sessionID) {
      dispatch(setUserSelected(true));
      socket.auth = { sessionID };
      socket.connect();
    } else {
      navigate("/auth", { replace: true });
    }

    socket.on("session", ({ sessionID, userID }) => {
      // attach the session to the next reconnection attempt
      socket.auth = { sessionID };
      localStorage.setItem("sessionID", sessionID);
      socket.userID = userID;
    });

    socket.on("connect_error", (err) => {
      if (err.message === "Invalid username") {
        dispatch(setUserSelected(false));
        navigate("/auth", { replace: true });
      }
    });

    return () => {
      socket.off("connect_error");
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    if (userSelected) {
      navigate("/chat", { replace: true });
    } else {
      navigate("/auth", { replace: true });
    }
  }, [userSelected, navigate]);

  return <Outlet />;
};

export default App;
