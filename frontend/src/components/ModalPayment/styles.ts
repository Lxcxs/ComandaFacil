import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000a2;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
`;

export const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

// styles.js (ou styles.ts)

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    color: #ff0000; // Muda a cor ao passar o mouse
  }
`;


export const BtnMoney = styled.button`
  cursor: pointer;
  width: 300px;
  padding: 20px;
  text-align: center;
  color: #fff;
  background-color: #d6313b;
  border: none;
  border-radius: 10px;
  margin-top: 10px;

  &:hover  {
    background-color: #a3232c;
  }
`;

export const BtnPayment = styled.button`
  cursor: pointer;
  width: 300px;
  padding: 20px;
  text-align: center;
  color: #fff;
  background-color: #0099ff;
  border: none;
  border-radius: 10px;
  margin-top: 10px;

  &:hover {
    background-color: #1378bb;
  }
`;
