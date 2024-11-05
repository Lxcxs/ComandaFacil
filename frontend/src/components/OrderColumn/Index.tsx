import React, { useState } from "react";
import { Column, Item } from "./styles";
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

interface Costumer {
  id: number;
  name: string;
  tableNumber: number;
  accountType: string;
  tableId: number;
  storeId: number;
  status: string;
}

interface OrderColumnProps {
  title: string;
  background: string;
  columnStatus: string | undefined;
  orders: Order[];
  tables: Table[];
  customers: Costumer[];
  renderButtons: (item: Order) => JSX.Element;
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
  tables,
  customers,
  renderButtons,
}) => {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const toggleExpand = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  const filteredOrdersLength: number = orders.filter((e) => e.status === columnStatus).length;
  function handleTableNumber(tables: Table[], order: Order) {
    const filteredTable = tables.filter(e => e.id === order.tableId);

    return <span>{filteredTable[0].number}</span>
  }
  function handleCostumerName(costumers: Costumer[], order: Order, isIndividual: boolean, guestName?: string) {

    if (isIndividual) {
      return <span>{guestName}</span>

    } else {
      const filteredCostumer = costumers.filter(e => e.id === order.customerId);
      return <span>{filteredCostumer[0].name}</span>

    }
  }
  return (
    <Column style={{ background }}>
      <div className="header">
        <div className="title">
          <span>{title}</span>
        </div>
        <span id="quantity">{filteredOrdersLength}</span>
      </div>
      <div className="drag_box">
        {orders
          .filter((e) => e.status === columnStatus)
          .map((pedido) => {
            const createdAtFormatted = formatCreatedAt(pedido.createdAt); // Formata a data criada

            return (
              <Item
                key={pedido.id}
                onClick={() => toggleExpand(pedido.id)}
              >
                <div className="order_header">
                  <span id="time">{createdAtFormatted}</span> {/* Exibe apenas a hora formatada */}
                  <span id="order">Pedido #{pedido.id}</span>
                  <span id="table">MESA {handleTableNumber(tables, pedido)}</span>
                </div>
                <div className="item_box">
                  <div className="item">
                    <span>{handleCostumerName(customers, pedido, pedido.isIndividual, pedido.guestName)}</span>
                    <span>{pedido.quantity} itens</span>
                  </div>

                  <>
                    {orders
                      .filter((e) => e.id === pedido.id)
                      .map((item, index) => (
                        <div className="item list" key={index}>
                          <span>
                            {item.quantity}x {item.itemName}
                          </span>
                          {item.customerNote && (
                            <span style={{ fontStyle: "italic", fontWeight: "200" }}>Possui observação.</span>
                          )}
                          <span>{formatCurrency(parseFloat(item.price))}</span>
                        </div>
                      ))}
                    <div style={{ textAlign: "right", display: "flex", justifyContent: "space-between" }}>
                      <span>Total:</span>
                      <span>{formatCurrency(parseFloat(pedido.price))}</span>
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
