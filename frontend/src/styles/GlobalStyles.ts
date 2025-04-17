import { createGlobalStyle } from "styled-components";
import { TEXT_MAIN_COLOR } from "../utils/constants.ts";

const GlobalStyles = createGlobalStyle`
    :root {
        &, &.light-mode {
            --color-grey-0: #fff;
            --color-grey-50: #f9f9fa;
            --color-grey-100: #f3f3f5;
            --color-grey-200: #e8e8ec;
            --color-grey-300: #d4d4db;
            --color-grey-400: #a9a9b7;
            --color-grey-500: #7e7e92;
            --color-grey-600: #5c5c70;
            --color-grey-700: #414156;
            --color-grey-800: #2c2c3d;
            --color-grey-900: #19171d;
        }

        &.dark-mode {
            --color-grey-0: #19171d;
            --color-grey-50: #2c2c3d;
            --color-grey-100: #414156;
            --color-grey-200: #5c5c70;
            --color-grey-300: #7e7e92;
            --color-grey-400: #a9a9b7;
            --color-grey-500: #d4d4db;
            --color-grey-600: #e8e8ec;
            --color-grey-700: #f3f3f5;
            --color-grey-800: #f9f9fa;
            --color-grey-900: #fff;
        }

        //--color-hover: #769eef;
        --color-active: #769eef;
    }

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        /* Animation for dark mode switch */
        transition: background-color 0.3s, border 0.3s;
    }

    body {
        color: var( ${TEXT_MAIN_COLOR});
        min-height: 100vh;

        /* Animation for dark mode switch */
        transition: color 0.3s, background-color 0.3s;
    }

    button {
        cursor: pointer;
    }

    *:disabled {
        cursor: not-allowed;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        overflow-wrap: break-word;
        hyphens: auto;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
        color: inherit;
    }

    select:disabled,
    input:disabled {
        background-color: var(--color-grey-200);
        color: var(--color-grey-500);
    }
`;

export default GlobalStyles;
