import styled from "styled-components";

// Grid de Mesas
export const GridContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 80px 20px 20px 20px;
  height: 100%;

  @media (max-width: 550px) {
    gap: 5px;
  }
`;

export const MesaButton = styled.button<{ status: string }>`
  width: 250px;
  height: 150px;
  background-color: ${(props) =>
    props.status === "available" ? "#4CAF50" :
    props.status === "occupied" ? "#f44336" :
    "#ccc"};
  border: 1px solid ${(props) =>
    props.status === "available" ? "#66ca69" :
    props.status === "occupied" ? "#ff5f54" :
    "#ccc"};;
  color: white;
  font-size: 24px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${(props) => 
      props.status === "available" ? "#398a3d" : 
      props.status === "occupied" ? "#d4312e" : 
      "#bbb"};
  }

  @media (max-width: 760px) {
    height: 200px;
  }

  @media (max-width: 550px) {
    width: 100px;
    height: 80px;
    font-size: 18px; /* Reduzido para melhor legibilidade */
  }

  @media (max-width: 400px) {
    width: 40%;
    height: 80px;
    font-size: 20px; /* Ajustado para caber melhor */
    font-weight: bold;
  }
`;
