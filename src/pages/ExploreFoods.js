import React from 'react';
import AllHeader from '../components/AllHeader';
import Footer from '../components/Footer';

export default function ExploreFoods() {
  return (
    <div>
      <AllHeader title="Explore Foods" btnSearch={ false } />
      <p>Tela de exploração das comidas</p>
      <Footer />
    </div>
  );
}
