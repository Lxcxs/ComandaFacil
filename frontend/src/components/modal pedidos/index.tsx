import { Container, Modal, CloseButton } from "./styles";

interface ModalOrderProps {
  closeModal: () => void; // Callback para fechar o modal
}

function ModalOrder({ closeModal }: ModalOrderProps) {
  // Função para fechar o modal ao clicar fora dele
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Fecha o modal se o clique for no container e não dentro do modal
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Container onClick={handleOutsideClick}>
      <Modal>
        <div className="header">
          <h1>Modal Pedidos</h1>
          <CloseButton onClick={closeModal}>X</CloseButton>
        </div>
      </Modal>
    </Container>
  );
}

export { ModalOrder };
