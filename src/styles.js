// src/styles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #121212;
    color: #FFFFFF;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export const theme = {
  primary: '#BB86FC',
  secondary: '#03DAC6',
  background: '#121212',
  surface: '#1F1B24',
  error: '#CF6679',
};
