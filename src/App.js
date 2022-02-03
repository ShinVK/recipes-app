import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes/Routes';
import Provider from './context/Provider';

export default function App() {
  return (
    <Provider>
      <div className="meals">
        {/* <BrowserRouter> */}
        <Routes />
        {/* </BrowserRouter> */}
      </div>
    </Provider>
  );
}
