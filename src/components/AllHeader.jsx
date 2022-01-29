import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import MyContext from '../context/Mycontext';
import Header from './Header';
import SearchHeader from './SearchHeader';

export default function AllHeader({ actPage }) {
  const { stateHook: { isSearching } } = useContext(MyContext);
  return (
    <div>
      <Header />
      { isSearching ? <SearchHeader page={ actPage } /> : null}
    </div>);
}

AllHeader.propTypes = {
  actPage: PropTypes.string.isRequired,
};
