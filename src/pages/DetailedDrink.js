import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MyContext from '../context/Mycontext';
// import PropTypes from 'prop-types';

function DetailedDrink() {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const { stateHook: { getDetailsDrinks, detailsDrinks } } = useContext(MyContext);

  const ingredientsConst = [];

  useEffect(() => {
    const numbersID = -5;
    const id = history.location.pathname.slice(numbersID);
    /* console.log(id);
    console.log(fetchDetailsDrinksAPI(id)); */
    getDetailsDrinks(id);
  }, []);

  useEffect(() => {
    const numberItens = 20;
    if (Object.keys(detailsDrinks).length > 0) {
      for (let index = 1; index <= numberItens; index += 1) {
        const ingredient = detailsDrinks[`strIngredient${index}`];
        const measure = detailsDrinks[`strMeasure${index}`];
        if (ingredient) {
          ingredientsConst.push(`${ingredient} - ${measure}`);
        }
      }
      setIngredients(ingredientsConst);
      setIsLoading(true);
    }
  }, [detailsDrinks]);

  return (
    <div>
      {isLoading
        ? (
          <>
            <img
              src={ detailsDrinks.strDrinkThumb }
              alt="imagem do drink"
              data-testid="recipe-photo"
              width="560"
              height="315"
            />
            <h2
              data-testid="recipe-title"
            >
              { detailsDrinks.strDrink }

            </h2>
            <h4 data-testid="recipe-category">{ detailsDrinks.strAlcoholic }</h4>
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
            <p data-testid="recipe-instructions">
              { detailsDrinks.strInstructions }
            </p>
            <ul>
              {ingredients.map((ingredient, i) => (
                <li
                  key={ i }
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </li>
              ))}
            </ul>
            <button
              type="button"
              data-testid="start-recipe-btn"
            >
              Start Recipe
            </button>
          </>
        ) : <p>Carregando...</p>}
    </div>
  );
}

// DetailedDrink.propTypes = {};

export default DetailedDrink;
