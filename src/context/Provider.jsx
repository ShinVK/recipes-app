import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Mycontext';
import {
  fetchCategoriesDrink,
  fetchCategoriesFood,
  fetchDrinkAPI,
  fetchDrinksInitial,
  fetchFoodAPI,
  fetchFoodInitial } from '../services/fetchAPI';

export default function Provider({ children }) {
  const [isSearching, setIsSearching] = useState(false);
  const [foodsAPI, setfoodsAPI] = useState([]);
  // const [actpage, setactPage] = useState('');
  const [drinksAPI, setdrinksAPI] = useState([]);
  const [categoriesFood, setcategoriesFood] = useState([]);
  const [categoriesDrinks, setcategoriesDrinks] = useState([]);
  const [catFoods, setcatFoods] = useState('');
  const [catDrinks, setcatDrinks] = useState('');

  const saveItemsAPI = async () => {
    const responseDrinks = await fetchDrinksInitial();
    const response = await fetchFoodInitial();
    const categFoods = await fetchCategoriesFood();
    const categDrinks = await fetchCategoriesDrink();
    setcategoriesDrinks(categDrinks);
    setcategoriesFood(categFoods);
    setfoodsAPI(response);
    setdrinksAPI(responseDrinks);
  };

  const handleClick = (event, page) => {
    if (page === 'food') {
      setcatFoods(event.target.value);
    } if (page === 'drinks') {
      setcatDrinks(event.target.value);
    }
  };

  useEffect(() => {
    saveItemsAPI();
  }, []);

  const onClickSearch = async (type, item, page = '/foods') => {
    const strAlert = 'Sorry, we haven\'t found any recipes for these filters.';
    const { searchRadio } = type;
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

  const stateHook = {
    isSearching,
    onClickSearch,
    showSearchInput,
    foodsAPI,
    // setactPage,
    drinksAPI,
    categoriesDrinks,
    categoriesFood,
    catFoods,
    catDrinks,
    handleClick,
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
