import { useEffect, useState } from 'react';

export default function useFetchIngredients(isFood) {
  const [ings, setIngs] = useState([]);
  /* const [drinksIng, setDrinksIng] = useState([]); */

  useEffect(() => {
    const fetchIng = async (isFood2) => {
      if (isFood2) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        const { meals } = await response.json();
        setIngs(meals.slice(0, +'12'));
      } else {
        const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
        const response = await fetch(URL);
        const { drinks } = await response.json();
        setIngs(drinks.slice(0, +'12'));
      }
    };
    fetchIng(isFood);
  }, [isFood]);
  return [ings];
}
