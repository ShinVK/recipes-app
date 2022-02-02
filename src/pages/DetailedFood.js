import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router';
import MyContext from '../context/Mycontext';
import CarouselBotstrap from '../components/CarouselBotstrap';
import useUpdateDetailRecipe from '../hooks/useUpdateDetailRecipe';
import BtnRecipe from '../components/BtnRecipe';
// import PropTypes from 'prop-types';

function DetailedFood({ location: { pathname } }) {
  const {
    stateHook:
    { drinksAPI } } = useContext(MyContext);
  // const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [video, setVideo] = useState('');
  const [detailItem] = useUpdateDetailRecipe(pathname, true);
  const [detailFood, setdetailFood] = useState(detailItem);

  useEffect(() => {
    setdetailFood(detailItem);
  }, [detailItem]);

  useEffect(() => {
    const ingredientsConst = [];
    const numberItens = 20;
    if (Object.keys(detailFood).length !== 0) {
      for (let index = 1; index <= numberItens; index += 1) {
        const ingredient = detailFood[`strIngredient${index}`];
        const measure = detailFood[`strMeasure${index}`];
        if (ingredient) {
          ingredientsConst.push(`${ingredient} - ${measure}`);
        }
      }
      const linkVideo = detailFood.strYoutube;
      const codigoVideo = linkVideo.split('=');
      setVideo(`https://www.youtube.com/embed/${codigoVideo[1]}`);
      setIngredients(ingredientsConst);
      setIsLoading(true);
    }
  }, [detailFood]);

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
            <BtnRecipe />
            {/* <button
              type="button"
              data-testid="start-recipe-btn"
            >
              Start Recipe
            </button> */}
          </>
        ) : <p>carregando...</p> }
    </div>
  );
}

DetailedFood.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};

export default DetailedFood;
