import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import AllHeader from '../components/AllHeader';
import useFetchIngredients from '../hooks/useFetchIngredients';
import MyContext from '../context/Mycontext';
import BottomNav from '../components/mui/BottomNav';

export default function ExploreFoodsIng({ history: { location } }) {
  const { stateHook: { filter } } = useContext(MyContext);
  const [foodsIng] = useFetchIngredients(true);
  return (
    <div>
      <AllHeader
        actPage={ location.pathname }
        title="Explore Ingredients"
        btnSearch={ false }
      />
      <Grid
        container
        spacing={ 1 }
        justifyContent="center"
        minWidth="300px"
        sx={ { mb: 10, mt: 5 } }
      >
        {foodsIng && foodsIng.map(({ strIngredient }, index) => (
          <Grid
            key={ index }
            item
            minWidth="140px"
            style={ { textAlign: 'center' } }
          >
            <Card
              sx={ { maxWidth: 150, bgcolor: '#fdf8f6' } }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => filter(true, strIngredient) }
              aria-hidden="true"
              className="card__recipes"
              role="button"
            >
              <CardMedia
                component="img"
                height="100"
                image={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                alt="Imagem do ingrediente"
                data-testid={ `${index}-card-img` }
              />
              <CardContent>
                <Typography variant="h5" component="div" color="secondary">
                  { strIngredient }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <BottomNav />
    </div>
  );
}

ExploreFoodsIng.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
