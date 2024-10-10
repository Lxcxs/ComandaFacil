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

interface ModalProps {
  item: {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ModalSelectItem: React.FC<ModalProps> = ({ item, isOpen, onClose }) => {
  const [count, setCount] = useState<number>(1);

  if (!isOpen) return null;

  function addItem() {
    setCount(count+1);
  }
  function removeItem() {
    if (count > 1) {
      setCount(count-1);
    } else return;
  }

  function handleOutsideClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <ModalBackground onClick={handleOutsideClick}>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <FaTimes size={20} />
        </CloseButton>
        <ItemImage imgSrc={item.imageUrl} />
        <ModalContent>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <label>Alguma observação?</label>
          <textarea placeholder="Ex: Retirar passas, ponto da carne..." />
          <ItemInfo>
            <h3>{formatCurrency(item.price * count)}</h3>
            <QuantityControl>
              <button onClick={removeItem}>-</button>
              <span>{count}</span>
              <button onClick={addItem}>+</button>
            </QuantityControl>
          </ItemInfo>
          <AddButton>Adicionar</AddButton>
        </ModalContent>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalSelectItem;