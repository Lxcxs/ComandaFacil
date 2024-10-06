import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
// import App from "../App";
import Login from "../pages/login";
import Layout from "../pages/Layout/Index";
import Pedidos from "../pages/Pedidos/Index";
import Cardapio from "../pages/Cardapio";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "pedidos",
        element: <Pedidos />,
      },
      {
        path: "cardapio",
        element: <Cardapio />,
      },
    ]
  },
  {
    path: "authentication",
    element: <Login />
  }
]);
export default router;