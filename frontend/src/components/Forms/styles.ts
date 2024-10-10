import styled from "styled-components";


export const InputField = styled.div`
  width: 100%;
  border: 1px solid gray;
  background: transparent;
  padding: 10px 10px;
  border-radius: 10px;

  label {
    color: #9f9f9f;
    font-size: .9em;
    font-weight: 600;
  }
  p {
    color: #9fb5ff;
    font-style: italic;
    /* font-weight: 200; */
    font-size: 85%;
  }

`
export const InputEl = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  font-size: 1.2em;
  transition: .4s;
  border-bottom: 1px solid transparent;

  &:focus,
  &:hover {
    outline: none;
    background-color: #ffffff13;
    border-bottom: 1px solid #D6313B;
    transition: .2s;
  }

  @media (max-width: 700px) {
    font-size: 1em;
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
