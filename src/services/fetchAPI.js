const filterType = (type) => {
  switch (type) {
  case 'radio2':
    return 'v1/1/search.php?s=';
  case 'radio3':
    return 'v1/1/search.php?f=';
  case 'radio1':
    console.log('oi');
    return 'v1/1/search.php?i=';
  default:
    return '';
  }
};
export const fetchFoodAPI = async (type, item) => {
  const { searchRadio } = type;
  const URLBase = 'https://www.themealdb.com/api/json/';
  const endPoint = filterType(searchRadio);
  const URLComplete = `${URLBase}${endPoint}${item}`;
  console.log(URLComplete);
  const response = await fetch(URLComplete);
  const { meals } = await response.json();
  // return meals;
  console.log(meals);
};

export const fetchDrinkAPI = async (type, item) => {
  const { searchRadio } = type;
  const URLBase = 'https://www.thecocktaildb.com/api/json/';
  const endPoint = filterType(searchRadio);
  const URLComplete = `${URLBase}${endPoint}${item}`;
  console.log(URLComplete);
  const response = await fetch(URLComplete);
  const { meals } = await response.json();
  // return meals;
  console.log(meals);
};
