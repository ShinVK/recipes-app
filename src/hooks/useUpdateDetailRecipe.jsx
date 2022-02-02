import { useEffect, useState } from 'react';

export default function useUpdateDetailRecipe(path, isFood) {
  const [detailItem, setdetailItem] = useState([]);
  const id = path.replace(/[^0-9]/g, '');

  useEffect(() => {
    const URLstr = (isFood) ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const itemType = (isFood) ? 'meals' : 'drinks';
    const requestDetailItem = async () => {
      const response = await fetch(URLstr);
      const data = await response.json();
      setdetailItem(data[itemType][0]);
    };
    requestDetailItem();
  }, [id, isFood]);

  return [detailItem, id];
}
