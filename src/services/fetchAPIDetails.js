export const fetchDetailsFoodAPI = async (id) => {
  const details = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const json = await details.json();
  const { meals } = await json;
  return meals[0];
};

export const fetchDetailsDrinksAPI = async () => {

};
