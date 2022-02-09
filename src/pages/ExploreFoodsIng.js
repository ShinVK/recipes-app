import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AllHeader from '../components/AllHeader';
import Footer from '../components/Footer';
import useFetchIngredients from '../hooks/useFetchIngredients';
import MyContext from '../context/Mycontext';

export default function ExploreFoodsIng({ history: { location } }) {
  const { stateHook: { filter } } = useContext(MyContext);
  const [foodsIng] = useFetchIngredients(true);
  return (
    <div>
      <AllHeader
        actPage={ location.pathname }
        title="Explore Ingredients"
        btnSearch={ false }
      />
      <p>Explorar comida pelos ingredientes</p>
      {foodsIng && foodsIng.map(({ strIngredient }, index) => (
        <div
          onClick={ () => filter(true, strIngredient) }
          onKeyDown={ () => {} }
          role="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          tabIndex={ 0 }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            alt="Imagem do ingrediente"
            data-testid={ `${index}-card-img` }
          />
          <h5
            data-testid={ `${index}-card-name` }
          >
            {strIngredient}
          </h5>
        </div>
      ))}
      <Footer />
    </div>
  );
}

ExploreFoodsIng.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
