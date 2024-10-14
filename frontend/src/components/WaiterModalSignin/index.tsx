import React, { useState } from "react";
import { ModalContainer, ModalContent, FormField, Button } from './styles'; // Importando a estilização
import { NavLink } from "react-router-dom";

interface WaiterTableFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cliente: string, pessoas: number) => void;
}

const WaiterTableFormModal: React.FC<WaiterTableFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [cliente, setCliente] = useState("");
  const [pessoas, setPessoas] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(cliente, pessoas);
    onClose();
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h2>Informações da Mesa</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <label>Nome do Cliente</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <label>Quantidade de Pessoas</label>
            <input
              type="number"
              value={pessoas}
              onChange={(e) => setPessoas(Number(e.target.value))}
              min={1}
              required
            />
          </FormField>
          <NavLink to="/waiter/cardapio">
            <Button type="submit" id="enviar">Enviar</Button>
          </NavLink>
        </form>
        <Button onClick={onClose} id="fechar">Fechar</Button>
      </ModalContent>
    </ModalContainer>
  );
};

export default WaiterTableFormModal;
