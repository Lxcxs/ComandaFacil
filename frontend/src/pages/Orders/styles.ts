import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 1vw 0 90px;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #121212; /* Cor de fundo para um visual mais escuro e moderno */

  @media (max-width: 760px) {
    padding: 5vh 1vw 10vh 1vw;
  }
`;

export const Content = styled.div`
  width: 100%;
  padding-top: 5vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
`;

export const Column = styled.div`
  min-width: 400px;
  flex: 1;
  height: 90vh;
  background-color: #1e1e1e; /* Cor de fundo da coluna */
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* Sombra para profundidade */

  div.header {
    width: 100%;
    color: #fff;
    font-weight: bold;
    text-align: left;
    padding: 0.5em 1em;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    border-bottom: 2px solid #4aa7ff; /* Borda inferior para destaque */
  }

  div.title {
    display: flex;
    align-items: center;
    font-weight: bold;
    gap: 0.3em;
  }

  span#quantity {
    background: rgba(0, 0, 0, 0.5);
    padding: 0.5em 0.7em;
    border-radius: 0.6em;
    color: #fff; /* Texto branco para melhor legibilidade */
  }

  div.drag_box {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(25, 25, 25, 0.25);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
  }


  @media (max-width: 600px) {
    width: 100%;
    height: auto;
  }
`;

export const Item = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 0.7em 0.5em;
  border-radius: 0.5em;
  background-color: #181818;
  display: flex;
  flex-direction: column;
  gap: 1em;
  transition: all ease 0.3s; /* Transição suave */

  &:hover {
    background-color: #2a2a2a; /* Efeito de hover */
  }

  div.order_header {
    width: 100%;
    display: flex;
    justify-content: space-between;

    span {
      font-size: 14px;

      &#order {
        font-size: 16px;
        font-weight: bold;
      }

      &#time {
        background-color: rgba(0, 140, 255, 0.39);
        padding: 0 0.2em;
        border: 1px solid #40a7fc;
        border-radius: 5px;
      }

      &#table {
        background-color: rgba(255, 0, 0, 0.39);
        padding: 0 0.2em;
        border: 1px solid #fc4040;
        border-radius: 5px;
      }
    }
  }

  div.item_box {
    display: flex;
    flex-direction: column;
    gap: 0.3em;

    .item {
      display: flex;
      justify-content: space-between;

      span {
        font-size: 13px;
      }
    }
  }

  div.totals {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 14px;
  }

  div.footer {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    gap: 1em;

    button {
      cursor: pointer;
      color: #e3e3e3;
      border-radius: 5px;
      padding: 0.5em 0;
      transition: background-color 0.3s; /* Transição suave para o botão */

      &:hover {
        background-color: rgba(2, 179, 255, 0.8); /* Efeito de hover nos botões */
      }
    }

    button#next_btn {
      width: 100%;
      background-color: #02b3ff;
      font-weight: bold;
      text-shadow: 1px 0 1px #000;
      border: none;
    }

    button#details_btn {
      width: 100%;
      border: 1px solid #e3e3e3;
      background: transparent;
    }
  }
`;
