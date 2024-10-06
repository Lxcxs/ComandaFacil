import styled from "styled-components";

interface IMenu {
  menu: boolean;
}

export const DMenu = styled.div<IMenu>`
  width: ${(props) => (props.menu ? "260px" : "80px")};
  height: 100vh;
  padding: 0.5em;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 1em;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #191919;
  box-shadow: 2px 0 3px #00000059;
  transition: 0.1s ease-in-out;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1000;

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
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: ${(props) => (props.menu ? "space-between" : "center")};
    align-items: center;
    padding: 1em;
    border-radius: 0.5em;
    position: relative;
    &::after {
      content: "";
      display: block;
      width: 80%;
      height: 1px;
      background: #ffffff2d;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }

    img {
      display: ${(props) => (props.menu ? "block" : "none")};
      width: ${(props) => (props.menu ? "14%" : "100%")};
      /* background-color: #fff; */
      border-radius: 0.5em;
    }
    h4 {
      /* font-size: .8em; */
      white-space: nowrap;
      display: ${(props) => (props.menu ? "block" : "none")};
      opacity: ${(props) => (props.menu ? "1" : "0")};
      transition: 1s ease-in-out;
    }
    &:hover {
      background-color: #ffffff2d;
    }
  }

  div.navigator {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
    border-radius: 0.5em;
  }

  div.footer {
    width: 100%;
    height: 70px;
    padding: ${(props) => (props.menu ? "0 .5em" : "0")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000000;
    border-radius: 0.7em;

    img {
      width: 40px;
      height: 40px;
      transition: 1s;
      border-radius: 0.5em;
      display: ${(props) => (props.menu ? "block" : "none")};
    }

    div.profile {
      h4 {
        display: ${(props) => (props.menu ? "block" : "none")};
      }

      p {
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 0.3em;
      }
    }
    div#profile {
      display: ${(props) => (props.menu ? "flex" : "none")};
      gap: 0.5em;
      align-items: center;
    }
    a#logout {
      cursor: pointer;
      width: ${(props) => (props.menu ? "40px" : "100%")};
      height: ${(props) => (props.menu ? "100%" : "100%")};
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  div.list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
    position: relative;
    &::after {
      content: "";
      display: block;
      width: 80%;
      height: 1px;
      background: #ffffff2d;
      position: absolute;
      left: 50%;
      bottom: -2em;
      transform: translateX(-50%);
    }

    a {
      width: 100%;
      padding: ${(props) => (props.menu ? "1em" : "1em")};
      color: #e3e3e3;
      text-decoration: none;
      display: flex;
      justify-content: ${(props) => (props.menu ? "flex-start" : "center")};
      align-items: center;
      gap: 0.3em;
      border-radius: 0.3em;
      transition: all 0.1s ease-in;

      &.active {
        color: #e3e3e3;
        font-weight: bold;
        background-color: #d6313b;
        &:hover {
          color: #e3e3e3;
          font-weight: bold;
          background-color: #d6313b;
        }
      }

      &:hover {
        background-color: #d6d6d636;
      }

      span#text {
        display: ${(props) => (props.menu ? "flex" : "none")};
        align-items: center;
        gap: 1.5em;
      }
    }
  }

  div.activeMenu {
    cursor: pointer;
    width: fit-content;
    height: fit-content;
    left: ${(props) => (props.menu ? "300px" : "70px")};
    /* transform: ${(props) => (props.menu ? "rotateY(190deg)" : "0")}; */
    transition: 0.3s ease-in-out;
  }

  span#comandafacil {
    width: 100%;
    text-align: center;
    position: relative;
    color: #525252;
    font-style: italic;
    display: flex;
    opacity: ${(props) => (props.menu ? "1" : "0")};
    align-items: center;
    justify-content: center;
    &::before {
      content: "";
      display: block;
      width: 80%;
      height: 1px;
      background: #ffffff2d;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }
  }
  img#logo {
    display: block;
    align-self: center;
    width: 50px;
  }

  @media (max-width: 760px) {
    width: 100%;
    height: auto;
    padding: 0;
    gap: 0;
    transform: ${(props) => (props.menu ? "0" : "translateY(-302px)")};
    flex-direction: column-reverse;
    border-bottom-left-radius: 2em;
    border-bottom-right-radius: 2em;
    box-shadow: 0 2px 3px #00000059;
    overflow: hidden;

    span#comandafacil {
      display: none;
    }

    div.navigator {
      display: flex;
      flex-direction: column-reverse;
      border-radius: 0;
      border: none;
      padding: 0;
      gap: 0;

      div.header {
        background-color: #d6313b;
        border-radius: 0;
        padding-left: 3em;
        padding-right: 3em;
        h4 {
          display: block;
          opacity: 1;
        }
        &::after {
          display: none;
        }
      }
    }
    div.list {
      gap: 0;
      &::after {
        display: none;
      }
    }
    div.footer {
      padding: 0 1em;
      border-radius: 0;
      background-color: black;

      div#profile {
        h4 {
          display: block;
        }
      }
    }
    div.list {
      a {
        border-radius: 0;
      }
    }
    div.activeMenu {
      width: 100%;
      display: none;
      /* position: ${(props) => (props.menu ? "relative" : "fixed")}; */
      transform: none;
      text-align: center;
      transition: 1s all ease-in-out;
      z-index: 1000;
    }
    img#logo {
      display: none;
    }
  }
`;
