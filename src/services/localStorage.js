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

export const saveRecipesInProgess = (obj) => {
  if (localStorage.recipesInprogress) {
    const objProgress = JSON.parse(localStorage.recipesInprogress);
    const updateProgress = { ...objProgress, ...obj };
    // objProgress.push(obj);
    localStorage.setItem('recipesInprogress', JSON.stringify(updateProgress));
    // console.log(Object.entries(updateProgress));
  } else {
    localStorage.setItem('recipesInprogress', JSON.stringify(obj));
  }
};
