import { useEffect, useState } from 'react';
import {
  fetchCategoriesDrink, fetchCategoriesFood, fetchDrinksInitial, fetchFoodInitial }
from '../services/fetchAPI';

export default function useRecipesAPI() {
  const [foodCat, setfoodCat] = useState([]);
  const [drinksCat, setdrinksCat] = useState([]);
  const [defaultFoods, setDefaultFoods] = useState([]);
  const [defaultDrinks, setdefaultDrinks] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    const saveItemsAPI = async () => {
      if (isSubscribed) {
        try {
          const responseDrinks = await fetchDrinksInitial();
          const response = await fetchFoodInitial();
          const categFoods = await fetchCategoriesFood();
          const categDrinks = await fetchCategoriesDrink();
          setfoodCat(categFoods);
          setdrinksCat(categDrinks);
          setDefaultFoods(response);
          setdefaultDrinks(responseDrinks);
        } catch (error) { console.log(error); }
      }
    };
    saveItemsAPI();
    return () => { isSubscribed = false; };
  }, []);
  return [foodCat, drinksCat, defaultDrinks, defaultFoods];
}
