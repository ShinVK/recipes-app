import PropTypes from 'prop-types';
import React from 'react';
import AllHeader from '../components/AllHeader';

export default function Foods({ history: { location } }) {
  return (
    <div>
      <AllHeader actPage={ location.pathname } />
      <p>  Tela de Comidas </p>
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
