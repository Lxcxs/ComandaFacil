import styled from "styled-components";

interface IMenu {
  menu: boolean;
}

export const DMenu = styled.div<IMenu>`
  width: ${(props) => (props.menu ? "300px" : "70px")};
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2em;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #191919;
  box-shadow: 2px 0 3px #00000059;
  transition: 0.3s ease-in-out;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #191919;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #353535;
    border-radius: 20px;
    border: 3px solid #191919;
  }

  div.header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    img {
      width: 70%;
      height: auto;
      padding: ${(props) => (props.menu ? "2em" : ".5em")};
      transition: 1s;
      border-radius: 50%;
    }

    div.profile {
      width: 100%;
      padding: 0 1em;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      h1 {
        display: ${(props) => (props.menu ? "block" : "none")};
      }

      p {
        display: flex;
        align-items: center;
        gap: 0.3em;
      }
    }
  }

  div.navigator {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
      width: 100%;
      padding: 1em 1.4em;
      color: #fff;
      text-decoration: none;
      display: flex;
      justify-content: space-between;
      border-bottom: ${(props) => (props.menu ? "1px solid gray" : "none")};
      transition: all 0.1s ease-in;

      &:hover {
        color: #d6313b;
        background-color: #212121;
      }

      span {
        display: flex;
        align-items: center;
        gap: 1.5em;
      }
    }
  }

  div.activeMenu {
    cursor: pointer;
    width: fit-content;
    height: fit-content;
    position: fixed;
    top: 50%;
    left: ${(props) => (props.menu ? "300px" : "70px")};
    transform: ${(props) => (props.menu ? "0" : "rotateY(190deg)")};
    transition: 0.3s ease-in-out;
  }

  @media (max-width: 760px) {
    width: 100%;
    height: auto;
    gap: 0;
    transform: ${(props) => (props.menu ? "0" : "translateY(-400px)")};
    border-bottom-left-radius: 2em;
    border-bottom-right-radius: 2em;
    box-shadow: 0 2px 3px #00000059;
    overflow: visible;

    div.header {
      flex-direction: row;
      padding: 1em;
      background-color: #101010;
      img {
        width: 25vw;
        padding: 0;
      }
      div.profile {
        h1 {
          font-size: 1.2em;
        }
        p {
          font-size: 0.8em;
        }
      }
    }
    div.activeMenu {
      width: 100%;
      height: fit-content;
      position: ${(props) => (props.menu ? "relative" : "fixed")};
      top: ${(props) => (props.menu ? "none" : "400px")};
      left: 0;
      transform: none;
      text-align: center;
      background-color: #212121;
      transition: 1s all ease-in-out;
      z-index: 1000;

      svg {
        transition: 1.5s ease-in-out;
        transform: ${(props) =>
          props.menu ? "rotate(-90deg)" : "rotate(90deg)"};
      }
    }
  }
`;