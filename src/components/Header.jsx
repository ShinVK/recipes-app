import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import MyContext from '../context/Mycontext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title, search }) {
  const history = useHistory();
  const { stateHook: { showSearchInput } } = useContext(MyContext);

  return (
    <div>
      <h3 data-testid="page-title">{title}</h3>
      <input
        type="image"
        src={ profileIcon }
        alt="profile icon"
        data-testid="profile-top-btn"
        onClick={ () => { history.push('/profile'); } }
      />
      { search
        ? (
          <input
            type="image"
            src={ searchIcon }
            alt="search icon"
            data-testid="search-top-btn"
            onClick={ () => showSearchInput() }
          />)
        : null}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};
