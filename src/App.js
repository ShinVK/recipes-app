import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes/Routes';
import Provider from './context/Provider';

export default function App() {
  return (
    <Provider>
      <div className="meals">
        <Routes />
      </div>
    </Provider>
  );
}
