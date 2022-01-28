import React, { useContext } from 'react';
import MyContext from '../context/Mycontext';
import Header from './Header';
import SearchHeader from './SearchHeader';

export default function AllHeader() {
  const { stateHook: { isSearching } } = useContext(MyContext);
  return (
    <div>
      <Header />
      { isSearching ? <SearchHeader /> : null}
    </div>);
}
