import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import AllHeader from '../components/AllHeader';
import shareIcon from '../images/shareIcon.svg';
import MyContext from '../context/Mycontext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useFavoriteFromLocal from '../hooks/useFavoriteFromLocal';
import BottomNav from '../components/mui/BottomNav';

export default function FavoritesRecipes({ history: { location } }) {
  const {
    stateHook:
    {
      isCopied,
      copyClipBoard,
      // handleClickFavorite,
      removeFavorite,
    } } = useContext(MyContext);
  const [up, setUp] = useState(true);
  const [allRecipes, meals, drinks, updt] = useFavoriteFromLocal(up);
  const [recipes, setRecipes] = useState(allRecipes);
  const isFavorite = true;
  const history = useHistory();

  useEffect(() => {
    setRecipes(allRecipes);
    setUp(updt);
  }, [allRecipes, updt]);

  return (
    <>
      <div>
        <AllHeader
          title="Favorite Recipes"
          btnSearch={ false }
          actPage={ location.pathname }
        />
        <p>Receitas Favoritas</p>
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
        {recipes.length > 0 && recipes.map((
          { id,
            image,
            category,
            nationality,
            name,
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
                <input
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  type="image"
                  src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                  alt="search icon"
                  onClick={ () => { removeFavorite(id); setUp(true); } }
                />
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
              <input
                data-testid={ `${i}-horizontal-favorite-btn` }
                type="image"
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                alt="search icon"
                onClick={ () => { removeFavorite(id); setUp(true); } }
              />
            </div>
          );
        })}
        { isCopied && <div className="link__copied">Link copied!</div> }
      </div>
      <BottomNav />
    </>
  );
}

FavoritesRecipes.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
