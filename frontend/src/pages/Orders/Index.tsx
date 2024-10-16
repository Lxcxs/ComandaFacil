import React, { useEffect } from "react";
import OrderColumn from "../../components/OrderColumn/Index";
import { Container, Content } from "./styles";
import { ModalOrder } from "../../components/OrderModal";
import { useAuthorization } from "../../components/Hooks/useAuthorization";
import { client } from "../../services/axios";

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

function Pedidos() {
  const { storeId } = useAuthorization();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [columns, setColumns] = React.useState({
    waiting: [] as Order[],
    producing: [] as Order[],
    finished: [] as Order[],
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const fetchAllData = async () => {
    if (!storeId) {
      console.error("storeId is null");
      return;
    }

    try {
      const orderResponse = await client.get(`/orders/${storeId}`);
      setOrders(orderResponse.data);

      // Atualiza as colunas com as ordens
      const updatedColumns = {
        waiting: orderResponse.data.filter((order: Order) => order.orderStatus === "waiting"),
        producing: orderResponse.data.filter((order: Order) => order.orderStatus === "producing"),
        finished: orderResponse.data.filter((order: Order) => order.orderStatus === "finished"),
      };
      setColumns(updatedColumns);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [storeId]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Order, column: string) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
    e.dataTransfer.setData("column", column);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, destinationColumn: string) => {
    const item = JSON.parse(e.dataTransfer.getData("item")) as Order;
    const sourceColumn = e.dataTransfer.getData("column");

    if (sourceColumn === destinationColumn) return;

    const sourceItems = columns[sourceColumn as keyof typeof columns];
    const destinationItems = columns[destinationColumn as keyof typeof columns];

    const updatedSourceItems = sourceItems.filter((i) => i.id !== item.id);
    const updatedDestinationItems = [...destinationItems, item];

    setColumns({
      ...columns,
      [sourceColumn]: updatedSourceItems,
      [destinationColumn]: updatedDestinationItems,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleConfirm = async (order: Order) => {
    try {
      await client.put(`/orders/${order.id}`, {
        storeId,
        newStatus: "producing",
        orderId: order.id
      });
      // Recarrega os dados após a confirmação
      fetchAllData();
    } catch (error) {
      console.error("Erro ao confirmar pedido:", error);
    }
  };

  const handleAdvance = async (order: Order) => {
    try {
      await client.put(`/orders/${order.id}`, {
        storeId,
        newStatus: "finished",
        orderId: order.id
      });
      // Recarrega os dados após avançar o pedido
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
        <button id="details_btn" onClick={() => handleModal(item)}>Detalhes</button>
        {columns.waiting.some(i => i.id === item.id) && (
          <button id="next_btn" onClick={() => handleConfirm(item)}>Confirmar</button>
        )}
        {columns.producing.some(i => i.id === item.id) && (
          <button id="next_btn" onClick={() => handleAdvance(item)}>Avançar</button>
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
          onDrop={(e) => handleDrop(e, "waiting")}
          onDragOver={handleDragOver}
          renderButtons={renderButtons}
          onDragStart={(e, item) => handleDragStart(e, item, "waiting")}
        />
        <OrderColumn
          title="Em produção..."
          background="#DAC34E"
          columnStatus="producing"
          orders={orders}
          onDrop={(e) => handleDrop(e, "producing")}
          onDragOver={handleDragOver}
          renderButtons={renderButtons}
          onDragStart={(e, item) => handleDragStart(e, item, "producing")}
        />
        <OrderColumn
          title="Finalizado."
          background="#59DA4E"
          columnStatus="finished"
          orders={orders}
          onDrop={(e) => handleDrop(e, "finished")}
          onDragOver={handleDragOver}
          renderButtons={renderButtons}
          onDragStart={(e, item) => handleDragStart(e, item, "finished")}
        />
      </Content>
      {isModalOpen && <ModalOrder closeModal={() => handleModal(null)} order={selectedOrder} orders={orders} />}
    </Container>
  );
}

export default Pedidos;
