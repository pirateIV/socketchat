import { socket } from "./socket";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const LoginDialog = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);

  useEffect(() => {
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        setUsernameAlreadySelected(false);
      }
    });

    return () => socket.off("connect_error");
  }, [socket]);

  const handleSocketAuth = () => {
    setUsernameAlreadySelected(true);
    socket.auth = { username };
    socket.connect();
  };

  const handleSubmit = async () => {
    if (username.trim() === "") return;

    handleSocketAuth();
    setIsOpen(false);
    // await create(username);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
      toast({ description: "User Created" });
    }, 1000);
  };

  return (
    <Dialog open={!usernameAlreadySelected}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create profile</DialogTitle>
          <DialogDescription>
            Please enter a username. This username will help identify you, even
            if the connection is interrupted.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input
            id="username"
            value={username}
            className="col-span-3"
            placeholder="Enter a username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? "Please wait..." : "Login"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
