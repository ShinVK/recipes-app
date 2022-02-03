import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import CarouselBotstrap from '../components/CarouselBotstrap';
import MyContext from '../context/Mycontext';
import useUpdateDetailRecipe from '../hooks/useUpdateDetailRecipe';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useIngredients from '../hooks/useIngredients';

function DetailedDrink({ location: { pathname } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [detailItem, id] = useUpdateDetailRecipe(pathname, false);
  const [detailsDrinks, setdetaildrinks] = useState(detailItem);
  const [ingredients2] = useIngredients(detailItem, false);

  const {
    stateHook: { foodsAPI, isFavorite,
      isCopied,
      handleClickFavorite, actStatus, copyClipBoard, done } } = useContext(MyContext);

  const history = useHistory();

  // useEffect(() => {
  // }, [detailItem]);

  useEffect(() => {
    setdetaildrinks(detailItem);
    setIngredients(ingredients2);
    setIsLoading(true);
  }, [ingredients2, detailItem]);

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
              width="330"
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
              onClick={ () => copyClipBoard(false, id) }
            >
              Compartilhar
            </button>
            { isCopied && <span style={ { font: '10px' } }>Link copied!</span> }
            <input
              data-testid="favorite-btn"
              type="image"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="search icon"
              onClick={ () => handleClickFavorite(id, detailItem, false) }
            />
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

            {!done && (
              <button
                type="button"
                // data-testid="start-recipe-btn"
                data-testid="start-recipe-btn"
                onClick={ () => history.push(`${pathname}/in-progress`) }
                className="btn__start"
              >
                {actStatus ? 'Continue Recipe' : 'Start Recipe'}
              </button>
            )}

            <CarouselBotstrap
              itensCar={ divideArray(reduceArr(foodsAPI, +'6'), 2) }
              foods
            />
          </>
        ) : <p>Carregando...</p>}
    </div>
  );
}

DetailedDrink.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};

export default DetailedDrink;
