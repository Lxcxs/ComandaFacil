import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: 100%;
`;

export const Header = styled.nav`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid gray;
`;

export const Content = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 10vh;
`;

export const Form = styled.form`
  width: 500px;
  padding: 1.5em;
  display: flex;
  gap: 2em;
  flex-direction: column;
  /* border: 2px solid gray; */
  border-radius: 10px;
`;

export const TitleForm = styled.h1`
  text-align: center;
  font-size: 1.5em;
`;

export const Button = styled.button`
  cursor: pointer;
  width: 100%;
  height: auto;
  padding: 10px 0;
  text-align: center;
  font-size: 1em;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  background: #d6313b;
  color: #fff;

  &:hover {
    transition: .1s;
    background: #a01e27;
  }
`;

export const InpuText = styled.input`
  width: 100%;
  border: 1px solid gray;
  background: #ffffff11;
  padding: 5px 7px;
  font-size: 1.2em;
  border-radius: 3px;
`;

export const InputContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const NoticeError = styled.p`
  color: red;
  font-weight: bold;
`
