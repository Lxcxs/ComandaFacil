import React, { useEffect } from "react";
import OrderColumn from "../../components/OrderColumn/Index";
import { Container, Content } from "./styles";
import { ModalOrder } from "../../components/OrderModal";
import { useAuthorization } from "../../components/Hooks/useAuthorization";
import { client } from "../../services/axios";
import { useSocket } from "../../context/SocketContext";

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
interface Costumer {
  id: number;
  name: string;
  tableNumber: number;
  accountType: string;
  tableId: number;
  storeId: number;
  status: string;
}

function Pedidos() {
  const { storeId } = useAuthorization();
  console.log("id da loja: ", storeId)
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [tables, setTables] = React.useState<Table[]>([]);
  const [costumers, setCostumers] = React.useState<Costumer[]>([]);
  console.log("pedidos: ", orders)
  const [columns, setColumns] = React.useState({
    waiting: [] as Order[],
    producing: [] as Order[],
    finished: [] as Order[],
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const { socket } = useSocket();

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const fetchAllData = async () => {
    if (!storeId) {
      console.error("storeId is null");
      return;
    }
  
    const currentDate = new Date();
  
    try {
      const results = await Promise.allSettled([
        client.get(`/orders/${storeId}`),
        client.get(`/tables/${storeId}`),
        client.get(`/costumers/${storeId}`),
      ]);
  
      const [orderRes, tableRes, costumerRes] = results;
  
      if (orderRes.status === 'fulfilled') {
        const filteredOrders = orderRes.value.data.filter((order: Order) => {
          const orderDate = new Date(order.createdAt);
          return isSameDay(orderDate, currentDate); // Verifica se a data de criação é hoje
        });
        setOrders(filteredOrders);
  
        // Atualiza as colunas com as ordens filtradas
        const updatedColumns = {
          waiting: filteredOrders.filter((order: Order) => order.status === "waiting"),
          producing: filteredOrders.filter((order: Order) => order.status === "producing"),
          finished: filteredOrders.filter((order: Order) => order.status === "finished"),
        };
        setColumns(updatedColumns);
      } else {
        console.error("Erro ao buscar pedidos:", orderRes.reason);
      }
  
      if (tableRes.status === 'fulfilled') {
        setTables(tableRes.value.data);
      } else {
        console.error("Erro ao buscar mesas:", tableRes.reason);
      }
  
      if (costumerRes.status === 'fulfilled') {
        setCostumers(costumerRes.value.data);
      } else {
        console.error("Erro ao buscar clientes:", costumerRes.reason);
      }
  
    } catch (error) {
      console.error("Erro inesperado:", error);
    }
  };
  
  useEffect(() => {
    socket.on("newOrderCreated", () => fetchAllData());
  }, [socket]);

  useEffect(() => {
    fetchAllData();
  }, [storeId]);

  const emitOrderUpdate = (order: Order, newStatus: string) => {
    socket.emit("orderUpdated", {
      orderId: order.id,
      newStatus,
      storeId: order.storeId,
    });
    console.log("Order updated");
  };

  const handleConfirm = async (order: Order) => {
    try {
      await client.put(`/orders/${order.id}`, {
        storeId,
        newStatus: "producing",
        orderId: order.id,
      });

      emitOrderUpdate(order, "producing");
      fetchAllData();
    } catch (error) {
      console.error("Erro ao confirmar pedido:", error);
    }
  };
  const handleAdvance = async (order: Order) => {
    try {
      console.log(orders)
      await client.put(`/orders/${order.id}`, {
        storeId,
        newStatus: "finished",
        orderId: order.id,
      });

      await client.put(`/tabs`, {
        costumerId: order.customerId
      })

      emitOrderUpdate(order, "finished");
      fetchAllData();
    } catch (error) {
      console.error("Erro ao avançar pedido:", error);
    }
  };

  function handleModal(order: Order | null) {
    setSelectedOrder(order);
    setIsModalOpen(!isModalOpen);
  }

  const renderButtons = (item: Order) => {
    return (
      <>
        <button id="details_btn" onClick={() => handleModal(item)}>
          Detalhes
        </button>
        {columns.waiting.some((i) => i.id === item.id) && (
          <button id="next_btn" onClick={() => handleConfirm(item)}>
            Confirmar
          </button>
        )}
        {columns.producing.some((i) => i.id === item.id) && (
          <button id="next_btn" onClick={() => handleAdvance(item)}>
            Avançar
          </button>
        )}
      </>
    );
  };

  return (
    <Container>
      <Content>
        <OrderColumn
          title="Aguardando Confirmação..."
          background="#DA804E"
          columnStatus="waiting"
          orders={orders}
          tables={tables}
          customers={costumers}
          renderButtons={renderButtons}
        />
        <OrderColumn
          title="Em produção..."
          background="#DAC34E"
          columnStatus="producing"
          orders={orders}
          tables={tables}
          customers={costumers}
          renderButtons={renderButtons}
        />
        <OrderColumn
          title="Finalizado."
          background="#59DA4E"
          columnStatus="finished"
          orders={orders}
          tables={tables}
          customers={costumers}
          renderButtons={renderButtons}
        />
      </Content>
      {isModalOpen && (
        <ModalOrder
          closeModal={() => handleModal(null)}
          costumers={costumers}
          order={selectedOrder}
          orders={orders}
        />
      )}
    </Container>
  );
}

export default Pedidos;
