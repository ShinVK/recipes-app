import { useEffect, useState } from 'react';

export default function useIsFavorite(idMeal) {
  const [isFavoriteRecipe, setisFavorite] = useState();

  useEffect(() => {
    const filterFavorite = () => {
      const arrRecipes = JSON.parse(localStorage.favoriteRecipes);
      if (arrRecipes) {
        const isFav = arrRecipes.some(({ id }) => id === idMeal);
        console.log(isFav);
        setisFavorite(isFav);
      } else { setisFavorite(false); }
    };
    filterFavorite();
  }, [idMeal]);

  return [isFavoriteRecipe];
}
