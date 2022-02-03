// import { Button } from 'bootstrap';
import React from 'react';
// import PropTypes from 'prop-types';

function BtnRecipe() {
  return (
    <button
      type="button"
      className="btn btn-primary"
      data-testid="start-recipe-btn"
    >
      Start Recipe
    </button>
  );
}

// BtnRecipe.propTypes = {};

export default BtnRecipe;
