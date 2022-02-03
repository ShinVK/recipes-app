import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useIsFavorite from '../hooks/useIsFavorite';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { drinkObj, filterLocalStorage, foodObj } from '../services/favRecipes';
import { saveFavoriteRecipes } from '../services/localStorage';

export default function BtnFav({ recipe, id, isFood }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriteRecipe] = useIsFavorite(id);

  useEffect(() => {
    setIsFavorite(isFavoriteRecipe);
  }, [isFavoriteRecipe]);

  const onClickFavorite = (idRec) => {
    if (!isFavorite) {
      const recipeFav = (isFood) ? foodObj(recipe) : drinkObj(recipe);
      saveFavoriteRecipes(recipeFav);
    } else {
      filterLocalStorage(idRec);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <input
      data-testid="favorite-btn"
      type="image"
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      alt="search icon"
      onClick={ () => onClickFavorite(id) }
    />);
}

BtnFav.propTypes = {
  recipe: PropTypes.objectOf(Object).isRequired,
  id: PropTypes.string.isRequired,
  isFood: PropTypes.bool.isRequired,
};
