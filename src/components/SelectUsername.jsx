import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import SocketLogoAnimate from "@/components/SocketLogoAnimate";
import { cn } from "@/lib/utils";

const SelectUsername = ({ username, setUsername, setUserSelected }) => {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnimatingOut(true);
    socket.auth = { username };
    socket.connect();
  };

  useEffect(() => {
    if (isAnimatingOut) {
      const timer = setTimeout(() => {
        setUserSelected(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isAnimatingOut, setUserSelected]);

  const isValid = username.length > 2;

  return (
    <div
      id="select-username"
      className={cn(
        "min-h-screen absolute inset-0 flex flex-col items-center justify-center text-white",
        "transition-all duration-500 bg-gradient-to-b from-blue-500 to-indigo-600 z-50",
        isAnimatingOut ? "opacity-0 scale-95" : "opacity-100 scale-100",
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
          className={cn(
            "text-black px-4 py-3 w-full border border-gray-300 rounded-sm p-2",
            "focus:outline-none focus:ring-2 focus:!ring-blue-500 transition duration-300",
          )}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          disabled={!isValid}
          className={cn(
            "w-full px-4 py-3 rounded-md transition-all duration-500",
            `${isValid ? "bg-blue-500 scale-105" : "bg-gray-400"}`,
          )}
          title={isValid ? "Submit" : "Username must be at least 3 characters"}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SelectUsername;
