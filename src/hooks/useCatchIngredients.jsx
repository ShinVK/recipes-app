import { useEffect, useState } from 'react';

export default function useCatchIngredients(arr, status2, id, isFood = true) {
  const [ingredients2, setIngredients2] = useState([]);
  const [steps2, setSteps2] = useState();

  useEffect(() => {
    const catchIngredients = (arr2, status, id2) => {
      // console.log(status);
      const ingredientsConst = [];
      const numberItens = 20;
      const index2 = isFood ? 'meals' : 'cocktails';
      if (Object.keys(arr2).length !== 0) {
        for (let index = 1; index <= numberItens; index += 1) {
          const ingredient = arr2[`strIngredient${index}`];
          const measure = arr2[`strMeasure${index}`];
          if (ingredient) {
            ingredientsConst.push(`${ingredient} - ${measure}`);
          }
        }
        setIngredients2(ingredientsConst);
      }
      if (status) {
        const arrListSteps = localStorage.inProgressRecipes;
        const entriesArr = Object.entries(JSON.parse(arrListSteps));
        const filterEl = entriesArr.filter((el) => el[0] === index2);
        const entriesRecipes = Object.entries(filterEl[0][1]);
        const idAct = entriesRecipes.filter((el) => el[0] === id2);
        setSteps2(idAct[0][1]);
      } else {
        setSteps2(new Array(ingredientsConst.length).fill(false));
      }
    };
    catchIngredients(arr, status2, id);
  }, [arr, id, status2, isFood]);

  return [ingredients2, steps2];
}
