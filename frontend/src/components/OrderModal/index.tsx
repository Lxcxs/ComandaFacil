import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { Modal, ModalContent, Close } from "./styles"; // Supondo que você tenha estilos definidos

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

interface Costumer {
  id: number;
  name: string;
  tableNumber: number;
  accountType: string;
  tableId: number;
  storeId: number;
  status: string;
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
  const filteredCostumer = costumers.filter(e => e.id === order.customerId)

  return (
    <Modal onClick={handleOutsideClick}>
      <ModalContent>
        <h2>Detalhes do Pedido #{order.id}</h2>
        <p>
          <strong>Cliente: </strong> 
          {
            order.isIndividual ? order.guestName :
            filteredCostumer[0].name
          }
        </p>
        <p><strong>Criado em:</strong> {createdAtFormatted}</p> {/* Exibe o horário formatado */}
        <hr />
        <br />
        <div className="itens">
          {orders
            .filter((e) => e.id === order.id)
            .map((item, index) => (
              <div key={index}>
                {
                  item.customerNote !== "" ?
                    <p id="obs">
                      {item.quantity}x {item.itemName} - {formatCurrency(parseFloat(item.price))}
                      <p id="desc"><strong>Obs:</strong> {item.customerNote}</p>
                    </p> :
                    <p>{item.quantity}x {item.itemName} - {formatCurrency(parseFloat(item.price))}</p>
                }
              </div>
            ))}
          <br />
        </div>
        <hr />
        <p><strong>Total:</strong> {formatCurrency(parseFloat(order.price))}</p>
        <Close onClick={closeModal}>X</Close>
      </ModalContent>
    </Modal>
  );
};
