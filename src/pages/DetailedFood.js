import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/Mycontext';
import CarouselBotstrap from '../components/CarouselBotstrap';
import useUpdateDetailRecipe from '../hooks/useUpdateDetailRecipe';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useIngredients from '../hooks/useIngredients';

function DetailedFood({ location: { pathname } }) {
  const {
    stateHook:
    {
      drinksAPI,
      isFavorite,
      handleClickFavorite,
      copyClipBoard,
      actStatus,
      isCopied,
      done,
    } } = useContext(MyContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [video, setVideo] = useState('');
  const [detailItem, id] = useUpdateDetailRecipe(pathname, true);
  const [detailFood, setdetailFood] = useState(detailItem);
  const [ingredients2, video2] = useIngredients(detailItem, true);

  useEffect(() => {
    setdetailFood(detailItem);
  }, [detailItem]);

  useEffect(() => {
    setIngredients(ingredients2);
    setVideo(video2);
    setIsLoading(true);
  }, [ingredients2, video2]);

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
      { isLoading
        ? (
          <>
            <img
              src={ detailFood.strMealThumb }
              alt="imagem da refeição"
              data-testid="recipe-photo"
              width="280"
              height="155"
            />
            <h2 data-testid="recipe-title">{ detailFood.strMeal }</h2>
            <h4 data-testid="recipe-category">{ detailFood.strCategory }</h4>
            <button
              type="button"
              data-testid="share-btn"
              className="btn btn-primary"
              onClick={ () => copyClipBoard(true, id) }
            >
              Compartilhar
            </button>
            { isCopied && <span style={ { font: '10px' } }>Link copied!</span> }
            <input
              data-testid="favorite-btn"
              type="image"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="search icon"
              onClick={ () => handleClickFavorite(id, detailItem, true) }
            />
            <p data-testid="instructions">
              { detailFood.strInstructions }
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
            <iframe
              data-testid="video"
              width="280"
              height="155"
              src={ video }
              title="YouTube video player"
              allow="accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture"
            />
            <CarouselBotstrap
              itensCar={ divideArray(reduceArr(drinksAPI, +'6'), 2) }
              foods={ false }
            />
            {!done && (
              <button
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => history.push(`${pathname}/in-progress`) }
                className="btn__start"
              >
                {actStatus ? 'Continue Recipe' : 'Start Recipe'}
              </button>
            )}
          </>
        ) : <p>carregando...</p> }
    </div>
  );
}

DetailedFood.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};

export default DetailedFood;
