import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AllHeader from '../components/AllHeader';
import useGetFromLocal from '../hooks/useGetFromLocal';
import MyContext from '../context/Mycontext';
import shareIcon from '../images/shareIcon.svg';

export default function RecipesDone({ history: { location } }) {
  const [meals, drinks] = useGetFromLocal();
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
      {meals && meals.map((
        { id, image, category, nationality, name, tags, doneDate }, i,
      ) => (
        <div key={ i }>
          <h3 data-testid="0-horizontal-top-text">
            {`${nationality} - ${category}`}
          </h3>
          <img
            src={ image }
            alt="imagem da refeição"
            data-testid="recipe-photo"
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
      ))}
      {drinks && drinks.map((
        { id, image, alcoholicOrNot, name, doneDate }, i,
      ) => (
        <div key={ i }>
          <h3 data-testid="0-horizontal-top-text">
            {alcoholicOrNot}
          </h3>
          <img
            src={ image }
            alt="imagem da refeição"
            data-testid="recipe-photo"
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
          ))
        </div>
      ))}
      { isCopied && <div className="link__copied">Link copied!</div> }
    </div>
  );
}

RecipesDone.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
