import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';
import MyContext from './Mycontext';
import {
  fetchDrinkAPI,
  fetchFilterCategory,
  fetchFoodAPI,
} from '../services/fetchAPI';
import useRecipesAPI from '../hooks/useRecipesAPI';
import { drinkObj, filterLocalStorage, foodObj } from '../services/favRecipes';
import { saveFavoriteRecipes } from '../services/localStorage';

export default function Provider({ children }) {
  const [isSearching, setIsSearching] = useState(false);
  const [foodCat, drinksCat, defaultDrinks, defaultFoods] = useRecipesAPI();
  const [foodsAPI, setfoodsAPI] = useState(defaultFoods);
  const [drinksAPI, setdrinksAPI] = useState(defaultDrinks);
  const [catFoods, setcatFoods] = useState('');
  const [catDrinks, setcatDrinks] = useState('');
  const [isRedirect, setisRedirect] = useState(false);
  const [idItem, setidItem] = useState('');
  const [isFavorite, setIsFavorite] = useState('');
  const [actURL, setActUrl] = useState('');
  const history = useHistory();

  const handleClick = async (value, page) => {
    // const { value } = target;
    setisRedirect(false);
    if (page === 'food') {
      if (value === 'All') {
        return setfoodsAPI(defaultFoods);
      }
      setcatFoods((value));
      const results = await fetchFilterCategory(value, page);
      setfoodsAPI(results);
    } if (page === 'drinks') {
      if (value === 'All') return setdrinksAPI(defaultDrinks);
      setcatDrinks(value);
      const results = await fetchFilterCategory(value, page);
      setdrinksAPI(results);
    }
  };

  const location = useLocation();
  useEffect(() => {
    setActUrl(location.pathname);
    setIsSearching(false);
    const idFromUrl = location.pathname.replace(/[^0-9]/g, '');
    if (idFromUrl.length > +'3') { setidItem(idFromUrl); }
  }, [location]);

  const handleClickRedirect = (id) => {
    setidItem(id);
    if (actURL.includes('food')) {
      history.push(`/foods/${id}`);
    } else {
      history.push(`/drinks/${id}`);
    }
  };

  useEffect(() => {
    const recipeFavorite = (idMeal) => {
      if (localStorage.favoriteRecipes) {
        const arrRecipes = JSON.parse(localStorage.favoriteRecipes);
        const isFav = arrRecipes.some(({ id }) => id === idMeal);
        setIsFavorite(isFav);
      } else { setIsFavorite(false); }
    };
    recipeFavorite(idItem);
  }, [idItem]);

  useEffect(() => {
    let updateItems = true;
    if (updateItems) {
      setfoodsAPI(defaultFoods);
      setdrinksAPI(defaultDrinks);
    }
    return () => {
      updateItems = false;
    };
  }, [defaultFoods, defaultDrinks]);

  const onClickSearch = async (type, item, page = '/foods') => {
    const strAlert = 'Sorry, we haven\'t found any recipes for these filters.';
    const { searchRadio } = type;
    setisRedirect(true);
    if (searchRadio === 'radio3' && item.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (page === '/foods') {
      const foodsResponse = await fetchFoodAPI(searchRadio, item);
      if (!foodsResponse) return global.alert(strAlert);
      setfoodsAPI(foodsResponse);
    }
    if (page === '/drinks') {
      const drinksResponse = await fetchDrinkAPI(searchRadio, item);
      if (!drinksResponse) return global.alert(strAlert);
      setdrinksAPI(drinksResponse);
    }
  };

  const showSearchInput = () => {
    setIsSearching(!isSearching);
  };

  const handleClickFavorite = (id, obj, isFood = true) => {
    if (!isFavorite) {
      const recipeFav = (isFood) ? foodObj(obj) : drinkObj(obj);
      saveFavoriteRecipes(recipeFav);
    } else {
      filterLocalStorage(id);
    }
    setIsFavorite(!isFavorite);
  };

  const removeFavorite = (id) => {
    filterLocalStorage(id);
  };

  const filterByIngredient = async (isFood, ingredient) => {
    if (isFood) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const { meals } = await response.json();
      setfoodsAPI(meals);
      history.push('/foods');
    } else {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
      const response = await fetch(URL);
      const { drinks } = await response.json();
      setdrinksAPI(drinks);
      history.push('/drinks');
    }
  };

  const stateHook = {
    isSearching,
    onClickSearch,
    showSearchInput,
    foodsAPI,
    drinksAPI,
    categoriesDrinks: drinksCat,
    categoriesFood: foodCat,
    catFoods,
    catDrinks,
    handleClick,
    isRedirect,
    setidItem,
    idItem,
    handleClickRedirect,
    isFavorite,
    handleClickFavorite,
    removeFavorite,
    filter: filterByIngredient,
  };

  return (
    <MyContext.Provider value={ { stateHook } }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
