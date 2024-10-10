import React from "react";
import OrderColumn from "../../components/OrderColumn/Index";
import { Container, Content } from "./styles";
import { ModalOrder } from "../../components/OrderModal";

// Tipos para definir a estrutura dos pedidos e itens
type Item = {
  nome: string;
  preco: number;
  quantidade: number;
  observacao: string;
};

type Pedido = {
  id: number;
  numero: number;
  cliente: string;
  itens: Item[];
};

function Pedidos() {
  const [columns, setColumns] = React.useState({
    waiting: [
      {
        id: 1,
        numero: 1,
        cliente: "João",
        itens: [
          { nome: "Hambúrguer", preco: 20, quantidade: 3, observacao: "" },
          { nome: "Refrigerante", preco: 5, quantidade: 2, observacao: "Sem gelo com um pouco de pimenta e alecrim com canela, pouco leite em pó" },
          { nome: "Palmeiras", preco: 13.75, quantidade: 7, observacao: "Sem molho" }
        ]
      },
      {
        id: 2,
        numero: 2,
        cliente: "Maria",
        itens: [
          { nome: "Pizza", preco: 30, quantidade: 1, observacao: "" },
          { nome: "Refrigerante", preco: 5, quantidade: 1, observacao: "" }
        ]
      }
    ],
    making: [
      {
        id: 3,
        numero: 3,
        cliente: "Carlos",
        itens: [
          { nome: "Salada", preco: 15, quantidade: 1, observacao: "" },
          { nome: "Suco", preco: 7, quantidade: 2, observacao: "" }
        ]
      }
    ],
    finished: [
      {
        id: 4,
        numero: 4,
        cliente: "Ana",
        itens: [
          { nome: "Hambúrguer", preco: 20, quantidade: 4, observacao: "" },
          { nome: "Batata Frita", preco: 10, quantidade: 3, observacao: "" }
        ]
      }
    ]
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Pedido | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: Pedido, column: string) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
    e.dataTransfer.setData("column", column);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, destinationColumn: string) => {
    const item = JSON.parse(e.dataTransfer.getData("item")) as Pedido;
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

  const handleConfirm = (item: Pedido) => {
    setColumns((prevState) => {
      const updatedWaiting = prevState.waiting.filter((i) => i.id !== item.id);
      const updatedMaking = [...prevState.making, item];
      return {
        ...prevState,
        waiting: updatedWaiting,
        making: updatedMaking,
      };
    });
  };

  const handleAdvance = (item: Pedido) => {
    setColumns((prevState) => {
      const updatedMaking = prevState.making.filter((i) => i.id !== item.id);
      const updatedFinished = [...prevState.finished, item];
      return {
        ...prevState,
        making: updatedMaking,
        finished: updatedFinished,
      };
    });
  };

  function handleModal(order: Pedido | null) {
    setSelectedOrder(order);
    setIsModalOpen(!isModalOpen);
  }

  const renderButtons = (item: Pedido) => {
    return (
      <>
        <button id="details_btn" onClick={() => handleModal(item)}>Detalhes</button>
        {columns.waiting.some(i => i.id === item.id) && (
          <button id="next_btn" onClick={() => handleConfirm(item)}>Confirmar</button>
        )}
        {columns.making.some(i => i.id === item.id) && (
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
          items={columns.waiting}
          onDrop={(e) => handleDrop(e, "waiting")}
          onDragOver={handleDragOver}
          renderButtons={renderButtons}
          onDragStart={(e, item) => handleDragStart(e, item, "waiting")}
        />
        <OrderColumn
          title="Em produção..."
          background="#DAC34E"
          items={columns.making}
          onDrop={(e) => handleDrop(e, "making")}
          onDragOver={handleDragOver}
          renderButtons={renderButtons}
          onDragStart={(e, item) => handleDragStart(e, item, "making")}
        />
        <OrderColumn
          title="Finalizado."
          background="#59DA4E"
          items={columns.finished}
          onDrop={(e) => handleDrop(e, "finished")}
          onDragOver={handleDragOver}
          renderButtons={renderButtons}
          onDragStart={(e, item) => handleDragStart(e, item, "finished")}
        />
      </Content>
      {isModalOpen && <ModalOrder closeModal={() => handleModal(null)} order={selectedOrder} />}
    </Container>
  );
}

export default Pedidos;
