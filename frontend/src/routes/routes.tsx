import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import App from "../App";
import SignUp from "../pages/login/SignUp";
import Login from "../pages/login";

export const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
  },
  {
    path: "SignUp",
    element: <SignUp />
  },
  {
    path: "Dashboard",
    element: <Dashboard />
  },
  {
    path: "Login",
    element: <Login />
  }
]);
