import styled from "styled-components";

// Garçons
export const GarconContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #333;
  color: white;
  border-radius: 5px;
  width: 80vw;
  max-width: 100%; /* Limitar a largura máxima */
  margin: 0 auto; /* Centralizar na página */

  @media (max-width: 768px) {
    width: 95vw; /* Ajustar largura em telas menores */
  }

  .garcon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Grade responsiva */
    gap: 10px;
  }
`;

export const GarconCard = styled.div`
  background-color: #444;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  .garcon-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      font-size: 1.2em;
      white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
        max-width: 150px; 
        display: block; 
    }

    span#calling {
      background-color: #ffffff2c;
      padding: 5px;
      border-radius: 4px;
      font-size: 0.9em;
    }
  }

  .mesas {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    background-color: #007bff;
    padding: 5px;
    border-radius: 4px;

    span {
      display: flex;
      align-items: center;
      background-color: #222;
      padding: 3px 5px;
      border-radius: 4px;
      color: #e3e3e3;
    }
  }
`;

export const AddGarconButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start; /* Alinhar à esquerda */
  width: 150px; /* Definir uma largura fixa */

  &:hover {
    background-color: #0056b3; /* Cor de fundo ao passar o mouse */
  }
`;

// Modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #222;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #000;
  }

  button {
    padding: 10px 20px;
    margin: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:nth-child(2) {
      background-color: #ff4d4f;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;
