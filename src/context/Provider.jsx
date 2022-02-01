import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Mycontext';
import { fetchDrinkAPI, fetchFoodAPI } from '../services/fetchAPI';
import { fetchDetailsFoodAPI } from '../services/fetchAPIDetails';

export default function Provider({ children }) {
  const [isSearching, setIsSearching] = useState(false);
  const [foodsAPI, setfoodsAPI] = useState([]);
  // const [actpage, setactPage] = useState('');
  const [drinksAPI, setdrinksAPI] = useState([]);
  const [detailsFood, setDetailsFood] = useState({});

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

  const getDetailsFood = async (id) => {
    const data = await fetchDetailsFoodAPI(id);
    setDetailsFood(data);
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
