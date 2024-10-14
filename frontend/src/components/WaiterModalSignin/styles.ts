import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: ${fadeIn} 0.3s ease forwards;
`;

export const ModalContent = styled.div`
  width: 100%;
  max-height: 90vh;
  background-color: #222222;
  border-top-right-radius: 2em;
  border-top-left-radius: 2em;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 40px;
  overflow: auto;
  animation: ${slideInMobile} 0.3s ease forwards;
`;

export const FormField = styled.div`
  margin-bottom: 15px;
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    color: #000;

    &:focus {
      border-color: #007bff; /* Cor do foco */
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Sombra ao foco */
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  background-color: #007bff; /* Cor do botão */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;

  &#enviar {
    background-color: 
    #377cca;
  }
  &#fechar {
    margin-top: 5px;
    background-color: #e62c1f;
  }

`;
