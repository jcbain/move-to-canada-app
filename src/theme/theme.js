import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html, body {
    overflow: visible;
    font-size: 16px;
  }
`;

const colors = {
  yellows: {
    yellow1: "#e3ca0b",
  },
  reds: {
    red1: "#c87445",
    red2: "#bf5934",
  },
  greens: {
    green1: "#bec680",
  },
  neutrals: {
    brown: "#674831",
  },
};

export const lightTheme = {
  mapOutlineColor: colors.reds.red1,
  routeColor: colors.yellows.yellow1,
};
