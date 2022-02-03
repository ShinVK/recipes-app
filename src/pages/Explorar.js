import React from 'react';
// import AllHeader from '../components/AllHeader';

import { useHistory } from 'react-router-dom';

export default function Explorar() {
  const history = useHistory();

  return (
    <div>
      {/* <AllHeader title="Explore" btnSearch={ false } /> */}
      {/* <p>Tela Principal</p> */}
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
    </div>
  );
}
