import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AllHeader from '../components/AllHeader';
import useGetFromLocal from '../hooks/useGetFromLocal';
import MyContext from '../context/Mycontext';
import shareIcon from '../images/shareIcon.svg';

export default function RecipesDone({ history: { location } }) {
  const [allRecipes] = useGetFromLocal();
  const {
    stateHook:
    {
      isCopied,
      copyClipBoard,
    } } = useContext(MyContext);

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
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Drink
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Food
      </button>
      {allRecipes && allRecipes.map((
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
              <img
                src={ image }
                alt="imagem da refeição"
                data-testid={ `${0}-horizontal-image` }
                width="120"
              />
              <h3 data-testid={ `${i}-horizontal-name` }>
                {name}
              </h3>
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
            <img
              src={ image }
              alt="imagem da refeição"
              data-testid={ `${i}-horizontal-image` }
              width="120"
            />
            <h3 data-testid={ `${i}-horizontal-name` }>
              {name}
            </h3>
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
