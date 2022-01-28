import React from 'react';
// import PropTypes from 'prop-types';

function SearchHeader() {
  return (
    <div>
      <form>
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingredientsRadio"
          name="searchRadio"
        />
        Ingredientes
        <input
          type="radio"
          data-testid="name-search-radio"
          value="nameRadio"
          name="searchRadio"
        />
        Nome
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          value="firstLetterRadio"
          name="searchRadio"
        />
        Primeira letra
      </form>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Procurar
      </button>
    </div>
  );
}

// SearchHeader.propTypes = {};

export default SearchHeader;
