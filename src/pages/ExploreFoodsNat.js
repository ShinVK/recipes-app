import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AllHeader from '../components/AllHeader';
import Footer from '../components/Footer';
import useNationality from '../hooks/useNationality';
import useFilterNation from '../hooks/useFilterNation';

export default function ExploreFoodsNat({ history: { location } }) {
  const [nationalities] = useNationality();
  const [nation, setnation] = useState('All');
  const [mealsNation] = useFilterNation(nation);
  const history = useHistory();

  return (
    <div>
      <AllHeader actPage={ location.pathname } title="Explore Nationalities" />
      <p>Explorar comidas atraves de nationalities</p>
      <select
        data-testid="explore-by-nationality-dropdown"
        value={ nation }
        onChange={ ({ target }) => setnation(target.value) }
      >
        <option
          value="All"
          data-testid="All-option"
        >
          All
        </option>
        {nationalities && nationalities.map(({ strArea }, i) => (
          <option
            value={ strArea }
            data-testid={ `${strArea}-option` }
            key={ i }
          >
            {strArea}
          </option>
        ))}
      </select>
      { mealsNation && mealsNation.map((
        { idMeal, strMeal, strMealThumb },
        i,
      ) => (
        <div
          key={ idMeal }
          data-testid={ `${i}-recipe-card` }
          onClick={ () => history.push(`/foods/${idMeal}`) }
          aria-hidden="true"
          role="button"
        >
          <img
            style={ { width: '50px' } }
            data-testid={ `${i}-card-img` }
            src={ strMealThumb }
            alt="thumbnail food"
          />
          <h3
            data-testid={ `${i}-card-name` }
            style={ { font: '10px' } }
          >
            {strMeal}
          </h3>
        </div>
      ))}
      <Footer />
    </div>
  );
}

ExploreFoodsNat.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
