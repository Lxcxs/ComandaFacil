import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { Modal, ModalContent, Close } from "./styles"; // Supondo que você tenha estilos definidos

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

interface Costumer {
  id: number;
  costumerName: string;
  costumerTable: number;
  accountType: string;
  tableId: number;
  storeId: number;
  costumerStatus: string;
}

interface ModalOrderProps {
  closeModal: () => void;
  order?: Order | null;
  orders: Order[];
  costumers: Costumer[];
}

const formatCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt); // Cria um objeto Date a partir da string
  return date.toLocaleString(); // Formata a data e hora de acordo com a localidade do navegador
};

export const ModalOrder: React.FC<ModalOrderProps> = ({ closeModal, order, orders, costumers }) => {
  if (!order) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Armazena o horário formatado
  const createdAtFormatted = formatCreatedAt(order.createdAt);
  const filteredCostumer = costumers.filter(e => e.id === order.costumerId)

  return (
    <Modal onClick={handleOutsideClick}>
      <ModalContent>
        <h2>Detalhes do Pedido #{order.id}</h2>
        <p><strong>Cliente:</strong> {filteredCostumer[0].costumerName}</p>
        <p><strong>Criado em:</strong> {createdAtFormatted}</p> {/* Exibe o horário formatado */}
        <hr />
        <br />
        <div className="itens">
          {orders
            .filter((e) => e.id === order.id)
            .map((item, index) => (
              <div key={index}>
                {
                  item.costumerNote !== "" ?
                    <p id="obs">
                      {item.itemAmount}x {item.itemName} - {formatCurrency(parseFloat(item.orderValue))}
                      <p id="desc"><strong>Obs:</strong> {item.costumerNote}</p>
                    </p> :
                    <p>{item.itemAmount}x {item.itemName} - {formatCurrency(parseFloat(item.orderValue))}</p>
                }
              </div>
            ))}
          <br />
        </div>
        <hr />
        <p><strong>Total:</strong> {formatCurrency(parseFloat(order.orderValue))}</p>
        <Close onClick={closeModal}>X</Close>
      </ModalContent>
    </Modal>
  );
};
