import { css } from "styled-components";

// Extra small devices (phones, 600px and down)
export const mobile = (props) => {
    return css`
        @media only screen and (max-width: 600px) {
            ${props}
        }
    `
};

// Small devices (portrait tablets and large phones, 600px and up)
export const tablet = (props) => {
    return css`
        @media only screen and (min-width: 600px) {
            ${props}
        }
    `
};
// Medium devices (landscape tablets, 768px and up)
export const landscape = (props) => {
    return css`
        @media only screen and (min-width: 768px) {
            ${props}
        }
    `
};

// Large devices (laptops/desktops, 992px and up
export const laptop = (props) => {
    return css`
        @media only screen and (min-width: 992px) {
            ${props}
        }
    `
};

