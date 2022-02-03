export const fetchDetailsFoodAPI = async (id) => {
  try {
    const details = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await details.json();
    const { meals } = await json;
    return meals[0];
  } catch (error) { console.log(error); }
};

export const fetchDetailsDrinksAPI = async (id) => {
  try {
    const details = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await details.json();
    const { drinks } = await json;
    return drinks[0];
  } catch (error) { console.log(error); }
};
