import React from 'react';
import AllHeader from '../components/AllHeader';
import Footer from '../components/Footer';

export default function ExploreDrinks() {
  return (
    <div>
      <AllHeader title="Explore Drinks" btnSearch={ false } />
      <p>Tela de explorar os drinks</p>
      <Footer />
    </div>
  );
}
