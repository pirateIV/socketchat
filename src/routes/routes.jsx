import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";
import Chat from "@/pages/Chat";
import SelectUsername from "@/pages/SelectUsername";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "auth",
        element: <SelectUsername />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace={true} />,
  },
]);

export default router;
