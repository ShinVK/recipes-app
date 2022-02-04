import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import AllHeader from '../components/AllHeader';
import Footer from '../components/Footer';

export default function Explorar({ history: { location } }) {
  const history = useHistory();

  return (
    <div>
      <AllHeader
        actPage={ location.pathname }
        title="Explore"
        btnSearch={ false }
      />
      <button
        type="button"
        data-testid="explore-foods"
        onClick={ () => history.push('/explore/foods') }
      >
        Explore Foods
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explore/drinks') }
      >
        Explore Drinks
      </button>
      <Footer />
    </div>
  );
}

Explorar.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
