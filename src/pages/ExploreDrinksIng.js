import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AllHeader from '../components/AllHeader';
import Footer from '../components/Footer';
import useFetchIngredients from '../hooks/useFetchIngredients';
import MyContext from '../context/Mycontext';

export default function ExploreDrinksIng({ history: { location } }) {
  const { stateHook: { filter } } = useContext(MyContext);
  const [drinksIng] = useFetchIngredients(false);

  return (
    <div>
      <AllHeader
        actPage={ location.pathname }
        title="Explore Ingredients"
        btnSearch={ false }
      />
      <p>Explorar bebidas atraves de ingerdientes</p>
      {drinksIng && drinksIng.map(({ strIngredient1 }, index) => (
        <div
          onClick={ () => filter(false, strIngredient1) }
          onKeyDown={ () => console.log('funciona') }
          role="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          tabIndex={ 0 }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            alt="Imagem do ingrediente"
            data-testid={ `${index}-card-img` }
            /* style={ { width: '100px', height: 'auto' } } */
          />
          <h5
            data-testid={ `${index}-card-name` }
          >
            {strIngredient1}
          </h5>
        </div>
      ))}
      <Footer />
    </div>
  );
}

ExploreDrinksIng.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
