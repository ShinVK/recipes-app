import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Mycontext';

export default function Provider({ children }) {
  const [isSearching, setIsSearching] = useState(false);

  const onClickSearch = () => {
    setIsSearching(!isSearching);
  };

  const stateHook = {
    isSearching,
    onClickSearch,
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
