import { useEffect, useState } from 'react';

export default function useUpdateDetailRecipe(path, isFood) {
  const [detailItem, setdetailItem] = useState([]);
  const id = path.replace(/[^0-9]/g, '');

  useEffect(() => {
    let isSubscribed = true;
    const URLstr = (isFood) ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const itemType = (isFood) ? 'meals' : 'drinks';
    if (isSubscribed) {
      const requestDetailItem = async () => {
        try {
          const response = await fetch(URLstr);
          const data = await response.json();
          console.log(data);
          setdetailItem(data[itemType][0]);
        } catch (error) {
          console.log(error);
        }
      };
      requestDetailItem();
    }
    return () => { isSubscribed = false; };
  }, [id, isFood]);

  return [detailItem, id];
}
