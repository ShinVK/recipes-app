import { useEffect, useState } from 'react';

export default function useNationality() {
  const [nationalities, setnationalities] = useState();

  useEffect(() => {
    const fetchNationality = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const response = await fetch(URL);
      const { meals } = await response.json();
      setnationalities(meals);
    };
    fetchNationality();
  }, []);

  return [nationalities];
}
