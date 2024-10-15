import React, { useState } from "react";
import { client } from "../../services/axios";
import { ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "./styles";
import Input from "../Forms/Input";
import { Button } from "../../styles/Button/styles";

interface ITable {
  id: number;
  tableNumber: number;
  tablePeopleAmount: number;
  storeId: number;
}

interface TableAvailableProps {
  selectedTable: ITable | null;
  closeModal: () => void;
}

const TableAvailable: React.FC<TableAvailableProps> = ({ selectedTable, closeModal }) => {
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    numberOfPeople: selectedTable ? selectedTable.tablePeopleAmount : 1,
    orderNotes: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) {
      setError("Mesa não selecionada");
      return;
    }

    const newOrder = {
      tableId: selectedTable.id,
      customerName: orderDetails.customerName,
      numberOfPeople: orderDetails.numberOfPeople,
      orderNotes: orderDetails.orderNotes,
    };

    try {
      setLoading(true);
      await client.post("/orders", newOrder);
      console.log("Pedido criado com sucesso!");
      closeModal(); // Fechar modal após criação do pedido
    } catch (err) {
      setError("Erro ao criar pedido");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Criar Pedido para Mesa {selectedTable?.tableNumber}</h2>
          <button onClick={closeModal}>X</button>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmitOrder}>
            <Input
              type="text"
              name="customerName"
              label="Nome do Cliente"
              value={orderDetails.customerName}
              onChange={handleInputChange}
              placeholder="Digite o nome do cliente"
              required
            />
            <Input
              type="number"
              name="numberOfPeople"
              label="Número de Pessoas"
              value={orderDetails.numberOfPeople}
              onChange={handleInputChange}
              placeholder="Quantidade de pessoas"
              min={1}
              required
            />
            <label>Observações</label>
            <textarea
              name="orderNotes"
              value={orderDetails.orderNotes}
              onChange={handleInputChange}
              placeholder="Adicione observações sobre o pedido"
              rows={3}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeModal}>Cancelar</Button>
          <Button onClick={handleSubmitOrder} disabled={loading}>
            {loading ? "Criando..." : "Criar Pedido"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TableAvailable;
