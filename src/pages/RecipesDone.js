import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import AllHeader from '../components/AllHeader';
import useGetFromLocal from '../hooks/useGetFromLocal';
import MyContext from '../context/Mycontext';
import shareIcon from '../images/shareIcon.svg';

export default function RecipesDone({ history: { location } }) {
  const [allRecipes, meals, drinks] = useGetFromLocal();
  const {
    stateHook:
    {
      isCopied,
      copyClipBoard,
    } } = useContext(MyContext);

  const [recipes, setRecipes] = useState(allRecipes);
  const history = useHistory();

  useEffect(() => {
    setRecipes(allRecipes);
  }, [allRecipes]);

  return (
    <div>
      <AllHeader
        title="Done Recipes"
        actPage={ location.pathname }
        btnSearch={ false }
      />
      <p>Tela de receitas feitas</p>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setRecipes(allRecipes) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setRecipes(meals) }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setRecipes(drinks) }
      >
        Cocktails
      </button>
      {recipes && recipes.map((
        { id,
          image,
          category,
          nationality,
          name,
          tags,
          doneDate,
          type,
          alcoholicOrNot,
        }, i,
      ) => {
        if (type === 'food') {
          return (
            <div key={ i }>
              <h3 data-testid="0-horizontal-top-text">
                {`${nationality} - ${category}`}
              </h3>
              <input
                type="image"
                src={ image }
                alt="imagem da refeição"
                data-testid={ `${0}-horizontal-image` }
                width="120"
                onClick={ () => history.push(`/foods/${id}`) }
              />
              <Link
                className="link__href"
                to={ `foods/${id}` }
                role="presentation"
                data-testid={ `${i}-horizontal-name` }
              >
                {name}
              </Link>
              <input
                type="image"
                src={ shareIcon }
                alt="share button"
                data-testid={ `${i}-horizontal-share-btn` }
                onClick={ () => copyClipBoard(`foods/${id}`) }
              />
              <h4 data-testid={ `${i}-horizontal-done-date` }>
                {doneDate}
              </h4>
              {tags.map((el, i2) => (
                <h5
                  key={ i2 }
                  data-testid={ `${i}-${el}-horizontal-tag` }
                >
                  {el}
                </h5>
              ))}
            </div>
          );
        }
        return (
          <div key={ i }>
            <h3 data-testid={ `${i}-horizontal-top-text` }>
              {alcoholicOrNot}
            </h3>
            <input
              type="image"
              src={ image }
              alt="imagem da refeição"
              data-testid={ `${i}-horizontal-image` }
              width="120"
              onClick={ () => history.push(`/drinks/${id}`) }
            />
            <Link
              className="link__href"
              to={ `drinks/${id}` }
              data-testid={ `${i}-horizontal-name` }
            >
              {name}
            </Link>
            <input
              type="image"
              src={ shareIcon }
              alt="share button"
              data-testid={ `${i}-horizontal-share-btn` }
              onClick={ () => copyClipBoard(`drinks/${id}`) }
            />
            <h4 data-testid={ `${i}-horizontal-done-date` }>
              {doneDate}
            </h4>
          </div>
        );
      })}
      { isCopied && <div className="link__copied">Link copied!</div> }
    </div>
  );
}

RecipesDone.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
