import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/Mycontext';
import useUpdateDetailRecipe from '../hooks/useUpdateDetailRecipe';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodsInProgress({ location: { pathname } }) {
  const [detailItem, id] = useUpdateDetailRecipe(pathname, true);
  const [isCopied, setisCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState({});

  const {
    stateHook:
    {
      isFavorite,
      handleClickFavorite,
    } } = useContext(MyContext);

  useEffect(() => {
    const ingredientsConst = [];
    const numberItens = 20;
    if (Object.keys(detailItem).length !== 0) {
      for (let index = 1; index <= numberItens; index += 1) {
        const ingredient = detailItem[`strIngredient${index}`];
        const measure = detailItem[`strMeasure${index}`];
        if (ingredient) {
          ingredientsConst.push(`${ingredient} - ${measure}`);
        }
      }
      setIngredients(ingredientsConst);
      setIsLoading(true);
    }
  }, [detailItem]);

  const copyClipBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setisCopied(!isCopied);
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
              <div className="form-check" key={ i }>
                <label className="form-check-label" htmlFor={ `${i}-input` }>

                  <input
                    className="form-check-input"
                    id={ `${i}-input` }
                    data-testid={ `${i}-ingredient-step` }
                    type="checkbox"
                    name={ `step${i}` }
                    checked={ steps[`step${i}`] }
                    onChange={
                      ({ target }) => setSteps({ ...steps, [target.name]: true })
                    }
                  />
                  {ingredient}
                </label>
              </div>
            ))}

            <button
              type="button"
              data-testid="done-recipe-btn"
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
