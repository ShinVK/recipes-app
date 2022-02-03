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
  try {
    const response = await fetch(URLComplete);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) { console.log(error); }
};

export const fetchFoodInitial = async () => {
  const URLFOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  try {
    const response = await fetch(URLFOOD);
    const { meals } = await response.json();
    // console.log(meals);
    return meals;
  } catch (error) { console.log(error); }
};

export const fetchDrinksInitial = async () => {
  const URLDRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  try {
    const response = await fetch(URLDRINKS);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) { console.log(error); }
  // console.log(meals);
};

export const fetchCategoriesFood = async () => {
  const URLDRINKS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  try {
    const response = await fetch(URLDRINKS);
    const { meals } = await response.json();
    // console.log(meals);
    return meals;
  } catch (error) { console.log(error); }
};

export const fetchCategoriesDrink = async () => {
  const URLDRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  try {
    const response = await fetch(URLDRINKS);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) { console.log(error); }
};

export const fetchFilterCategory = async (item, type) => {
  const URLFoods = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const URLDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  if (type === 'food') {
    const completeURL = `${URLFoods}${item}`;
    try {
      const response = await fetch(completeURL);
      const { meals } = await response.json();
      // console.log(results);
      return meals;
    } catch (error) { console.log(error); }
  }
  if (type === 'drinks') {
    const completeURL = `${URLDrinks}${item}`;
    try {
      const response = await fetch(completeURL);
      const { drinks } = await response.json();
      return drinks;
    } catch (error) { console.log(error); }
  }
};
