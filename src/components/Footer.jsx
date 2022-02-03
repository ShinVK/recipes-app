import React from 'react';
import { useHistory } from 'react-router';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();

  return (
    <footer
      data-testid="footer"
      style={ { position: 'fixed', bottom: 0 } }
    >
      <input
        data-testid="drinks-bottom-btn"
        type="image"
        onClick={ () => { history.push('/drinks'); } }
        src={ drinkIcon }
        alt="Drink icon"
      />
      <input
        data-testid="explore-bottom-btn"
        type="image"
        onClick={ () => { history.push('/explore'); } }
        src={ exploreIcon }
        alt="Explore icon"
      />
      <input
        data-testid="food-bottom-btn"
        type="image"
        name="foods"
        onClick={ () => { history.push('/foods'); } }
        src={ mealIcon }
        alt="Meal icon"
      />
    </footer>
  );
}
