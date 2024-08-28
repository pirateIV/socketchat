import { socket } from "@/socket";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setUsername, setUserSelected } from "@/redux/usersSlice";
import { Input } from "@/components/ui/input";
import SocketLogoAnimate from "@/components/SocketLogoAnimate";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const SelectUsername = () => {
  const dispatch = useAppDispatch();
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const { username, userSelected } = useAppSelector(({ user }) => user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnimatingOut(true);
    socket.auth = { username };
    socket.connect();
  };

  useEffect(() => {
    if (isAnimatingOut) {
      const timer = setTimeout(() => {
        dispatch(setUserSelected(true));
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isAnimatingOut, setUserSelected]);

  const isValid = username.length > 2;

  if (userSelected) {
    return <Navigate to="/chat" replace={true} />;
  }
  return (
    <div
      id="select-username"
      className={cn(
        isAnimatingOut ? "opacity-0 scale-95" : "opacity-100 scale-100",
        "min-h-screen inset-0 flex flex-col items-center justify-center text-white",
        "transition-all duration-500 bg-gradient-to-b from-blue-500 to-indigo-600 z-50",
      )}
    >
      <SocketLogoAnimate isValid={isValid} />
      <form
        onSubmit={handleSubmit}
        className="space-y-6 shadow-lg bg-white w-80 p-6 rounded-lg"
      >
        <Input
          type="text"
          value={username}
          autoFocus={true}
          placeholder="Enter username..."
          onChange={(e) => dispatch(setUsername(e.target.value))}
          className={cn(
            "text-black px-4 py-3 w-full border border-gray-300 rounded-sm p-2",
            "focus:outline-none focus:ring-2 focus:!ring-blue-500 transition duration-300",
          )}
        />
        <button
          type="submit"
          disabled={!isValid}
          title={isValid ? "Submit" : "Username must be at least 3 characters"}
          className={cn(
            isValid ? "bg-blue-500 scale-105" : "bg-gray-400",
            "w-full px-4 py-3 rounded-md transition-all duration-500",
          )}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SelectUsername;
