import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
  }
  body {
    width: 100vw;
    height: 100vh;
    background-image: url(), linear-gradient(45deg, red, blue);
    background-size: 200px 200px, cover;
    background-repeat: no-repeat;
    font-family: Arial Black
    
  }

`

export default GlobalStyle;
