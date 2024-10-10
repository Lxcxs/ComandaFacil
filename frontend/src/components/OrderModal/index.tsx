import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { Modal, ModalContent, Close } from "./styles"; // Supondo que você tenha estilos definidos

type Pedido = {
  id: number;
  numero: number;
  cliente: string;
  observacao?: string;
  itens: { nome: string; preco: number; quantidade: number; observacao: string }[];
};

interface ModalOrderProps {
  closeModal: () => void;
  order?: Pedido | null;
}

export const ModalOrder: React.FC<ModalOrderProps> = ({ closeModal, order }) => {
  if (!order) return null;

  const total = order.itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Modal onClick={handleOutsideClick}>
      <ModalContent>
        <h2>Detalhes do Pedido #{order.numero}</h2>
        <p><strong>Cliente:</strong> {order.cliente}</p>
        <hr />
        <br></br>
        <div className="itens">
          {order.itens.map((item, index) => (
            <div key={index}>
              {
                item.observacao !== "" ?
                  <p id="obs">
                    {item.quantidade}x {item.nome} - {formatCurrency(item.preco * item.quantidade)}
                    <p id="desc"><strong>Obs:</strong> {item.observacao}</p>
                  </p> :
                  <p>{item.quantidade}x {item.nome} - {formatCurrency(item.preco * item.quantidade)}</p>

              }
            </div>
          ))}
          <br></br>
        </div>
        <hr />
        <p><strong>Total:</strong> {formatCurrency(total)}</p>
        <Close onClick={closeModal}>X</Close>
      </ModalContent>
    </Modal>
  );
};
