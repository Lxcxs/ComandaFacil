import styled from "styled-components";

export const CategoryLink = styled.a<{ active: boolean }>`
  padding: 10px 15px;
  text-decoration: none;
  color: ${({ active }) => (active ? "#000" : "#555")};
  border-bottom: ${({ active }) => (active ? "2px solid #000" : "none")};
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

export const Container = styled.main`
  margin: 0 auto;
  max-width: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2vh 0;
  background-color: #121212f5;
  color: #f2f2f2;
`;

export const Header = styled.div<{ status?: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 2vh 10px;
  background-color: #121212f5;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  div.header_info {
    width: 100%;
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 18px;
      color: #f2f2f2;
    }

    span {
      color: ${(props) => (props.status === "online" ? "#01ff01" : "red")};
      display: flex;
      gap: 5px;
      align-items: center;
      font-size: 14px;
    }
  }
`;

export const MenuContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 0 10px;
  padding-bottom: 8vh;
`;

export const Categories = styled.nav`
  display: flex;
  width: 100%;
  overflow-x: auto; /* Habilita o scroll horizontal */
  position: sticky;
  justify-content: flex-start;
  top: -1px;
  background-color: #2b2b2b;
  border-bottom: 2px solid #444;
  padding: 0;
  z-index: 999;

  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #666;
    border-radius: 10px;
  }

  a {
    text-decoration: none;
    color: #d6313b;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;
    padding: 20px;
    white-space: nowrap;
    transition: background-color 0.2s ease-in-out;
    flex-shrink: 0;
  }
`;

export const MenuList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;

  div.categories {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;

    h2 {
      margin-top: 1em;
    }

    div.section {
      display: flex;
      flex-direction: column;
      gap: 0px;
    }
  }
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #333;
  color: #fff;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #d6313b;
  }
`;

export const ItemSelf = styled.div<{ itemStatus: string }>`
  width: 100%;
  /* border-radius: 10px; */
  border-bottom: 1px solid #222;
  padding: 15px 10px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  gap: 10px;
  background-color: transparent;
  transition: background-color 0.1s ease-in-out;
  position: relative;
  &:hover {
    background-color: ${(props) =>
      props.itemStatus === "available" ? "#ffffff07" : "transparent"};
  }
  &::after {
    content: "";
    display: ${(props) => (props.itemStatus === "available" ? "none" : "flex")};
    width: 100%;
    height: 100%;
    border-radius: 5px;
    text-shadow: 0 2px 2px #000;
    background-color: #5e1b1b42;
    text-decoration: none;
    position: absolute;
    top: 0;
    left: 0;
  }

  img {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    object-fit: cover;
  }

  div.item_info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 14px;
    color: #f2f2f2;

    span#sold_out {
      display: ${(props) =>
        props.itemStatus === "available" ? "none" : "inline"};
      color: #ce514d;
      font-style: italic;
      font-weight: 600;
      text-decoration: none;
    }

    p {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1em;
      color: #aaa;
    }

    h3 {
      text-decoration: none;
    }

    #price {
      color: #e9abb5;
      background-color: #742222;
      padding: 2px 3px;
      font-weight: 400;
      width: fit-content;
      align-self: flex-start;
    }
  }
`;
