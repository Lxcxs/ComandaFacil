import styled from "styled-components";

export const Content = styled.div`
  width: 100%;
  height: 100vh;
  padding-left: 200px;
  padding-right: 10vw;
  background-color: #121212;

  div.info_container {
    display: flex;
    flex-direction: column;
    gap: 3em;
  }

  div.introduce {
    padding: 5em 0;
    display: flex;
    flex-direction: column;
    gap: 0.7em;

    p {
      color: #999;
    }
    span#storeName {
      background-color: #d6313b;
      padding: 0 3px;
      color: #fff;
      font-style: italic;
      text-shadow: 0 2px 3px #000;
    }
  }

  @media (max-width: 1200px) {
    padding-left: 15vw;
  }
  @media (max-width: 760px) {
    padding: 0 5vw;
    margin-bottom: 15vh;
  }
`;

export const Statistics = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2em;

  div.performance,
  div.orders {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;

    div.statistics {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1em;
    }
    div.bloco1,
    div.bloco2,
    div.bloco3,
    div.bloco4 {
      flex: 1;
      border-radius: 0.5em;
      overflow: hidden;
      .header {
        width: 100%;
        padding: 0.5em 0.5em;
        background-color: #4aa7ff;
        p {
          color: #000;
          font-weight: bold;
        }
      }
      .content {
        padding: 0.5em 0;
        background-color: #212121;
        text-align: center;
        p {
          font-size: 2em;
          font-weight: bold;
        }
      }
    }
  }
  div.orders {
    div.bloco1 > div.header {
      background-color: #da804e;
    }
    div.bloco2 > div.header {
      background-color: #dac34e;
    }
    div.bloco3 > div.header {
      background-color: #59da4e;
    }
    div.bloco4 > div.header {
      background-color: #d6313b;
    }
  }

  @media (max-width: 760px) {
    margin-bottom: 15vh;

    div.statistics {
      justify-content: center;
    }
    div.performance,
    div.orders {
      div.bloco1,
      div.bloco2,
      div.bloco3,
      div.bloco4 {
        flex: none;
        width: 100%;
        .header {
          padding: 0.4em;
          p {
            font-size: 0.7em;
          }
        }
        .content {
          p {
            font-size: 1.5em;
          }
        }
      }
    }
  }
`;

export const OrdersList = styled.section`
  width: auto;
  max-height: 200px;
  background-color: #1d1d1d;
  border-radius: 10px;
  overflow: auto;

  table{
    width: 100%;
    border: none;

    tr#table_header  {
      background-color: #222;
    }
    tr {
      transition: 1s;
    }
    th {
      padding: 10px 0;
    }
    td {
      border-right: 1px solid #222;
      padding: 10px 0;
      text-align: center;
    }
  }
`

export const ButtonStatus = styled.button<{ storeStatus: string }>`
  cursor: pointer;
  width: fit-content;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: ${(props) => (props.storeStatus === "online" ? "#fff" : "#fff")};
  font-weight: bold;
  border-radius: 12px;
  background-color: ${(props) =>
    props.storeStatus === "online" ? "#ff4d4f" : "#4caf50"};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.storeStatus === "online" ? "#d63031" : "#388e3c"};
  }

  &:active {
    transform: translateY(0);
  }
`;
