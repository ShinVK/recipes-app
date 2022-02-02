import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { Carousel } from 'bootstrap';
import Carousel from 'react-bootstrap/Carousel';
// import { CarouselItem } from 'react-bootstrap';

export default function CarouselBotstrap({ itensCar, foods }) {
  const [index, setindex] = useState(0);

  const handleSelect = () => {
    console.log(index);
    if (index === +'2') return setindex(0);

    setindex((prev) => (prev + 1));
  };

  let i3 = +'-2';

  // const divideArray = (arr, num) => {
  //   const arrFinal = [];
  //   while (arr.length) {
  //     arrFinal.push(arr.splice(0, num));
  //   }
  //   return arrFinal;
  // };

  // console.log(divideArray(itensCar, 2));

  return (
    <Carousel activeIndex={ index } onWheel={ () => handleSelect() }>
      { itensCar.map((el, i) => {
        i3 += 2;
        return (
          <Carousel.Item key={ i }>
            <div className="d-flex flex-row">
              <div
                data-testid={ `${i3}-recomendation-card` }
              >
                <img
                  src={ (!foods) ? el[0].strDrinkThumb : el[0].strMealThumb }
                  alt="drink recomendation"
                  style={ { width: '130px' } }
                />
                <h2 data-testid={ `${i3}-recomendation-title` }>
                  {(!foods) ? el[0].strDrink : el[0].strMeal}
                </h2>
              </div>
              <div
                data-testid={ `${i3 + 1}-recomendation-card` }
              >
                <img
                  src={ (!foods) ? el[1].strDrinkThumb : el[1].strMealThumb }
                  alt="drink recomendation"
                  style={ { width: '130px' } }
                />
                <h2 data-testid={ `${i3 + 1}-recomendation-title` }>
                  {(!foods) ? el[1].strDrink : el[1].strMeal}
                </h2>
              </div>
            </div>
          </Carousel.Item>
        );
      }) }

    </Carousel>
  );
}

CarouselBotstrap.propTypes = {
  itensCar: PropTypes.arrayOf(Object).isRequired,
  foods: PropTypes.bool.isRequired,
};
