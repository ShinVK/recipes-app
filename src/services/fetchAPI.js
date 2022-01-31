const filterType = (type) => {
  switch (type) {
  case 'radio2':
    return 'v1/1/search.php?s=';
  case 'radio3':
    return 'v1/1/search.php?f=';
  case 'radio1':
    return 'v1/1/filter.php?i=';
  default:
    return '';
  }
};
export const fetchFoodAPI = async (type, item) => {
  const URLBase = 'https://www.themealdb.com/api/json/';
  const endPoint = filterType(type);
  const URLComplete = `${URLBase}${endPoint}${item}`;
  // console.log(URLComplete);
  try {
    const response = await fetch(URLComplete);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    // return global.alert(strAlert);
    console.error(`deu ruim ${error}`);
  }
};

export const fetchDrinkAPI = async (type, item) => {
  const URLBase = 'https://www.thecocktaildb.com/api/json/';
  const endPoint = filterType(type);
  const URLComplete = `${URLBase}${endPoint}${item}`;
  const response = await fetch(URLComplete);
  const { drinks } = await response.json();
  return drinks;
};

export const fetchFoodInitial = async () => {
  const URLFOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URLFOOD);
  const { meals } = await response.json();
  // console.log(meals);
  return meals;
};

export const fetchDrinksInitial = async () => {
  const URLDRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URLDRINKS);
  const { drinks } = await response.json();
  // console.log(meals);
  return drinks;
};

export const fetchCategoriesFood = async () => {
  const URLDRINKS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URLDRINKS);
  const { meals } = await response.json();
  // console.log(meals);
  return meals;
};

export const fetchCategoriesDrink = async () => {
  const URLDRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URLDRINKS);
  const { drinks } = await response.json();
  return drinks;
};
