import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./login";
import ChatApp from "./root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

export default router;
