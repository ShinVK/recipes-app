import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AllHeader from '../components/AllHeader';

import Footer from '../components/Footer';

export default function ExploreFoods({ history: { location } }) {
  const history = useHistory();
  const handlerandom = async () => {
    const fetchRandom = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const jason = await fetchRandom.json();
    const { meals } = await jason;
    history.push(`/foods/${meals[0].idMeal}`);
  };

  return (
    <div>
      <AllHeader
        actPage={ location.pathname }
        title="Explore Foods"
        btnSearch={ false }
      />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => handlerandom() }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
