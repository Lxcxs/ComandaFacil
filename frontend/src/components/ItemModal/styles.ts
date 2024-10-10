import styled, { keyframes } from 'styled-components';
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
  background-color: rgba(0, 0, 0, 0.493);
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  animation: ${fadeIn} 0.3s ease forwards;

  @media (max-width: 760px) {
    justify-content: center;
  }
`;

export const ModalContent = styled.div`
    width: 550px;
  height: 100vh;
  padding: 20px;
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
    bottom: 52px;
    left: 0;
    animation: ${slideInMobile} 0.3s ease forwards;
    border-top-right-radius: 2em;
    border-top-left-radius: 2em;
  }
`

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ModalBody = styled.div`
    margin-top: 20px;
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

export const Button = styled.button`
    margin-left: 10px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #000;
    border-radius: 4px;
    color: #000;
`;

export const Textarea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #000;
    border-radius: 4px;
    resize: none;
`;
