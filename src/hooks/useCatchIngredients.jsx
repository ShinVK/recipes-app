import { useEffect, useState } from 'react';

export default function useCatchIngredients(arr, id) {
  const [ingredients2, setIngredients2] = useState([]);
  const [steps2, setSteps2] = useState();

  useEffect(() => {
    const catchIngredients = (arr2, id2) => {
      const ingredientsConst = [];
      const numberItens = 20;
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
      const arrListSteps = localStorage.recipesInprogress;
      if (!arrListSteps) {
        setSteps2(new Array(ingredientsConst.length).fill(false));
      } else {
        const entriesArr = Object.entries(JSON.parse(arrListSteps));
        const idAct = entriesArr.filter((el) => el[0] === id2);
        const result = idAct ? idAct[0][1]
          : new Array(ingredientsConst.length).fill(false);
        setSteps2(result);
      }
    };
    catchIngredients(arr, id);
  }, [arr, id]);

  return [ingredients2, steps2];
}
