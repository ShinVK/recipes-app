import React from 'react';
import AllHeader from '../components/AllHeader';

export default function FavoritesRecipes() {
  return (
    <div>
      <AllHeader title="Favorite Recipes" btnSearch={ false } />
      <p>Receitas Favoritas</p>
    </div>
  );
}
