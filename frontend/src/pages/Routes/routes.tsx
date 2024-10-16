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
import OrderList from "../CustomerOrderList";
import WaiterLayout from "../WaiterLayout";
import CustomerCart from "../CustomerCart";

const router = createBrowserRouter([
  {
    path: "/:storeId",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
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
    path: "enter",
    element: <Login />
  },
  {
    path: "/waiter",
    element: <WaiterLayout />,
    children: [
      {
        path: "tables",
        element: <WaiterTables />
      },
      {
        path: "cardapio",
        element: <CustomerMenu />
      },
    ]
  },

  {
    path: ":storeId/enter",
    element: <CustomerSignup />
  },
  {
    path: "/:storeId/:costumerId",
    element: <CustomerLayout />,
    children: [
      {
        path: "cardapio",
        element: <CustomerMenu />
      },
      {
        path: "pedidos",
        element: <OrderList />
      },
      {
        path: "carrinho",
        element: <CustomerCart />
      }
    ]
  },
]);
export default router;