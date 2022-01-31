import React from 'react';
import AllHeader from '../components/AllHeader';

export default function RecipesDone() {
  return (
    <div>
      <AllHeader title="Done Recipes" btnSearch={ false } />
      <p>Tela de receitas feitas</p>
    </div>
  );
}
