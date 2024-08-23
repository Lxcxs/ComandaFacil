import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import App from "../App";
import Login from "../pages/login";

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
  },
  {
    path: "dashboard",
    element: <Dashboard />
  },
  {
    path: "enter",
    element: <Login />
  }
]);
export default router;