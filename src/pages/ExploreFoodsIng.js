import React from 'react';
import AllHeader from '../components/AllHeader';
import Footer from '../components/Footer';

export default function ExploreFoodsIng() {
  return (
    <div>
      <AllHeader title="Explore Ingredients" btnSearch={ false } />
      <p>Explorar comida pelos ingredientes</p>
      <Footer />
    </div>
  );
}
