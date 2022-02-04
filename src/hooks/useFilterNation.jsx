import { useEffect, useState } from 'react';

export default function useFilterNation(nation) {
  const [mealsNation, setmealsNation] = useState();

  useEffect(() => {
    const fetchMealsNationality = async (nation2) => {
      if (nation2 === 'All') {
        const URLFOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(URLFOOD);
        const { meals } = await response.json();
        console.log(meals);
        setmealsNation(meals.slice(0, +'12'));
      } else {
        const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nation2}`;
        const response = await fetch(URL);
        const { meals } = await response.json();
        setmealsNation(meals.slice(0, +'12'));
      }
    };
    fetchMealsNationality(nation);
  }, [nation]);

  return [mealsNation];
}
