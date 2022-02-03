import { useEffect, useState } from 'react';

export default function useCatchIngredients(arr) {
  const [ingredients2, setIngredients2] = useState([]);
  const [steps2, setSteps2] = useState();

  useEffect(() => {
    const catchIngredients = (arr2) => {
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
        setSteps2(new Array(ingredientsConst.length).fill(false));
      }
    };
    catchIngredients(arr);
  }, [arr]);

  return [ingredients2, steps2];
}
