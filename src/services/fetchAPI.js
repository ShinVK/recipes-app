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

// import { useEffect, useState } from 'react';

// function useRequestPlanets() {
//   const URLStarWars = 'https://swapi-trybe.herokuapp.com/api/planets/';
//   const [data, setData] = useState([]);
//   // const [planet, setPlanets] = useState();

//   const requestStarWars = async () => {
//     const response = await fetch(URLStarWars);
//     const dataPlanets = await response.json();
//     // console.log(dataPlanets.results);
//     setData(dataPlanets.results);
//   };

//   useEffect(() => {
//     // console.log('didmount');
//     requestStarWars();
//   }, []);
//   return [data];
// }

// export default useRequestPlanets;
