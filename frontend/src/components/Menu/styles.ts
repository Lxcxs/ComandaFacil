import styled from "styled-components";

interface IMenu {
  menu: boolean;
}

export const DMenu = styled.div<IMenu>`
  width: ${(props) => (props.menu ? "260px" : "80px")};
  height: 100vh;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  position: fixed;
  left: 0;
  background-color: #2a2a2a; /* Cor de fundo mais clara */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5); /* Sombra mais suave */
  transition: width 0.3s ease; /* Transição suave para a largura */
  overflow-y: auto;
  z-index: 1000;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #2a2a2a;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #555; /* Mudança na cor do scrollbar */
    border-radius: 10px;
  }

  div.header {
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: ${(props) => (props.menu ? "space-between" : "center")};
    align-items: center;
    padding: 1em;
    border-radius: 8px; /* Bordas mais arredondadas */
    background-color: #444; /* Fundo do header */
    transition: background-color 0.3s;

    &:hover {
      background-color: #555; /* Efeito hover */
    }

    img {
      display: ${(props) => (props.menu ? "block" : "none")};
      width: 20%; /* Ajuste no tamanho da imagem */
      border-radius: 5px;
    }
    h4 {
      display: ${(props) => (props.menu ? "block" : "none")};
      transition: opacity 0.3s;
      opacity: ${(props) => (props.menu ? "1" : "0")};
    }
  }

  div.navigator {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
    border-radius: 8px;
    background-color: #333; /* Fundo do navegador */
    padding: 0;
    overflow: hidden;
  }

  div.footer {
    width: 100%;
    height: 70px;
    padding: ${(props) => (props.menu ? "0 1em" : "0")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #222; /* Fundo do footer */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.5); /* Sombra no footer */

    img {
      width: 40px;
      height: 40px;
      transition: transform 0.3s;
      border-radius: 5px;
      display: ${(props) => (props.menu ? "block" : "none")};

      &:hover {
        transform: scale(1.1); /* Efeito de aumento ao passar o mouse */
      }
    }

    div.profile {
      h4 {
        display: ${(props) => (props.menu ? "block" : "none")};
        color: #e3e3e3; /* Cor do texto */
      }

      p {
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 0.3em;
        color: #e3e3e3; /* Cor do texto */
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
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #e3e3e3; /* Cor do logout */
    }
  }

  div.list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    a {
      width: 100%;
      padding: ${(props) => (props.menu ? "1em" : "1em")};
      color: #e3e3e3;
      text-decoration: none;
      display: flex;
      justify-content: ${(props) => (props.menu ? "flex-start" : "center")};
      align-items: center;
      gap: 0.3em;
      transition: background-color 0.3s;

      .icon {
        font-size: 22px;
      }

      &.active {
        border-radius: 4px;
        font-weight: bold;
        background-color: #d6313b; /* Cor para ativo */
        &:hover {
          background-color: #d6313b; /* Efeito hover para ativo */
        }
      }

      &:hover {
        background-color: rgba(214, 214, 214, 0.2); /* Efeito hover */
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
    transition: transform 0.3s ease-in-out;
  }

  span#comandafacil {
    width: 100%;
    text-align: center;
    position: relative;
    color: #b0b0b0; /* Cor do texto */
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
    border-top: 1px solid #333;
    padding: 0;
    gap: 0;
    bottom: 0;
    flex-direction: column-reverse;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
    overflow: hidden;

    span#comandafacil {
      display: none;
    }

    div.navigator {
      flex-direction: column-reverse;
      border-radius: 0;
      padding: 0;
      gap: 0;

      div.header {
        display: none;
        background-color: #333;
        border-radius: 0;
        padding-left: 3em;
        padding-right: 3em;
        h4 {
          display: block;
          opacity: 1;
        }
      }
    }

    div.list {
      gap: 0;
      flex-direction: row;

      a {
        border-radius: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 8px 0;

        .icon {
          font-size: 18px;
        }

        span#text {
          display: block;
          font-size: 10px;
          font-weight: normal;
        }

        &.active {
          color: #d6313b;
          background-color: transparent;
          &:hover {
            color: #d6313b;
            background-color: transparent;
          }
        }
      }
    }

    div.activeMenu {
      width: 100%;
      display: none;
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
