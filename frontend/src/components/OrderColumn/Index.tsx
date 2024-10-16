import React, { useState } from "react";
import { Column, Item } from "./styles";
import { formatCurrency } from "../../utils/formatCurrency";

interface Order {
  id: number;
  itemName: string;
  itemImage: string;
  itemAmount: number;
  costumerNote: string;
  orderValue: string;
  orderStatus: string;
  createdAt: string; // Ex: "2024-10-16 00:23:56.361"
  storeId: number;
  costumerId: number;
  tableId: number;
  costumerTabId: number;
  waiterId: null;
}

interface OrderColumnProps {
  title: string;
  background: string;
  columnStatus: string | undefined;
  orders: Order[];
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  renderButtons: (item: Order) => JSX.Element;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, item: Order) => void;
}

// Formata a data para retornar apenas a hora
const formatCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt); // Cria um objeto Date a partir da string
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Retorna apenas a hora formatada
};

const OrderColumn: React.FC<OrderColumnProps> = ({
  title,
  background,
  columnStatus,
  orders,
  onDrop,
  onDragOver,
  renderButtons,
  onDragStart,
}) => {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const toggleExpand = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const filteredOrders: number = orders.filter((e) => e.orderStatus === columnStatus).length;

  return (
    <Column style={{ background }} onDrop={onDrop} onDragOver={onDragOver}>
      <div className="header">
        <div className="title">
          <span>{title}</span>
        </div>
        <span id="quantity">{filteredOrders}</span>
      </div>
      <div className="drag_box">
        {orders
          .filter((e) => e.orderStatus === columnStatus)
          .map((pedido) => {
            const createdAtFormatted = formatCreatedAt(pedido.createdAt); // Formata a data criada

            return (
              <Item
                key={pedido.id}
                draggable
                onDragStart={(event) => onDragStart(event, pedido)}
                onClick={() => toggleExpand(pedido.id)}
              >
                <div className="order_header">
                  <span id="time">{createdAtFormatted}</span> {/* Exibe apenas a hora formatada */}
                  <span id="order">Pedido #{pedido.id}</span>
                  <span id="table">MESA 14</span>
                </div>
                <div className="item_box">
                  <div className="item">
                    <span>Lucas</span>
                    <span>{pedido.itemAmount} itens</span>
                  </div>

                  <>
                    {orders
                      .filter((e) => e.id === pedido.id)
                      .map((item, index) => (
                        <div className="item list" key={index}>
                          <span>
                            {item.itemAmount}x {item.itemName}
                          </span>
                          {item.costumerNote && (
                            <span style={{ fontStyle: "italic", fontWeight: "200" }}>Possui observação.</span>
                          )}
                          <span>{formatCurrency(parseFloat(item.orderValue))}</span>
                        </div>
                      ))}
                    <div style={{ textAlign: "right", display: "flex", justifyContent: "space-between" }}>
                      <span>Total:</span>
                      <span>{formatCurrency(parseFloat(pedido.orderValue))}</span>
                    </div>
                  </>

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
