import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/Sign In";
import Dashboard from "../pages/Dashboard";
import App from "../App";



export const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
  },
  {
    path: "SignIn",
    element: <SignIn />
  },
  {
    path: "Dashboard",
    element: <Dashboard />
  },
])
