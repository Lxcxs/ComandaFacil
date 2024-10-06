import React from "react";
import { Column, Container, Content, Item } from "./styles";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { ModalOrder } from "../../components/modal pedidos";

// Exemplo de estrutura de um pedido com ID
type Pedido = {
  id: number;
  numero: number; // Número do pedido visível (para exibição)
};

function Pedidos() {
  const [columns, setColumns] = React.useState({
    waiting: [{ id: 1, numero: 1 }, { id: 2, numero: 2 }, { id: 3, numero: 3 }],
    making: [{ id: 4, numero: 1 }, { id: 5, numero: 2 }, { id: 6, numero: 3 }],
    finished: [{ id: 7, numero: 2 }],
  });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    item: Pedido,
    column: string
  ) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
    e.dataTransfer.setData("column", column);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, destinationColumn: string) => {
    const item = JSON.parse(e.dataTransfer.getData("item")) as Pedido;
    const sourceColumn = e.dataTransfer.getData("column");

    if (sourceColumn === destinationColumn) return;

    const sourceItems = columns[sourceColumn as keyof typeof columns];
    const destinationItems = columns[destinationColumn as keyof typeof columns];

    // Remove item da coluna de origem
    const updatedSourceItems = sourceItems.filter((i) => i.id !== item.id);

    // Adiciona item à coluna de destino
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

  // Função para confirmar o pedido
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

  // Função para avançar o pedido
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

  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  const renderButtons = (column: string, item: Pedido) => {
    switch (column) {
      case "waiting":
        return (
          <>
            <button id="next_btn" onClick={() => handleConfirm(item)}>Confirmar</button>
            <button id="details_btn" onClick={handleModal}>Detalhes</button>
          </>
        );
      case "making":
        return (
          <>
            <button id="next_btn" onClick={() => handleAdvance(item)}>Avançar</button>
            <button id="details_btn" onClick={handleModal}>Detalhes</button>
          </>
        );
      case "finished":
        return (
          <>
            <button id="details_btn" onClick={handleModal}>Detalhes</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Content>
        {/* Coluna Aguardando Confirmação */}
        <Column
          style={{ background: "#DA804E" }}
          onDrop={(e) => handleDrop(e, "waiting")}
          onDragOver={handleDragOver}
        >
          <div className="header">
            <div className="title">
              <FaRegCircle />
              <span>Aguardando Confirmação...</span>
            </div>
            <span id="quantity">{columns.waiting.length}</span>
          </div>

          <div className="drag_box">
            {columns.waiting.map((e) => (
              <Item
                key={e.id}
                draggable
                onDragStart={(event) => handleDragStart(event, e, "waiting")}
              >
                <div className="order_header">
                  <span id="time">17:45</span>
                  <span id="order">Pedido #{e.numero}</span>
                  <span id="table">MESA 14</span>
                </div>

                <div className="item_box">
                  <div className="item">
                    <span>Nome Item</span>
                    <span>R$ 00,00</span>
                  </div>
                  <div className="item">
                    <span>Nome Item</span>
                    <span>R$ 00,00</span>
                  </div>
                </div>

                <div className="totals">
                  <span>Total:</span>
                  <span>R$ 000,00</span>
                </div>

                <div className="footer">
                  {renderButtons("waiting", e)}
                </div>
              </Item>
            ))}
          </div>
        </Column>

        {/* Coluna Em Produção */}
        <Column
          style={{ background: "#DAC34E" }}
          onDrop={(e) => handleDrop(e, "making")}
          onDragOver={handleDragOver}
        >
          <div className="header">
            <div className="title">
              <BiSolidCircleThreeQuarter />
              <span>Em produção...</span>
            </div>
            <span id="quantity">{columns.making.length}</span>
          </div>

          <div className="drag_box">
            {columns.making.map((e) => (
              <Item
                key={e.id}
                draggable
                onDragStart={(event) => handleDragStart(event, e, "making")}
              >
                <div className="order_header">
                  <span id="time">17:45</span>
                  <span id="order">Pedido #{e.numero}</span>
                  <span id="table">MESA 14</span>
                </div>

                <div className="item_box">
                  <div className="item">
                    <span>Nome Item</span>
                    <span>R$ 00,00</span>
                  </div>
                  <div className="item">
                    <span>Nome Item</span>
                    <span>R$ 00,00</span>
                  </div>
                </div>

                <div className="totals">
                  <span>Total:</span>
                  <span>R$ 000,00</span>
                </div>

                <div className="footer">
                  {renderButtons("making", e)}
                </div>
              </Item>
            ))}
          </div>
        </Column>

        {/* Coluna Finalizado */}
        <Column
          style={{ background: "#59DA4E" }}
          onDrop={(e) => handleDrop(e, "finished")}
          onDragOver={handleDragOver}
        >
          <div className="header">
            <div className="title">
              <FaCheckCircle />
              <span>Finalizado.</span>
            </div>
            <span id="quantity">{columns.finished.length}</span>
          </div>

          <div className="drag_box">
            {columns.finished.map((e) => (
              <Item
                key={e.id}
                draggable
                onDragStart={(event) => handleDragStart(event, e, "finished")}
              >
                <div className="order_header">
                  <span id="time">17:45</span>
                  <span id="order">Pedido #{e.numero}</span>
                  <span id="table">MESA 14</span>
                </div>

                <div className="item_box">
                  <div className="item">
                    <span>Nome Item</span>
                    <span>R$ 00,00</span>
                  </div>
                  <div className="item">
                    <span>Nome Item</span>
                    <span>R$ 00,00</span>
                  </div>
                </div>

                <div className="totals">
                  <span>Total:</span>
                  <span>R$ 000,00</span>
                </div>

                <div className="footer">
                  {renderButtons("finished", e)}
                </div>
              </Item>
            ))}
          </div>
        </Column>
      </Content>

      {
        isModalOpen &&
        <ModalOrder closeModal={handleModal} />
      }
    </Container>
  );
}

export default Pedidos;
