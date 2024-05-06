import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root{
    &{
--purple: hsl(259, 100%, 65%);
--light-red: hsl(0, 100%, 67%);
--white: hsl(0, 0%, 100%);
--off-white: hsl(0, 0%, 94%);
--light-grey: hsl(0, 0%, 86%);
--smokey-grey: hsl(0, 1%, 44%);
--off-black: hsl(0, 0%, 8%);
    }
}

html{
    font-size: 62.5%;
}

*,::after,::before{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    font-family: "Poppins", sans-serif;
    min-height: 100vh;
    display: grid;
    place-items: center;
    background-color: var(--off-white);
    color: var(--off-black);
}

`;

export default GlobalStyle;
