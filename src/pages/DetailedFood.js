import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MyContext from '../context/Mycontext';
import CarouselBotstrap from '../components/CarouselBotstrap';
// import PropTypes from 'prop-types';

function DetailedFood() {
  const {
    stateHook:
    { detailsFood, getDetailsFood, drinksAPI } } = useContext(MyContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [video, setVideo] = useState('');

  const ingredientsConst = [];

  useEffect(() => {
    // const history = useHistory();
    const numbersID = -5;
    const id = history.location.pathname.slice(numbersID);
    getDetailsFood(id);
  }, []);

  useEffect(() => {
    const numberItens = 20;
    if (Object.keys(detailsFood).length !== 0) {
      for (let index = 1; index <= numberItens; index += 1) {
        const ingredient = detailsFood[`strIngredient${index}`];
        const measure = detailsFood[`strMeasure${index}`];
        if (ingredient) {
          ingredientsConst.push(`${ingredient} - ${measure}`);
        }
      }
      const linkVideo = detailsFood.strYoutube;
      const codigoVideo = linkVideo.split('=');
      setVideo(`https://www.youtube.com/embed/${codigoVideo[1]}`);
      setIngredients(ingredientsConst);
      setIsLoading(true);
    }
  }, [detailsFood]);

  const reduceArr = (arr, num) => {
    const arrRed = arr.slice(0, num);
    return arrRed;
  };

  return (
    <div>
      { isLoading
        ? (
          <>
            <img
              src={ detailsFood.strMealThumb }
              alt="imagem da refeição"
              data-testid="recipe-photo"
              width="280"
              height="155"
            />
            <h2 data-testid="recipe-title">{ detailsFood.strMeal }</h2>
            <h4 data-testid="recipe-category">{ detailsFood.strCategory }</h4>
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
              { detailsFood.strInstructions }
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
            <CarouselBotstrap itensCar={ reduceArr(drinksAPI, +'6') } />
            <button
              type="button"
              data-testid="start-recipe-btn"
            >
              Start Recipe
            </button>
          </>
        ) : <p>carregando...</p> }
    </div>
  );
}

// DetailedFood.propTypes = {};

export default DetailedFood;
