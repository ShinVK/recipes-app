import React from 'react';
import PropTypes from 'prop-types';
import AllHeader from '../components/AllHeader';

export default function RecipesDone({ history: { location } }) {
  return (
    <div>
      <AllHeader title="Done Recipes" actPage={ location.pathname } btnSearch={ false } />
      <p>Tela de receitas feitas</p>
    </div>
  );
}

RecipesDone.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
