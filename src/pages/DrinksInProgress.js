import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/Mycontext';
import useUpdateDetailRecipe from '../hooks/useUpdateDetailRecipe';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useCatchIngredients from '../hooks/useCatchIngredients';
import { saveRecipesDone, saveRecipesInProgess } from '../services/localStorage';
import { drinkDone } from '../services/favRecipes';

function DrinksInProgress({ location: { pathname } }) {
  const {
    stateHook:
    {
      isFavorite,
      handleClickFavorite,
      isCopied,
      copyClipBoard,
      actStatus,
    } } = useContext(MyContext);

  const history = useHistory();

  const [detailItem, id] = useUpdateDetailRecipe(pathname, false);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState();
  const [ingredients2, steps2] = useCatchIngredients(detailItem, actStatus, id, false);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    setIngredients(ingredients2);
    setSteps(steps2);
    setIsLoading(true);
  }, [ingredients2, steps2]);

  useEffect(() => {
    const verifyChecks = (a) => {
      if (a) {
        const isDisable = a.some((e) => e === false);
        setDisable(isDisable);
      } else { setDisable(true); }
    };
    verifyChecks(steps);
  }, [steps]);

  const onHandleChange = (i2) => {
    const updatedCheckedStep = steps.map((step, i) => (i === i2 ? !step : step));
    const objLocal = { [id]: updatedCheckedStep };

    saveRecipesInProgess(objLocal, false);
    setSteps(updatedCheckedStep);
  };

  const handleClickDone = (obj) => {
    const itemDone = drinkDone(obj);
    saveRecipesDone(itemDone);
    history.push('/done-recipes');
  };

  return (
    <div>
      {isLoading
        ? (
          <>
            <img
              src={ detailItem.strDrinkThumb }
              alt="imagem do drink"
              data-testid="recipe-photo"
              width="330"
            />
            <h2
              data-testid="recipe-title"
            >
              { detailItem.strDrink }

            </h2>
            <h4 data-testid="recipe-category">{ detailItem.strAlcoholic }</h4>
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
              { detailItem.strInstructions }
            </p>
            {ingredients.map((ingredient, i) => (
              <div
                className="form-check"
                key={ i }
                data-testid={ `${i}-ingredient-step` }
              >
                <label
                  key={ i }
                  className={ (steps[i])
                    ? 'checked_text form-check-label' : 'form-check-label' }
                  htmlFor={ `${i}-input` }
                >

                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={ `${i}-input` }
                    name={ `step${i}` }
                    checked={ steps[i] }
                    onChange={ () => onHandleChange(i) }
                  />
                  {ingredient}
                </label>
              </div>
            ))}
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ disable }
              onClick={ () => handleClickDone(detailItem) }
            >
              Finish Recipe
            </button>
          </>
        ) : <p>Carregando...</p>}
    </div>);
}

DrinksInProgress.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};

export default DrinksInProgress;
