import React from 'react';
import PropTypes from 'prop-types';

export default function CarouselBotstrap({ itensCar }) {
  return (
    <div className="container__carousel overflow-auto">
      {itensCar.map(({ strDrink, strDrinkThumb }, i) => (
        <div
          key={ i }
          data-testid={ `${i}-recomendation-card` }
          style={ { width: '200px' } }
        >
          <img
            src={ strDrinkThumb }
            alt="Bebida recomendada"
            style={ { width: '130px' } }
          />
          <h2>{strDrink}</h2>
        </div>
      ))}
    </div>
  );
}

CarouselBotstrap.propTypes = {
  itensCar: PropTypes.arrayOf(Object).isRequired,
};
