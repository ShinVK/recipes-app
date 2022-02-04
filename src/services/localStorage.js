export const setLocalStorage = (key, token) => localStorage.setItem(key, token);

export const getLocalStorage = (key) => localStorage.getItem(key);

export const saveFavoriteRecipes = (obj) => {
  if (localStorage.favoriteRecipes) {
    const arrRecipes = JSON.parse(localStorage.favoriteRecipes);
    arrRecipes.push(obj);
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrRecipes));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
  }
};

export const saveRecipesInProgess = (obj, isFood = true) => {
  const strKey = isFood ? 'meals' : 'cocktails';
  if (localStorage.inProgressRecipes) {
    const objProgress = JSON.parse(localStorage.inProgressRecipes);
    const updateProgress = {
      ...objProgress, [strKey]: { ...objProgress[strKey], ...obj } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(updateProgress));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ [strKey]: obj }));
  }
};

export const saveRecipesDone = (obj) => {
  if (localStorage.doneRecipes) {
    const arrRecipesFinished = JSON.parse(localStorage.doneRecipes);
    arrRecipesFinished.push(obj);
    localStorage.setItem('doneRecipes', JSON.stringify(arrRecipesFinished));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([obj]));
  }
};
