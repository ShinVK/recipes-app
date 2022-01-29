import PropTypes from 'prop-types';
import React from 'react';
import AllHeader from '../components/AllHeader';

export default function Drinks({ history: { location } }) {
  return (
    <div>
      <AllHeader actPage={ location.pathname } />
      <p>Tela Principal de Drinks</p>
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
