import styled from "styled-components";


export const Content = styled.div`
  width: 100%;
  height: 100vh;
  padding-left: 200px;
  background-color: #121212;

  div.introduce {
    padding: 5em 0;
    display: flex;
    flex-direction: column;
    gap: 0.7em;

    p {
      color: gray;
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 2em;
  }
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
      width: 250px;
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

  @media (max-width: 1200px) {
    padding-left: 15vw;
  }
  @media (max-width: 760px) {
    padding: 0 5vw;

    div.statistics {
      justify-content: center;
    }
    div.performance,
    div.orders {
      div.bloco1,
      div.bloco2,
      div.bloco3,
      div.bloco4 {
        width: 150px;

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
