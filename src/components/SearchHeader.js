import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import MyContext from '../context/Mycontext';

// import fetchFoodAPI from '../services/fetchAPI';

function SearchHeader({ page }) {
  const [radioButton, setradioButton] = useState();
  const [searchInput, setSearchInput] = useState('');

  const handleChangeRadio = ({ target }) => {
    const { name, value } = target;
    if (value === 'radio3' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      setradioButton({ [name]: value });
    } else {
      setradioButton({ [name]: value });
    }
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
        onClick={ () => onClickSearch(radioButton, searchInput, page) }
      >
        Procurar
      </button>
    </div>
  );
}

SearchHeader.propTypes = {
  page: PropTypes.string.isRequired,
};

export default SearchHeader;
