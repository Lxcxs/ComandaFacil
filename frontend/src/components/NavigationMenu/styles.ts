import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 0;
  display: flex;
  flex-direction: column-reverse;
  gap: 0;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #2a2a2a;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 1000;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #2a2a2a;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 10px;
  }

  div.navigator {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 0;
    background-color: #333;
    padding: 0;
  }

  div.list {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;

    a {
      width: 100%;
      padding: 8px 0;
      color: #e3e3e3;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: background-color 0.3s;

      .icon {
        font-size: 18px;
      }

      &.active {
        color: #d6313b;
        background-color: transparent;

        &:hover {
          color: #d6313b;
          background-color: transparent;
        }
      }

      &:hover {
        background-color: rgba(214, 214, 214, 0.2);
      }

      span#text {
        display: block;
        font-size: 10px;
        font-weight: normal;
      }
    }
  }

  div.activeMenu {
    display: none;
  }

  span#comandafacil {
    display: none;
  }

  img#logo {
    display: none;
  }
`;
