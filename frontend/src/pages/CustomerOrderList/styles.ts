import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slideInMobile = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  div.searchBar {
    width: 100%;
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    padding: 10px 10px;
    background-color: #222;
    box-shadow: 0 3px 10px #00000073;

    input {
      width: 100%;
      padding: 15px 10px;
      background-color: #333;
      border: none;
    }
  }
`

export const OrderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  padding: 5vh 10px 10vh 10px;
`;

export const OrderItem = styled.div<{ status: string }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  border: ${({ status }) =>
    status === "canceled" ? "1px solid #333" : "none"};
  background-color: ${({ status }) =>
    status === "canceled" ? "#transparent" : "#2b2b2b"};
  border-radius: 8px;
  cursor: pointer;

  .item_container {
    display: flex;
    gap: 16px;

    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
    }

    .item_info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      #item_title {
        font-weight: bold;
        font-size: 14px;
      }

      #text {
        font-size: 14px;
        color: #cccccc;
      }

      h4 {
        margin: 0;
        font-size: 14px;
        margin-top: 5px;
        font-weight: 500;
      }
    }
  }
  div.individual {
    display: flex;
    gap: 5px;
    align-items: center;
    #iperson {
      color: #3a85e9;
    }
    #guestName {
      font-style: italic;
      font-size: 12px;
    }
  }
  #icons {
    display: flex;
    align-items: center;
    font-style: italic;
    color: ${({ status }) =>
      status === "waiting"
        ? "#DA804E"
        : status === "producing"
        ? "#DAC34E"
        : status === "finished"
        ? "#59DA4E"
        : "#fff"};
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: ${fadeIn} 0.3s ease forwards;
`;

export const ModalContent = styled.div<{ itemImage: string; status: string }>`
  background: #222;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  height: 70vh;
  position: absolute;
  bottom: 45px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-top-right-radius: 2em;
  border-top-left-radius: 2em;
  animation: ${slideInMobile} 0.3s ease forwards;

  h3 {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  div.itemImage {
    width: 100%;
    height: 170px;
    background: url(${(props) => props.itemImage});
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
  }
  div.itemInfo {
    padding-top: 170px;
    #price {
      margin-bottom: 5px;
      color: #e9abb5;
    }
    h4 {
      margin-bottom: 15px;
    }
    #status {
      display: flex;
      align-items: center;
      gap: 3px;
      font-size: 14px;
      color: ${({ status }) =>
        status === "waiting"
          ? "#DA804E"
          : status === "producing"
          ? "#DAC34E"
          : status === "finished"
          ? "#59DA4E"
          : "#ff3300"};
    }
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;
  background: #222;
  color: #fff;
  border: none;
  font-size: 1.5rem;
  z-index: 1000;
  cursor: pointer;
`;
