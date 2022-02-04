import { useEffect, useState } from 'react';

export default function useFavoriteFromLocal(up) {
  const [meals, setmeals] = useState([]);
  const [drinks, setdrinks] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [updt, setUpdt] = useState();

  useEffect(() => {
    const getItens = () => {
      if (localStorage.getItem('favoriteRecipes') && up) {
        const itens2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
        const foodsLocal = itens2.filter(({ type }) => type === 'food');
        const drinksLocal = itens2.filter(({ type }) => type === 'drink');

        setAllRecipes(itens2);
        setmeals(foodsLocal);
        setdrinks(drinksLocal);
      }
    };
    getItens();
    return () => setUpdt(false);
  }, [up]);
  return [allRecipes, meals, drinks, updt];
}
