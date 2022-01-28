import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchHeader from './components/SearchHeader';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <SearchHeader />
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
    </div>
  );
}

export default App;
