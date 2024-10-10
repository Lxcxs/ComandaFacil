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
  animation: ${fadeIn} 0.3s ease forwards;

  @media (max-width: 760px) {
    justify-content: center;
  }
`;



export const DetailsContainer = styled.div<{status?: boolean}>`
  width: 550px;
  height: 100vh;
  background-color: #202020;
  color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  right: 0;
  box-shadow: 0 -3px 5px #0000008e;
  overflow: auto;
  animation: ${slideIn} 0.3s ease forwards;

  @media (max-width: 760px) {
    width: 100%;
    height: 80vh;
    position: absolute;
    bottom: ${(props) => (props.status === true ? "0px" : "52px")};
    animation: ${slideInMobile} 0.3s ease forwards;
    border-top-right-radius: 2em;
    border-top-left-radius: 2em;
  }

  div.details_header {
    display: flex;
    padding: 10px;
    height: 5em;
    flex-direction: column;
    position: sticky;
    top: 0;
    background-color: #202020;

    @media (max-width: 760px) {
      padding: 20px;
    }

    div.title {
      display: flex;
      justify-content: space-between;
    }

    h2 {
      color: #0099ff;
      display: flex;
      align-items: center;
    }
  }

  div.item_list {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  div.footer {
    width: 100%;
  }
`;

export const ItemPedido = styled.div<{ status: string }>`
  cursor: default;
  display: flex;
  justify-content: space-between;
  background-color: #333;
  padding: 10px;
  border-radius: 5px;
  transition: all ease-in 0.1s;

  &:hover {
    background-color: #444;
  }

  div.item_container {
    height: auto;
    display: flex;
    gap: 10px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 5px;
    }

    div.item_info {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1vh;
      font-size: 14px;

      span#item_title {
        font-weight: bold;
      }

      span#text {
        color: #e3e3e3;
        font-weight: 300;
        font-size: 14px;
      }
    }
  }

  span#icons {
    color: ${({ status }) =>
      status === "waiting"
        ? "#DA804E"
        : status === "making"
        ? "#DAC34E"
        : status === "finished"
        ? "#59DA4E"
        : "#fff"};
    border: 2px solid ${({ status }) =>
      status === "selecionado" ? "#0000FF" : "transparent"};
  }
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #0099ff;
  border-radius: 0;
  font-weight: bold;
  position: sticky;
  top: 72px;

  @media (max-width: 760px) {
    width: 100%;
    top: 5em;
    padding: 15px;
  }
`;
export const ButtonsContainer = styled.div`
  width: 100%;
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: 2fr 1fr;
`
export const FecharContaButton = styled.button`
  background-color: #3ec445; /* Verde */
  color: white;
  border: none;
  font-size: 16px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #45a049; /* Verde mais escuro */
  }
`;
export const Close = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  background-color: #ca463d;
  border-radius: 0;
  font-weight: bold;

  &:hover {
    background-color: #f44336;
  }

  span {
    display: flex;
    align-items: center;
  }

  @media (max-width: 760px) {
    // Ajustes adicionais para o Close se necessário
    
  }
`;
