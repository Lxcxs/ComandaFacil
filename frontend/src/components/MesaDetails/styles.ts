import styled from "styled-components";

export const DetailsContainer = styled.div`
  height: 100%;
  background-color: #333;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ItemPedido = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #444;
  padding: 10px;
  border-radius: 8px;
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #007bff;
  border-radius: 8px;
  font-weight: bold;
`;