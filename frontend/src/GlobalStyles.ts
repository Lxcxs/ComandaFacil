import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;

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

  }
  p, h1, h3, h2, div, input{ color: #fff}

  body {
    background-color: #141414;


  }
  html {
    scroll-behavior: smooth;
  }

`;

export default GlobalStyle;