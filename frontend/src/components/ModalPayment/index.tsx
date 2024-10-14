import React, { useEffect, useRef } from 'react';
import {
  BtnMoney,
  BtnPayment,
  Container,
  Content,
  CloseButton,
} from './styles';
import { IoCloseCircle } from "react-icons/io5";

interface ModalPaymentProps {
  onClose: () => void; // Adiciona a prop onClose
}

const ModalPayment: React.FC<ModalPaymentProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <Container>
      <Content ref={modalRef}>
        <CloseButton onClick={onClose}><IoCloseCircle size={32}/></CloseButton> {/* Botão de fechar */}
        <h4>Selecione a forma de pagamento</h4>
        <BtnMoney className="money">Dinheiro</BtnMoney>
        <BtnPayment id="mercadopago">Crédito, Débito, Pix</BtnPayment>
      </Content>
    </Container>
  );
};

export default ModalPayment;
