import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import {
  ModalBackground,
  ModalContainer,
  ModalContent,
  CloseButton,
  ItemImage,
  ItemInfo,
  AddButton,
  QuantityControl,
  Individual
} from "./styles";
import { formatCurrency } from "../../utils/formatCurrency";
import Input from "../Forms/Input";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  image: string;
  categoryId: number;
  storeId: number;
}

interface ModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: Item, quantity: number, costumerNote: string, guestName?: string) => void;
}

const ModalSelectItem: React.FC<ModalProps> = ({ item, isOpen, onClose, onAddItem }) => {
  const [count, setCount] = useState<number>(1);
  const [costumerNote, setCostumerNote] = useState<string>("");
  const [isIndividual, setIsIndividual] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>("");

  if (!isOpen) return null;

  function addItem() {
    setCount(count + 1);
  }

  function removeItem() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  function handleOutsideClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleAddItem() {
    onAddItem(item, count, costumerNote, guestName);
    onClose();
  }

  return (
    <ModalBackground onClick={handleOutsideClick}>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <FaTimes size={20} />
        </CloseButton>
        <ItemImage imgSrc="https://images.tcdn.com.br/img/img_prod/832602/noticia_17733781276603f26fd6998.png" />
        <ModalContent>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <label>Alguma observação?</label>
          <textarea
            placeholder="Ex: Retirar passas, ponto da carne..."
            value={costumerNote}
            onChange={(e) => setCostumerNote(e.target.value)}
          />
          <Individual>
            <label>
              <input
                type="checkbox"
                checked={isIndividual}
                onChange={() => setIsIndividual(!isIndividual)}
                className="checkBox"
                />
                <span>Pedido individual?</span>
            </label>
          </Individual>
          {isIndividual && (
            <div>
              <label>Nome do cliente:</label>
              <Input
                label=""
                name="guest"
                required={false}
                type="text"
                placeholder="Digite o nome do cliente"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
            </div>
          )}
          <ItemInfo>
            <h3>{formatCurrency(item.price * count)}</h3>
            <QuantityControl>
              <button onClick={removeItem}>-</button>
              <span>{count}</span>
              <button onClick={addItem}>+</button>
            </QuantityControl>
          </ItemInfo>
          <AddButton onClick={handleAddItem}>Fazer pedido</AddButton>
        </ModalContent>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalSelectItem;
