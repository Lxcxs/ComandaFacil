// src/styles.ts
import styled from "styled-components";

export const Container = styled.div`
width: 100%;
  background-color: #222; 
  min-height: 100vh;
  color: #fff; 
  padding: 20px 10px;
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;

  div.footer {
    position: fixed;
    bottom: 45px;
    left: 0;
    background-color: #111;
    width: 100%;
  }
`;
export const OrderItem = styled.div<{ status: string }>`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
    border: ${({ status }) =>
        status === 'canceled' ? '1px solid #333' :
            'none'};
    background-color: ${({ status }) =>
        status === 'canceled' ? '#transparent' :
            '#333'};
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

    #icons {
        display: flex;
        align-items: center;
        color: ${({ status }) =>
        status === "waiting"
            ? "#DA804E"
            : status === "making"
                ? "#DAC34E"
                : status === "finished"
                    ? "#59DA4E"
                    : "#fff"};
    }
`;

export const Header = styled.div`
    display: flex;
    height: 5em;
    flex-direction: column;
    background-color: #202020;

    div.title {
      display: flex;
      justify-content: space-between;
    }

    h2 {
      color: #0099ff;
      display: flex;
      align-items: center;
    }
`;

export const ItemList = styled.div`
  padding-bottom: 10em;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  background-color: #1e1e1e;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;

  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 5px;
  }

  span {
    flex: 1;
    margin-right: 10px;
  }
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #0099ff;
  padding: 10px;
  font-size: 24px;
`;

export const BtnPayment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #32b132;
  padding: 15px;
  font-size: 24px; 



  &:hover {
    background-color: #298629;
  }
`;
