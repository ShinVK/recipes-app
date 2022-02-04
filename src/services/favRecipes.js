import { saveFavoriteRecipes } from './localStorage';
import dataAtual from './supportFunctions';

export const foodObj = (obj) => {
  const { idMeal, strArea, strCategory, strMeal, strMealThumb } = obj;
  return {
    id: idMeal,
    type: 'food',
    nationality: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };
};

export const drinkObj = (obj) => {
  const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb } = obj;
  return {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };
};

export const filterLocalStorage = (idRecipe) => {
  const arrRecipes = JSON.parse(localStorage.favoriteRecipes);
  const recipesFIltered = arrRecipes.filter(({ id }) => id !== idRecipe);
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipesFIltered));
};

export const onClickFavorite = (idRec, isFood, isFavorite, recipe) => {
  if (!isFavorite) {
    const recipeFav = (isFood) ? foodObj(recipe) : drinkObj(recipe);
    saveFavoriteRecipes(recipeFav);
  } else {
    filterLocalStorage(idRec);
  }
};

export const recipeFavorite = (idMeal) => {
  if (localStorage.favoriteRecipes) {
    const arrRecipes = JSON.parse(localStorage.favoriteRecipes);
    const isFav = arrRecipes.some(({ id }) => id === idMeal);
    return isFav;
  } return false;
};

export const foodsDone = (obj) => {
  const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags } = obj;
  return {
    id: idMeal,
    type: 'food',
    nationality: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
    doneDate: dataAtual(),
    tags: strTags ? strTags.split(',') : '',
  };
};

export const drinkDone = (obj) => {
  const { idDrink, strCategory, strAlcoholic, strDrink, strTags, strDrinkThumb } = obj;
  return {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
    doneDate: dataAtual(),
    tags: strTags ? strTags.split(',') : [],
  };
};
