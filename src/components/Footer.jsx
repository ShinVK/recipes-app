import React from 'react';
import { useHistory } from 'react-router';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ () => { history.push('/drinks'); } }
      >
        <img src={ drinkIcon } alt="Drink icon" />
      </button>
      <button
        data-testid="explore-bottom-btn"
        type="button"
        onClick={ () => { history.push('/explore'); } }
      >
        <img src={ exploreIcon } alt="Explore icon" />
      </button>
      <button
        data-testid="food-bottom-btn"
        type="button"
        name="foods"
        onClick={ () => { history.push('/foods'); } }
      >
        <img src={ mealIcon } alt="Meal icon" />
      </button>
    </footer>
  );
}
