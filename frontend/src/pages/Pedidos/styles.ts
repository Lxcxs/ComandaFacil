import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 1vw 0 10em;
  /* padding-left: 200px; */
  /* padding-right: 2em; */
  display: flex;
  justify-content: center;
  position: relative;

  @media (max-width: 760px) {
    padding: 5vh 1vw 0 1vw;
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

  @media (max-width: 760px) {
    
  }
`;

export const Column = styled.div`
  min-width: 400px;
  flex: 1;
  height: 90vh;
  background-color: orange;
  position: relative;
  overflow: hidden;
  overflow-y: auto;

  div.header {
    width: 100%;
    color: #fff;
    font-weight: bold;
    width: 100%;
    text-align: left;
    padding: 0.5em 1em;
    background: #00000086;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
  }
  div.title {
    display: flex;
    align-items: center;
    font-weight: bold;
    gap: 0.3em;
  }
  span#quantity {
    background: #00000063;
    padding: 0.5em 0.7em;
    border-radius: 0.6em;
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
    background: #19191925;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #00000083;
    border-radius: 0;
  }
  @media (max-width: 600px) {
    height: 100%;
  }
`;

export const Item = styled.div`
cursor: grab;
  width: 100%;
  height: auto;
  padding: 0.7em 0.5em;
  border-radius: 0.5em;
  background-color: #181818;
  display: flex;
  flex-direction: column;
  gap: 1em;
  transition: all ease 1s;

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
        background-color: #008cff62;
        padding: 0 0.2em;
        border: 1px solid #40a7fcff;
        border-radius: 5px;
      }
      &#table {
        background-color: #ff000062;
        padding: 0 0.2em;
        border: 1px solid #fc4040ff;
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
      padding: .5em 0;
    }
    button#next_btn {
      width: 100%;
      background-color: #02B3FF;
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
