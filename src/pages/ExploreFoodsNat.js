import React from 'react';
import PropTypes from 'prop-types';
import AllHeader from '../components/AllHeader';
import Footer from '../components/Footer';

export default function ExploreFoodsNat({ history: { location } }) {
  return (
    <div>
      <AllHeader actPage={ location.pathname } title="Explore Nationalities" />
      <p>Explorar comidas atraves de nationalities</p>
      <Footer />
    </div>
  );
}

ExploreFoodsNat.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
