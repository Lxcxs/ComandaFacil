import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  width: 100%;
  height: auto;
  padding: .8em 0;
  text-align: center;
  font-size: 1em;
  text-transform: capitalize;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  background: #d6313b;
  color: #e3e3e3;
  transition: 0.1s;

  &:hover {
    background:#ad232f;
  }
`;