import styled from "styled-components";

export const InputEl = styled.input`
  width: 100%;
  border: 1px solid gray;
  background: #ffffff11;
  padding: 5px 7px;
  font-size: 1.2em;
  border-radius: 3px;
  transition: .4s;

  &:focus,
  &:hover {
    outline: none;
    border-color: #d6313b;
    background: white;
    box-shadow: 0 0 0 1px #d6313b;
    transition: .2s;
    color: #000;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 1rem;
  line-height: 1;
  padding-bottom: 0.5rem;
`;

export const Error = styled.p`
  color: #f31;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;
