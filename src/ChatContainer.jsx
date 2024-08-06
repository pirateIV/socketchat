import { Toaster } from "@/components/ui/toaster";

const ChatContainer = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-auto-1fr h-full">{children}</div>
      <Toaster />
    </>
  );
};

export default ChatContainer;
