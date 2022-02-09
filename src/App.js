import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider } from '@mui/material';
import Routes from './Routes/Routes';
import Provider from './context/Provider';

const theme = createTheme({
  palette: {
    background: {
      default: '#faede8',
    },
    primary: {
      main: '#E29578',
    },
    secondary: {
      main: '#006D77',
    },
    success: {
      main: '#83C5BE',
    },
  },
});

export default function App() {
  return (
    <Provider>
      <ThemeProvider theme={ theme }>
        <Routes />
      </ThemeProvider>

    </Provider>
  );
}
