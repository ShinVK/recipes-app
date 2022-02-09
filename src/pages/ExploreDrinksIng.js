import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import AllHeader from '../components/AllHeader';
import useFetchIngredients from '../hooks/useFetchIngredients';
import MyContext from '../context/Mycontext';
import BottomNav from '../components/mui/BottomNav';

export default function ExploreDrinksIng({ history: { location } }) {
  const { stateHook: { filter } } = useContext(MyContext);
  const [drinksIng] = useFetchIngredients(false);

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
        {drinksIng && drinksIng.map(({ strIngredient1 }, index) => (
          <Grid
            key={ index }
            item
            minWidth="140px"
            style={ { textAlign: 'center' } }
          >
            <Card
              sx={ { maxWidth: 150, bgcolor: '#fdf8f6' } }
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => filter(false, strIngredient1) }
              aria-hidden="true"
              className="card__recipes"
              role="button"
            >
              <CardMedia
                component="img"
                height="100"
                image={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                alt="Imagem do ingrediente"
                data-testid={ `${index}-card-img` }
              />
              <CardContent>
                <Typography variant="h5" component="div" color="secondary">
                  { strIngredient1 }
                </Typography>
              </CardContent>
            </Card>

          </Grid>

        ))}
      </Grid>
      {/* {drinksIng && drinksIng.map(({ strIngredient1 }, index) => (
        <div
          onClick={ () => filter(false, strIngredient1) }
          onKeyDown={ () => console.log('funciona') }
          role="button"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          tabIndex={ 0 }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            alt="Imagem do ingrediente"
            data-testid={ `${index}-card-img` }
          />
          <h5
            data-testid={ `${index}-card-name` }
          >
            {strIngredient1}
          </h5>
        </div>
      ))} */}
      <BottomNav />
    </div>
  );
}

ExploreDrinksIng.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
