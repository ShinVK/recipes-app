import React, { useContext, useState } from 'react';
import MyContext from '../context/Mycontext';
// import fetchFoodAPI from '../services/fetchAPI';

function SearchHeader() {
  const [radioButton, setradioButton] = useState();
  const [searchInput, setSearchInput] = useState('');

  const handleChangeRadio = ({ target }) => {
    const { name, value } = target;
    setradioButton({ [name]: value });
  };

  const { stateHook: { onClickSearch } } = useContext(MyContext);

  return (
    <div>
      <form>
        <input
          type="text"
          value={ searchInput }
          data-testid="search-input"
          onChange={ ({ target }) => setSearchInput(target.value) }
        />

        <input
          type="radio"
          data-testid="ingredient-search-radio"
          value="radio1"
          name="searchRadio"
          onClick={ (e) => handleChangeRadio(e) }
        />
        Ingredientes
        <input
          type="radio"
          data-testid="name-search-radio"
          value="radio2"
          name="searchRadio"
          onClick={ (e) => handleChangeRadio(e) }
        />
        Nome
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          value="radio3"
          name="searchRadio"
          onClick={ (e) => handleChangeRadio(e) }
        />
        Primeira letra
      </form>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => onClickSearch(radioButton, searchInput) }
      >
        Procurar
      </button>
    </div>
  );
}

// SearchHeader.propTypes = {};

export default SearchHeader;
