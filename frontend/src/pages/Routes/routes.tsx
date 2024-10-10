import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard";
// import App from "../App";
import Login from "../login";
import Layout from "../Layout/Index";
import Pedidos from "../Orders/Index";
import { Cardapio } from "../Menu";
import Mesas from "../Tables";
import WaiterTables from "../Waiter";
import { CustomerSignup } from "../CustomerSignUp";
import { CustomerMenu } from "../CustomerMenu";
import CustomerLayout from "../CustomerLayout/Index";

const router = createBrowserRouter([
  {
    path: "/",
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
      {
        path: "mesas",
        element: <Mesas />
      }
    ]
  },
  {
    path: "authentication",
    element: <Login />
  },
  {
    path: "waiter",
    element: <WaiterTables />
  },

  {
    path: "restaurante/entrar",
    element: <CustomerSignup />
  },
  {
    path: "/restaurante",
    element: <CustomerLayout />,
    children: [
      {
        path: "cardapio",
        element: <CustomerMenu />
      },
    ]
  },
]);
export default router;