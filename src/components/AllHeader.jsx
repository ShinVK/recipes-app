import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import MyContext from '../context/Mycontext';
// import Header from './Header';
import HeaderBar from './mui/HeaderBar';
import SearchHeader from './SearchHeader';

export default function AllHeader({ actPage, title, btnSearch = true }) {
  const { stateHook: { isSearching } } = useContext(MyContext);
  return (
    <>
      <HeaderBar title={ title } search={ btnSearch } />
      { isSearching ? <SearchHeader page={ actPage } /> : null}
    </>);
}

AllHeader.propTypes = {
  actPage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  btnSearch: PropTypes.bool,
};

AllHeader.defaultProps = {
  btnSearch: true,
};
