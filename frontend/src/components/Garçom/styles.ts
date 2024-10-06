import styled from "styled-components";

// Garçons
export const GarconContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #333;
  color: white;
  align-items: center;
`;

export const GarconButton = styled.button`
  background-color: #00000075;
  border: none;
  padding: 10px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    margin-left: 5px;
    background-color: #007bff;
    padding: 5px;
    border-radius: 50%;
    color: white;
  }
`;

export const AddGarconButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
`;