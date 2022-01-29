import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Mycontext';
import { fetchDrinkAPI, fetchFoodAPI } from '../services/fetchAPI';

export default function Provider({ children }) {
  const [isSearching, setIsSearching] = useState(false);
  const [foodsAPI, setfoodsAPI] = useState([]);
  const [actpage, setactPage] = useState('');
  const [drinksAPI, setdrinksAPI] = useState([]);

  const onClickSearch = async (type, item) => {
    console.log(actpage);
    if (actpage === 'food') {
      const foodsResponse = await fetchFoodAPI(type, item);
      setfoodsAPI(foodsResponse);
    }
    if (actpage === 'drink') {
      const drinksResponse = await fetchDrinkAPI(type, item);
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
    setactPage,
    drinksAPI,
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
