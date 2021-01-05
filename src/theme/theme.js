import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html, body {
    overflow-x: hidden;
    font-size: 16px;
  }
`;

export const lightTheme = {
  yellow: "#e3ca0b",
  rust: "#bf5934",
  red: "#c87445",
  mint: "#bec680",
  brown: "#674831",
};
