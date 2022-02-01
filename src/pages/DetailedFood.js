import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MyContext from '../context/Mycontext';
// import PropTypes from 'prop-types';

function DetailedFood() {
  const { stateHook: { detailsFood, getDetailsFood } } = useContext(MyContext);
  /* const [ingredients, setIngredients] = useState([]); */
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const numbersID = -5;
    const id = history.location.pathname.slice(numbersID);
    getDetailsFood(id);
  }, []);

  useEffect(() => {
    if (detailsFood.length > 0) {
      setIsLoading(true);
    }
  }, [detailsFood]);

  /* useEffect(() => {
    const numberItens = 20;
    for (let index = 1; index <= numberItens; index += 1) {
      setIngredients([
        ...ingredients,
        detailsFood[0][`strIngredient${index}`],
      ]);
    }
  }, [detailsFood]); */

  return (
    <div>
      { isLoading
        ? (
          <>
            <img
              src={ detailsFood[0].strMealThumb }
              alt="imagem da refeição"
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{ detailsFood[0].strMeal }</h2>
            <button
              type="button"
              data-testid="share-btn"
            >
              Compartilhar
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favoritar
            </button>
            <p data-testid="recipe-category">
              { detailsFood[0].strInstructions }
            </p>
            <ul>
              {}
            </ul>
          </>
        ) : <p>carregando...</p> }
    </div>
  );
}

// DetailedFood.propTypes = {};

export default DetailedFood;
