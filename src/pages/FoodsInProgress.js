import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/Mycontext';
import useUpdateDetailRecipe from '../hooks/useUpdateDetailRecipe';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useCatchIngredients from '../hooks/useCatchIngredients';
import { saveRecipesInProgess } from '../services/localStorage';

function FoodsInProgress({ location: { pathname } }) {
  const {
    stateHook:
    {
      isFavorite,
      handleClickFavorite,
      isCopied,
      copyClipBoard,
      actStatus,
    } } = useContext(MyContext);
  const [detailItem, id] = useUpdateDetailRecipe(pathname, true);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState();
  const [ingredients2, steps2] = useCatchIngredients(detailItem, actStatus, id);
  const [disable, setDisable] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const verifyChecks = (a) => {
      if (a) {
        const isDisable = a.some((e) => e === false);
        setDisable(isDisable);
      } else { setDisable(true); }
    };
    verifyChecks(steps);
  }, [steps]);

  useEffect(() => {
    setIngredients(ingredients2);
    setSteps(steps2);
    setIsLoading(true);
  }, [ingredients2, steps2]);

  const onHandleChange = (i2) => {
    const updatedCheckedStep = steps.map((step, i) => (i === i2 ? !step : step));
    const objLocal = { [id]: updatedCheckedStep };
    saveRecipesInProgess(objLocal);
    setSteps(updatedCheckedStep);
  };

  return (
    <div className="container">
      { isLoading
        ? (
          <>
            <img
              src={ detailItem.strMealThumb }
              alt="imagem da refeição"
              data-testid="recipe-photo"
              width="280"
              height="155"
            />
            <h2 data-testid="recipe-title">{ detailItem.strMeal }</h2>
            <h4 data-testid="recipe-category">{ detailItem.strCategory }</h4>
            <button
              type="button"
              data-testid="share-btn"
              className="btn btn-primary"
              onClick={ () => copyClipBoard() }
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
              onClick={ () => history.push('/done-recipes') }
            >
              Done!
            </button>
          </>
        ) : <p>carregando...</p> }
    </div>);
}

FoodsInProgress.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};

export default FoodsInProgress;
