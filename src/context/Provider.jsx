import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Mycontext';
import { fetchDetailsFoodAPI, fetchDetailsDrinksAPI } from '../services/fetchAPIDetails';
import {
  fetchCategoriesDrink,
  fetchCategoriesFood,
  fetchDrinkAPI,
  fetchDrinksInitial,
  fetchFilterCategory,
  fetchFoodAPI,
  fetchFoodInitial } from '../services/fetchAPI';

export default function Provider({ children }) {
  const [isSearching, setIsSearching] = useState(false);
  const [foodsAPI, setfoodsAPI] = useState([]);
  const [drinksAPI, setdrinksAPI] = useState([]);
  const [detailsFood, setDetailsFood] = useState({});
  const [categoriesFood, setcategoriesFood] = useState([]);
  const [categoriesDrinks, setcategoriesDrinks] = useState([]);
  const [catFoods, setcatFoods] = useState('');
  const [catDrinks, setcatDrinks] = useState('');
  const [isRedirect, setisRedirect] = useState(false);
  const [detailsDrinks, setDetailsDrinks] = useState({});

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

  const handleClick = async ({ target }, page) => {
    const { value } = target;
    setisRedirect(false);
    if (page === 'food') {
      if (catFoods === value || value === 'all') return saveItemsAPI();
      setcatFoods((value));
      const results = await fetchFilterCategory(value, page);
      setfoodsAPI(results);
    } if (page === 'drinks') {
      if (catDrinks === value || value === 'all') return saveItemsAPI();
      setcatDrinks(value);
      const results = await fetchFilterCategory(value, page);
      setdrinksAPI(results);
    }
  };

  useEffect(() => {
    saveItemsAPI();
  }, []);

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

  const getDetailsFood = async (ide) => {
    const data = await fetchDetailsFoodAPI(ide);
    setDetailsFood(data);
  };

  const getDetailsDrinks = async (ide) => {
    const data = await fetchDetailsDrinksAPI(ide);
    setDetailsDrinks(data);
  };

  const stateHook = {
    isSearching,
    onClickSearch,
    showSearchInput,
    foodsAPI,
    // setactPage,
    drinksAPI,
    getDetailsFood,
    detailsFood,
    categoriesDrinks,
    categoriesFood,
    catFoods,
    catDrinks,
    handleClick,
    isRedirect,
    getDetailsDrinks,
    detailsDrinks,
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
