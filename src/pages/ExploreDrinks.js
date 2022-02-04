import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AllHeader from '../components/AllHeader';
import Footer from '../components/Footer';

export default function ExploreDrinks({ history: { location } }) {
  const history = useHistory();
  const handlerandom = async () => {
    const fetchRandom = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const jason = await fetchRandom.json();
    const { drinks } = await jason;
    history.push(`/drinks/${drinks[0].idDrink}`);
  };

  return (
    <div>
      <AllHeader
        actPage={ location.pathname }
        title="Explore Drinks"
        btnSearch={ false }
      />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
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

ExploreDrinks.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
