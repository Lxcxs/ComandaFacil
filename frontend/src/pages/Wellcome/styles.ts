import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  height: 100%;

`

export const Content = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 7vw;
  }
  h3 {
    font-size: 4vw;

    span {
      color: #D6313B;
    }
  }
  img {
    width: 15vw;
  }
  div.container {
    width: auto;
    display: flex;
    gap: 10px;
    div {
      margin-top: 5vh;
      max-width: 400px;
      min-width: 200px;
      span#warn {
        font-size: 12px;
        color: #ddd;
      }
      button {
        cursor: pointer;
        margin-top: 10px;
        width: auto;
        padding: 10px 20px;
        border-radius: 10px;
        border: none;
        color: white;
        font-weight: bold;
        background-color: #D6313B;
        display: flex;
        gap: 5px;
        align-items: center;
        &:hover {
          background-color: #a81a23;
          transition: .1s;
        }
      }
    }
  }

  @media (max-width: 850px) {
    img {
      width: 30vw;
    }
    div.container {
      flex-direction: column;
      padding: 0 10px;
      div {
        button {
          width: 100%;
          justify-content: center;
        }

      }
    }
  }
`