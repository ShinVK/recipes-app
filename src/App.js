import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchHeader from './components/SearchHeader';
import Routes from './Routes/Routes';

function App() {
  return (
    <div className="meals">
      <Routes />
      <span className="logo">TRYBE</span>
      <SearchHeader />
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>

export default App;
