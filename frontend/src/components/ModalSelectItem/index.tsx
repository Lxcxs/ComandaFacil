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
  QuantityControl
} from "./styles";
import { formatCurrency } from "../../utils/formatCurrency";

interface Item {
  id: number;
  itemName: string;
  itemDescription: string;
  itemValue: number;
  itemStatus: string;
  itemImage: string;
  categoryId: number;
  storeId: number;
}

interface ModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: Item, quantity: number, costumerNote: string) => void;
}

const ModalSelectItem: React.FC<ModalProps> = ({ item, isOpen, onClose, onAddItem }) => {
  const [count, setCount] = useState<number>(1);
  const [costumerNote, setCostumerNote] = useState<string>(""); // Estado para armazenar a observação

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
    onAddItem(item, count, costumerNote);
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
          <h3>{item.itemName}</h3>
          <p>{item.itemDescription}</p>
          <label>Alguma observação?</label>
          <textarea
            placeholder="Ex: Retirar passas, ponto da carne..."
            value={costumerNote}
            onChange={(e) => setCostumerNote(e.target.value)}
          />
          <ItemInfo>
            <h3>{formatCurrency(item.itemValue * count)}</h3>
            <QuantityControl>
              <button onClick={removeItem}>-</button>
              <span>{count}</span>
              <button onClick={addItem}>+</button>
            </QuantityControl>
          </ItemInfo>
          <AddButton onClick={handleAddItem}>Adicionar</AddButton>
        </ModalContent>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalSelectItem;
