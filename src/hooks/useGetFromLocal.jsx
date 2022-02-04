import { useEffect, useState } from 'react';

export default function useGetFromLocal() {
  const [meals, setmeals] = useState();
  const [drinks, setdrinks] = useState();
  useEffect(() => {
    const getItens = () => {
      if (localStorage.getItem('doneRecipes')) {
        const itens2 = JSON.parse(localStorage.getItem('doneRecipes'));
        const foodsLocal = itens2.filter(({ type }) => type === 'food');
        const drinksLocal = itens2.filter(({ type }) => type === 'drink');

        setmeals(foodsLocal);
        setdrinks(drinksLocal);
      }
    };
    getItens();
  }, []);
  return [meals, drinks];
}
