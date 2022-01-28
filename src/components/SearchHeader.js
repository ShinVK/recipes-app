import React, { useState } from 'react';
// import PropTypes from 'prop-types';

function SearchHeader() {
  const [radioButton, setradioButton] = useState();
  const handleChangeRadio = ({ target }) => {
    const { name, value } = target;
    setradioButton({ [name]: value });
  };

  return (
    <div>
      <form>
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingredientsRadio"
          name="searchRadio"
          onClick={ (e) => handleChangeRadio(e) }
        />
        Ingredientes
        <input
          type="radio"
          data-testid="name-search-radio"
          value="nameRadio"
          name="searchRadio"
          onClick={ (e) => handleChangeRadio(e) }
        />
        Nome
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          value="firstLetterRadio"
          name="searchRadio"
          onClick={ (e) => handleChangeRadio(e) }
        />
        Primeira letra
      </form>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ console.log(radioButton) }
      >
        Procurar
      </button>
    </div>
  );
}

// SearchHeader.propTypes = {};

export default SearchHeader;
