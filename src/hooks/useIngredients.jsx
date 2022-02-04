import { useEffect, useState } from 'react';

export default function useIngredients(arr, isFood) {
  const [ingredients2, setIngredients2] = useState([]);
  const [video2, setVideo2] = useState('');

  useEffect(() => {
    const catchIngredients = (arr2, isFood2) => {
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
      if (isFood2) {
        const linkVideo = arr2.strYoutube;
        const codigoVideo = linkVideo ? linkVideo.split('=') : '';
        setVideo2(`https://www.youtube.com/embed/${codigoVideo[1]}`);
      }
    };
    catchIngredients(arr, isFood);
  }, [arr, isFood]);

  return [ingredients2, video2];
}
