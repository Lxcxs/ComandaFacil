import { useState, useEffect } from "react";
import { client } from "../../services/axios";
import MesaGrid from "../../components/Table";
import MesaDetails from "../../components/TableDetails";
import { Container } from "./styles";
import { useAuthorization } from "../../components/Hooks/useAuthorization";
import { useSocket } from "../../context/SocketContext";

interface ITable {
  id: number;
  tableNumber: number;
  tableStatus: string;
  tablePeopleAmount: number;
  storeId: number;
  waiterId: number | null;
}

interface Order {
  id: number;
  itemName: string;
  itemImage: string;
  itemAmount: number;
  costumerNote: string;
  orderValue: string;
  orderStatus: string;
  createdAt: string;
  storeId: number;
  costumerId: number;
  tableId: number;
  costumerTabId: number;
  waiterId: null;
}

function Mesas() {
  const [tables, setTables] = useState<ITable[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<ITable | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const { storeId } = useAuthorization();
  const { socket } = useSocket();

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [tableRes, orderRes] = await Promise.allSettled([
        client.get(`/tables/${storeId}`),
        client.get(`/orders/${storeId}`)
      ]);

      if (tableRes.status === 'fulfilled') {
        setTables(tableRes.value.data);
      } else {
        console.error("Erro ao buscar mesas:", tableRes.reason);
      }

      if (orderRes.status === 'fulfilled') {
        setOrders(orderRes.value.data);
      } else {
        console.error("Erro ao buscar pedidos:", orderRes.reason);
      }

    } catch (error) {
      console.error("Erro inesperado:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (storeId) {
      socket.on("costumerCreated", () => fetchAllData());
      fetchAllData();
    }
  
    return () => {
      socket.off("costumerCreated");
    };
  }, [storeId]);
  

  const handleMesaClick = (tableNumber: number, tablePeopleAmount: number) => {
    const mesa = tables.find((m) => m.tableNumber === tableNumber && m.tablePeopleAmount === tablePeopleAmount);
    console.log(mesa)
    
    if (mesa && mesa.tableStatus === "occupied") {
      const filteredOrder = orders.find(e => e.tableId === mesa.id);
      console.log(filteredOrder)
      setSelectedTable(mesa);
      if (filteredOrder) setSelectedOrder(filteredOrder);
      setIsDetailsOpen(true);
    } else {
      setSelectedTable(null);
    }
  };

  const handleDetailsModal = () => {
    setIsDetailsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Container>
      <div className="content">
        {
          loading ? <span>Carregando...</span> :
            <MesaGrid mesas={tables} onMesaClick={handleMesaClick} />
        }
      </div>
      {isDetailsOpen && (
        <MesaDetails
          selectedTable={selectedTable}
          closeModal={handleDetailsModal}
          order={orders}
        />
      )}
    </Container>
  );
}

export default Mesas;
