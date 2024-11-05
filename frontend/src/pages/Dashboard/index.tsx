import { useContext, useEffect, useState } from "react";
import { Content, OrdersList, Statistics } from "./styles";
import { AdminContext } from "../../context/AdminContext";
import { client } from "../../services/axios";
import { useAuthorization } from "../../components/Hooks/useAuthorization";
import { useSocket } from "../../context/SocketContext";
import { formatCurrency } from "../../utils/formatCurrency";

interface Order {
  id: number;
  itemName: string;
  itemImage: string;
  quantity: number;
  customerNote: string;
  price: string;
  status: string;
  createdAt: string;
  storeId: number;
  customerId: number;
  tableId: number;
  customerTabId: number;
  waiterId: null;
  guestName: string;
  isIndividual: boolean;
}
interface Table {
  id: number;
  number: number;
  status: string;
  peopleCount: number;
  storeId: number;
}
interface Store {
  id: number;
  name: string;
  status: string;
  image: string;
  tableCount: number;
  userId: number;
}
interface Costumer {
  id: number;
  name: string;
  tableNumber: number;
  accountType: string;
  tableId: number;
  storeId: number;
  status: string;
}

interface Tab {
  id: number;
  tabValue: string;
  status: string;
  customerId: number;
  storeId: number;
  tableId: number
}

function Dashboard() {
  const context = useContext(AdminContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [store, setStore] = useState<Store | null>(null);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const { socket } = useSocket();

  if (!context) {
    throw new Error("useAdminToken must be used within an AdminProvider");
  }

  const { userData, storeData, loading, fetchData } = context;
  const { storeId, token } = useAuthorization();
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const fetchAllData = async () => {
    if (!storeId) {
      console.error("storeId is null.");
      return;
    }
    try {
      const [tableResponse, costumerResponse, orderResponse, tabRes] = await Promise.allSettled([
        client.get(`/tables/${storeId}`),
        client.get(`/costumers/${storeId}`),
        client.get(`/orders/${storeId}`),
        client.get(`/tabs/store/${storeId}`),
      ]);

      const currentDate = new Date();

      // Verifica se as requisições foram bem-sucedidas antes de acessar os dados
      if (tableResponse.status === "fulfilled") {
        setTables(tableResponse.value.data);
      } else {
        console.error("Erro ao buscar mesas:", tableResponse.reason);
      }

      if (costumerResponse.status === "fulfilled") {
        setCostumers(costumerResponse.value.data);
      } else {
        console.error("Erro ao buscar clientes:", costumerResponse.reason);
      }

      if (orderResponse.status === "fulfilled") {
        const filteredOrders = orderResponse.value.data.filter((order: Order) => {
          const orderDate = new Date(order.createdAt);
          return isSameDay(orderDate, currentDate);
        });
        setOrders(filteredOrders);
      } else {
        console.error("Erro ao buscar pedidos:", orderResponse.reason);
      }

      if (tabRes.status === "fulfilled") {
        setTabs(tabRes.value.data);
      } else {
        console.error("Erro ao buscar comandas:", tabRes.reason);
      }

      setStore(storeData);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };


  useEffect(() => {
    const loadData = async () => {
      if (token) {
        await fetchData();
      }
    };

    loadData();
    fetchAllData();
  }, [storeId]);
  useEffect(() => {
    socket.on("orderUpdated", () => fetchAllData());
    socket.on("newOrderCreated", () => fetchAllData());

  }, [socket])
  const formatCreatedAt = (createdAt: string): string => {
    const date = new Date(createdAt); // Cria um objeto Date a partir da string
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Retorna apenas a hora formatada
  };
  if (loading) return <p>Loading...</p>;

  return (
    <Content>
      <div className="introduce">
        <h2>Olá {userData?.name}</h2>
        <span>Acompanhe as atividades do(a) <span id="storeName">{store?.name}</span> hoje:</span>
      </div>
      <div className="info_container">
        <Statistics>
          <div className="performance">
            <h2>Meu desempenho</h2>
            <div className="statistics">
              <div className="bloco1">
                <div className="header">
                  <p>Número de pedidos:</p>
                </div>
                <div className="content">
                  <p>{orders.length}</p>
                </div>
              </div>
              <div className="bloco2">
                <div className="header">
                  <p>Faturamento:</p>
                </div>
                <div className="content">
                  <p>{formatCurrency(tabs.filter(e => e.status === "closed").reduce((acc, tab) => acc + parseFloat(tab.tabValue), 0))}</p>
                </div>
              </div>
              <div className="bloco3">
                <div className="header">
                  <p>Total de clientes:</p>
                </div>
                <div className="content">
                  <p>{costumers.filter(e => e.storeId === storeId).length}</p>
                </div>
              </div>
              <div className="bloco4">
                <div className="header">
                  <p>Mesas disponíveis:</p>
                </div>
                <div className="content">
                  <p>{tables.filter(e => e.status === "available").length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="orders">
            <h2>Meus pedidos</h2>
            <div className="statistics">
              <div className="bloco1">
                <div className="header">
                  <p>Em análise</p>
                </div>
                <div className="content">
                  <p>{orders.filter(e => e.status === "waiting").length}</p>
                </div>
              </div>
              <div className="bloco2">
                <div className="header">
                  <p>Em produção</p>
                </div>
                <div className="content">
                  <p>{orders.filter(e => e.status === "producing").length}</p>
                </div>
              </div>
              <div className="bloco3">
                <div className="header">
                  <p>Finalizados</p>
                </div>
                <div className="content">
                  <p>{orders.filter(e => e.status === "finished").length}</p>
                </div>
              </div>
              <div className="bloco4">
                <div className="header">
                  <p>Comandas em aberto</p>
                </div>
                <div className="content">
                  <p>{tabs.filter(e => e.status === "open").length}</p>
                </div>
              </div>
            </div>
          </div>
        </Statistics>
        <OrdersList>
          <table>
            <tr id="table_header">
              <th>Quantidade</th>
              <th>Pedido</th>
              <th>Mesa</th>
              <th>Cliente</th>
              <th>Status</th>
              <th>Hora</th>
              <th>ID</th>
            </tr>
            {orders
            .filter(e => e.status === "waiting" || e.status === "producing")
            .map(order => (
              <tr>
                <td>{order.quantity}</td>
                <td>{order.itemName}</td>
                <td>{tables.filter(table => table.id === order.tableId)[0].number}</td>
                <td>
                  {
                    order.isIndividual ? 
                    order.guestName:
                      costumers.filter(customer => customer.id === order.customerId)[0].name
                  }
                </td>
                <td>{order.status}</td>
                <td>{formatCreatedAt(order.createdAt)}</td>
                <td>{order.id}</td>
              </tr>
            ))}
          </table>
        </OrdersList>
      </div>

    </Content>
  );
}

export default Dashboard;
