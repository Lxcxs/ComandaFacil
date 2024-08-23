import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;

  }
  p, h1, h3, h2, div, input{ color: #fff}

  body {
    background-color: #141414;
  }

`;

export default GlobalStyle;