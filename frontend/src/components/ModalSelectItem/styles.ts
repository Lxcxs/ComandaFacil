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
export const ModalBackground = styled.div`
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

export const ModalContainer = styled.div`
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

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #00000088;
  padding: 7px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  border: none;
  color: #fff;
  cursor: pointer;
  z-index: 1000;
`;

export const ItemImage = styled.div<{imgSrc: string}>`
  width: 100%;
  height: 230px;
  object-fit: cover;
  background: url(${(props) => props.imgSrc});
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
`;

export const ModalContent = styled.div`
  margin-top: 230px;
  color: #fff;
  overflow-y: auto;

  h3 {
    margin-bottom: 7px;
  }

  p {
    margin-bottom: 20px;
    -webkit-line-clamp: 4;
    font-size: 14px;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
    font-size: 13px;
  }

  textarea {
    width: 100%;
    height: 60px;
    padding: 10px;
    background-color: #333;
    border: 1px solid #444;
    border-radius: 5px;
    color: #fff;
    margin-bottom: 20px;
    resize: none;
  }
`;

export const ItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.5em;
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    background-color: #444;
    border: none;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
  }

  span {
    font-size: 1.2em;
  }
`;

export const AddButton = styled.button`
  width: 100%;
  background-color: #d6313b;
  color: #fff;
  padding: 15px;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #b5292e;
  }
`;
