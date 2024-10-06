import styled from "styled-components";
// Grid de Mesas
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px;
  height: 100%;
`;

export const MesaButton = styled.button<{ status: string }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.status === "disponivel" ? "#4CAF50" : props.status === "ocupado" ? "#f44336" : "#ccc"};
  border: 2px solid ${(props) => (props.status === "selecionado" ? "#0000FF" : "transparent")};
  color: white;
  font-size: 24px;
  border-radius: 4px;
  cursor: pointer;
`;