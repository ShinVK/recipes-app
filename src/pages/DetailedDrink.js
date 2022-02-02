import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router';
import CarouselBotstrap from '../components/CarouselBotstrap';
import MyContext from '../context/Mycontext';
import useUpdateDetailRecipe from '../hooks/useUpdateDetailRecipe';
// import PropTypes from 'prop-types';

function DetailedDrink({ location: { pathname } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [detailItem] = useUpdateDetailRecipe(pathname, false);
  const [detailsDrinks, setdetaildrinks] = useState(detailItem);

  const {
    stateHook: { foodsAPI } } = useContext(MyContext);

  useEffect(() => {
    setdetaildrinks(detailItem);
  }, [detailItem]);

  // useEffect(() => {
  //   const numbersID = 8;
  //   const id = history.location.pathname.slice(numbersID);
  //   getDetailsDrinks(id);
  // }, []);

  useEffect(() => {
    const numberItens = 20;
    const ingredientsConst = [];
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

  const reduceArr = (arr, num) => {
    const arrRed = arr.slice(0, num);
    return arrRed;
  };

  const divideArray = (arr, num) => {
    const arrFinal = [];
    while (arr.length) {
      arrFinal.push(arr.splice(0, num));
    }
    return arrFinal;
  };

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
            <p data-testid="instructions">
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
            <CarouselBotstrap
              itensCar={ divideArray(reduceArr(foodsAPI, +'6'), 2) }
              foods
            />
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

DetailedDrink.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};

export default DetailedDrink;
