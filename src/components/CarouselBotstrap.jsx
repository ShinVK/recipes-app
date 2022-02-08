/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { Card, CardHeader, CardMedia, Grid } from '@mui/material';

export default function CarouselBotstrap({ itensCar, foods }) {
  const [index, setindex] = useState(0);

  const handleSelect = () => {
    if (index === +'2') return setindex(0);

    setindex((prev) => (prev + 1));
  };

  let i3 = +'-2';

  return (
    <Carousel activeIndex={ index } onWheel={ () => handleSelect() }>
      { itensCar.map((el, i) => {
        i3 += 2;
        return (
          <Carousel.Item key={ i }>
            {/* <div className="d-flex flex-row"> */}
            <Grid
              container
              // direction="row"
              justifyContent="space-around"
              alignItems="center"
              // spacing={ 2 }
              sx={ { mt: 5, mb: 10, zIndex: 1 } }
            >
              <Grid item xs={ 6 }>
                <Card
                  sx={ { maxWidth: 165 } }
                  data-testid={ `${i3}-recomendation-card` }
                >
                  <CardHeader
                    data-testid={ `${i3}-recomendation-title` }
                    title={ (!foods) ? el[0].strDrink : el[0].strMeal }
                  />
                  <CardMedia
                    component="img"
                    width="110"
                    image={ (!foods) ? el[0].strDrinkThumb : el[0].strMealThumb }
                    alt="drink recomendation"
                  />
                </Card>
              </Grid>
              <Grid item xs={ 6 }>
                <Card
                  sx={ { maxWidth: 165 } }
                  data-testid={ `${i3 + 1}-recomendation-card` }
                >
                  <CardHeader
                    data-testid={ `${i3 + 1}-recomendation-title` }
                    title={ (!foods) ? el[1].strDrink : el[1].strMeal }
                  />
                  <CardMedia
                    component="img"
                    width="110"
                    image={ (!foods) ? el[1].strDrinkThumb : el[1].strMealThumb }
                    alt="drink recomendation"
                  />
                </Card>
              </Grid>
            </Grid>
            {/* </div> */}
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
