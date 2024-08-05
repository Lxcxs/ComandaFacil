import styled from "styled-components";

interface IToggle {
  status: boolean;
}

export const Container = styled.section`
  width: 100vw;
  height: 100vh;
  max-height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Header = styled.nav`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid gray;
  position: absolute;
  top: 0;
  z-index: 10;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 1em;
  flex-direction: column;
  padding-top: 10vh;
  @media (max-width: 700px) {
    padding: 20vh 1em 0 1em;
  }
`;

export const Form = styled.form`
  width: 600px;
  height: fit-content;
  padding: 1em;
  display: flex;
  gap: 2em;
  flex-direction: column;
  /* border: 2px solid gray; */
  border-radius: 1.5em;
  background-color: #202020;

  div#select {
    width: 100%;
    border: 1px solid #9f9f9f;
    padding: 1em;
    border-radius: 1em;
    h3 {
    color: #9f9f9f;
    font-size: .9em;
    font-weight: 600;
    padding-bottom: .3em;
    }
    select {
      width: 100%;
      outline: none;
      background-color: inherit;
      color: #707070;
      font-size: 1em;
      option {
        background-color: black;
        padding: 1em;
        outline: none;
      }
    }
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const TitleForm = styled.h1`
  text-align: center;
  font-size: 1.5em;

  @media (max-width: 700px) {
    font-size: 1.2em;
  }
`;

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
  border-radius: 1em;
  background: linear-gradient(to bottom, #d6313b, #a3232b);
  color: #fff;

  &:hover {
    transition: 0.1s;
    background: linear-gradient(to bottom, #c72934, #861c24);
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
  color: #ff0000;
  font-weight: 400;
`;

export const ToggleBtn = styled.div<IToggle>`
  cursor: pointer;
  width: 300px;
  min-height: 65px;
  border-radius: 2em;
  background: #ffffff34;
  padding: .5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;

  div {
    width: 100%;
    text-align: center;
  }
  div.bg {
    background-color: #d6313b;
    width: 50%;
    height: 80%;
    border-radius: 2em;
    position: absolute;
    transform: ${(props) => props.status ? "translateX(0)" : "translateX(90%)"};
    transition: .5s ease-out;
    z-index: -1;
  }
`;
