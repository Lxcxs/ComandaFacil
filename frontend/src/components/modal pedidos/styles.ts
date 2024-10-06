import styled from "styled-components";

export const Container = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

export const Modal = styled.div`
  width: 90%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 1em;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    margin: 0;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  padding: 0 10px;
  color: #333;

  &:hover {
    color: #ff0000;
  }
`;
