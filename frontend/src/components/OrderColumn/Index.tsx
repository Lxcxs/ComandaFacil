import React, { useState } from "react";
import { Column, Item } from "./styles";
import { formatCurrency } from "../../utils/formatCurrency";
type Pedido = {
  id: number;
  numero: number; // Número do pedido visível (para exibição)
  cliente: string;
  itens: { nome: string; preco: number; quantidade: number; observacao: string }[];
};

interface OrderColumnProps {
  title: string;
  background: string;
  items: Pedido[];
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  renderButtons: (item: Pedido) => JSX.Element;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, item: Pedido) => void;
}

const OrderColumn: React.FC<OrderColumnProps> = ({
  title,
  background,
  items,
  onDrop,
  onDragOver,
  renderButtons,
  onDragStart,
}) => {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const toggleExpand = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <Column style={{ background }} onDrop={onDrop} onDragOver={onDragOver}>
      <div className="header">
        <div className="title">
          <span>{title}</span>
        </div>
        <span id="quantity">{items.length}</span>
      </div>
      <div className="drag_box">
        {items.map((pedido) => {
          const total = pedido.itens.reduce(
            (acc, item) => acc + item.preco * item.quantidade,
            0
          );
          return (
            <Item
              key={pedido.id}
              draggable
              onDragStart={(event) => onDragStart(event, pedido)}
              onClick={() => toggleExpand(pedido.id)}
            >
              <div className="order_header">
                <span id="time">17:45</span>
                <span id="order">Pedido #{pedido.numero}</span>
                <span id="table">MESA 14</span>
              </div>
              <div className="item_box">
                <div className="item">
                  <span>{pedido.cliente}</span>
                  <span>{pedido.itens.length} itens</span>
                </div>
                {expandedOrder === pedido.id && (
                  <>
                    {pedido.itens.map((item, index) => (
                      <div className="item list" key={index}>
                        <span>
                          {item.quantidade}x {item.nome}
                        </span>
                        {item.observacao && (
                          <span style={{fontStyle: "italic", fontWeight: "200"}}>Possui observação.</span>
                        )}
                        <span>{formatCurrency(item.preco * item.quantidade)}</span>
                      </div>
                    ))}
                    <div style={{ textAlign: "right", display: "flex", justifyContent: "space-between" }}>
                      <span>Total:</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </>
                )}
                <hr />
              </div>
              <div className="footer">{renderButtons(pedido)}</div>
            </Item>
          );
        })}
      </div>
    </Column>
  );
};

export default OrderColumn;
