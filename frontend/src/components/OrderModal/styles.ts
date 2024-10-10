import styled, { keyframes } from "styled-components";

// Animação para o modal
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
`;
const slideInMobile = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

// Estilo para o fundo do modal (overlay)
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); // Fundo semi-transparente
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: ${fadeIn} 0.3s ease forwards;
`;

// Estilo para o conteúdo do modal (caixa centralizada)
export const ModalContent = styled.div`
  background-color: #222;
  padding: 20px;
  width: 400px; // Largura do modal
  height: 100vh; // Limitar a altura máxima
  overflow-y: auto; // Scroll caso o conteúdo exceda a altura
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); // Sombra para o modal
  position: absolute;
  right: 0;
  animation: ${slideIn} 0.3s ease forwards;

  div.itens {
    display: flex;
    flex-direction: column;
    gap: 10px;
    p {
      background-color: #ffffff1e;
      padding: 3px 5px;
    }
  }

  p#obs {
    padding: 3px 0px 0 0;

    p {
      font-style: italic;
      font-weight: 200;
    }
  }

  @media (max-width: 760px) {
    position: absolute;
    width: 100vw;
    height: 70vh;
    left: 0;
    right: 0;
    bottom: 52px;
    border-top-right-radius: 2em;
    border-top-left-radius: 2em;
    animation: ${slideInMobile} 0.3s ease forwards;
  }
`;
export const Close = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: #ca463d;
  border-radius: 0;
  font-weight: bold;
  position: absolute;
  bottom: 0;
  left: 0;

  &:hover {
    background-color: #f44336;
  }

  span {
    display: flex;
    align-items: center;
  }

  @media (max-width: 760px) {
    // Ajustes adicionais para o Close se necessário
    padding: 10px 0;
  }
`;

// Estilo para o botão de fechar (X)
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: red; // Efeito de hover para o botão de fechar
  }
`;

// Estilo para os textos e títulos dentro do modal
export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;

export const Item = styled.div`
  margin-bottom: 10px;

  p {
    margin: 5px 0;
    color: #555;
  }
`;

export const Total = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
  color: #000;
  text-align: right;
`;
