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
