import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0; // Começa fora da tela à direita
  }
  100% {
    opacity: 1; // Termina na posição normal
  }
`;
const slideIn = keyframes`
  0%{
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
`;
const slideInMobile = keyframes`
  0%{
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.425);
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  animation: ${fadeIn} .3s forwards ease;
`;

export const DetailsContainer = styled.div`
  width: 400px; // Você pode ajustar o tamanho conforme necessário
  height: auto;
  background-color: #202020;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  box-shadow: 0 -3px 5px #0000008e;
  overflow: auto;
  animation: ${slideIn} .3s forwards ease;

  @media (max-width: 760px) {
    animation: ${slideInMobile} .3s forwards ease;
    width: 100%;
    height: 70vh;
    position: absolute;
    bottom: 0;
    border-top-right-radius: 2em;
    border-top-left-radius: 2em;
  }

  .details_header {
    display: flex;
    padding: 10px;
    height: 5em;
    flex-direction: column;
    position: sticky;
    top: 0;
    background-color: #202020;
  }

  .item_list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input {
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #ccc;
      background-color: #fff;
      color: #000;
    }
  }

  .footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
`;
export const Add = styled.button`
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-weight: bold;
    background-color: #1e7cd3;
    color: #fff;
    border: none;
    border-radius: 4px;
    &:hover {
        background-color: #3e87db;

    }
`;

export const Close = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #ca463d;
  border-radius: 0;
  font-weight: bold;
  border-radius: 4px;

  &:hover {
    background-color: #f44336;
  }
`;
