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
        <object
          type="image/svg+xml"
          data={ drinkIcon }
        >
          Drinks
        </object>
      </button>
      <button
        data-testid="explore-bottom-btn"
        type="button"
        onClick={ () => { history.push('/explore'); } }
      >
        <object
          type="image/svg+xml"
          data={ exploreIcon }
        >
          Explore
        </object>
      </button>
      <button
        data-testid="food-bottom-btn"
        type="button"
        name="foods"
        onClick={ () => { history.push('/foods'); } }
      >
        <object
          type="image/svg+xml"
          data={ mealIcon }
        >
          Food
        </object>
      </button>
    </footer>
  );
}
