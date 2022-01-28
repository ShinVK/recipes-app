import React, { useState } from 'react';
import { useHistory } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const history = useHistory();
  const [isSearching, setIsSearching] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={ () => { history.push('/profile'); } }
        data-testid="profile-top-btn"
      >
        <object
          type="image/svg+xml"
          data={ profileIcon }
        >
          perfil
        </object>
      </button>
      <h3 data-testid="page-title">App de Receitas</h3>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ () => { setIsSearching(!isSearching); } }
      >
        <object
          type="image/svg+xml"
          data={ searchIcon }
        >
          perfil
        </object>
      </button>
    </div>
  );
}
