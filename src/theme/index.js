import { createGlobalStyle } from 'styled-components'

const lightThem = {
  navbar: {
    background: '#fff',
    color: '#44546F',
    borderColor: '#091E4224',
    activeColor: '#0C66E4',
    hoverBackground: '#091E4224',
    dropDownBackground: '#E9F2FF',
    modalBoxShadow: '0px 8px 12px #091E4226, 0px 0px 1px #091E424F',
    modalOverlay: 'rgba(9, 30, 66, 0.49)',
    modalBackground: 'white',
  },
  maxWidth: '1920px',
  background: '#fff',
  sideBar: {
    background: '#fff',
    border: '#091E4224',
    color: 'rgb(23, 43, 77)',
    hoverBackground: '#091E420F',
    activeBackground: '#E9F2FF',
    activeColor: '#0C66E4',
  },
  heroModule: {
    background: '#091E420F',
    titleColor: '#172B4D',
    textColor: '#44546F',
  },
  AsideBar: {
    textColor: '#626F86',
    border: '#091E4224',
    activeColor: '#0C66E4',
  },
  blogSection: {
    textColor: '#172B4D',
  },
  breakpoints: {
    mobile: 'only screen and (max-width: 48em)',
    tablet: 'only screen and (max-width: 56.25em)',
    desktop: 'only screen and (max-width: 75em)',
  },

  font: 'Poppins, sans-serif',
  pageText: '#016089',
}

const darkThem = {
  navbar: {
    background: '#1D2125',
    color: '#9FADBC',
    borderColor: '#A6C5E229',
    activeColor: '#579DFF',
    hoverBackground: '#A6C5E229',
    dropDownBackground: '#1C2B41',
    modalBoxShadow:
      '0px 0px 0px 1px #39424a, 0px 8px 12px #0304045C, 0px 0px 1px 1px #03040480',
    modalOverlay: 'rgba(16, 18, 20, 0.6)',
    modalBackground: '#282E33',
  },
  maxWidth: '1920px',
  background: '#1D2125',
  sideBar: {
    background: '#1D2125',
    border: '#A6C5E229',
    color: 'rgb(182, 194, 207)',
    hoverBackground: '#A1BDD914',
    activeBackground: '#1C2B41',
    activeColor: '#579DFF',
  },
  heroModule: {
    background: '#A1BDD914',
    titleColor: '#B6C2CF',
    textColor: '#9FADBC',
  },
  AsideBar: {
    textColor: '#8C9BAB',
    border: '#A6C5E229',
    activeColor: '#579DFF',
  },
  blogSection: {
    textColor: '#B6C2CF',
  },
  breakpoints: {
    mobile: 'only screen and (max-width: 48em)',
    tablet: 'only screen and (max-width: 56.25em)',
    desktop: 'only screen and (max-width: 75em)',
  },

  font: 'Poppins, sans-serif',
  pageText: '#016089',
}
//
const Them = {
  light: lightThem,
  dark: darkThem,
}

export default Them

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
   
    body {
        background: ${({ theme }) => theme.background};
        font-family: ${({ theme }) => theme.font} !important;
        font-style: normal;
        transition: all 0.20s linear;
    }
    input, textarea, button {font-family: inherit}
    a {
        text-decoration: none;
        color: inherit;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    button {
        cursor: pointer;
    }

    // style scroll bar
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    ::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.background};
    }

    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.navbar.borderColor};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.navbar.borderColor};
    }
    ::-webkit-scrollbar-thumb:active {
        background: ${({ theme }) => theme.navbar.borderColor};
    }
    ::-webkit-scrollbar-corner {
        background: ${({ theme }) => theme.background};
    }
    ::-webkit-scrollbar-button {
        display: none;
    }
    // end style scroll bar
    
`
