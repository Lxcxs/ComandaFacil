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
  border-radius: .8em;
  background: linear-gradient(to bottom, #d6313b, #a3232b);
  color: #fff;

  &:hover {
    transition: 0.1s;
    background: linear-gradient(to bottom, #c72934, #861c24);
  }
`;