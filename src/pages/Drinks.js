import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import AllHeader from '../components/AllHeader';
import MyContext from '../context/Mycontext';
import BottomNav from '../components/mui/BottomNav';

export default function Drinks({ history: { location } }) {
  const { stateHook:
    {
      drinksAPI,
      categoriesDrinks,
      handleClick,
      isRedirect,
      handleClickRedirect,
    } } = useContext(MyContext);
  const [taBvalue, setTabValue] = useState('All');

  const reduceDrinks12 = (arr, num) => {
    const drinks12 = arr.slice(0, num);
    return drinks12;
  };

  const handleChangeTab = (event, newValue) => {
    handleClick(newValue, 'drinks');
    setTabValue(newValue);
  };

  const redirectDetailedPage = (arr) => {
    const { idDrink } = arr[0];
    return <Redirect push to={ `/drinks/${idDrink}` } />;
  };

  return (
    <>
      <AllHeader title="Drinks" actPage={ location.pathname } />
      <Box
        sx={ { '@ sx': { maxWidth: 330 } } }
        justify="space-around"
        color="primary"
      >
        <Box sx={ { width: '100%' } }>
          <Tabs
            value={ taBvalue }
            onChange={ handleChangeTab }
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            aria-label="secondary tabs example"
          >
            <Tab value="All" label="All" />
            {reduceDrinks12(categoriesDrinks, +'5').map(({ strCategory }, i) => (
              <Tab
                value={ strCategory }
                key={ i }
                data-testid={ `${strCategory}-category-filter` }
                label={ strCategory }
              />
            ))}
          </Tabs>
        </Box>
      </Box>
      <Toolbar />

      <Grid
        container
        spacing={ 1 }
        justifyContent="center"
        minWidth="300px"
        sx={ { mb: 10 } }
      >
        { drinksAPI.length === 1 && isRedirect ? (
          redirectDetailedPage(drinksAPI)
        )
          : (reduceDrinks12(drinksAPI, +'12'))
            .map(({ idDrink, strDrink, strDrinkThumb }, i) => (
              <Grid
                key={ idDrink }
                item
                minWidth="120px"
                // xs={ 9 }
                // md={ 3 }
                style={ { textAlign: 'center' } }
              >
                <Card
                  sx={ { maxWidth: 160, bgcolor: '#fdf8f6' } }
                  data-testid={ `${i}-recipe-card` }
                  onClick={ () => handleClickRedirect(idDrink) }
                  aria-hidden="true"
                  className="card__recipes"
                  role="button"
                >
                  <CardMedia
                    component="img"
                    height="100"
                    image={ strDrinkThumb }
                    alt="thumbnail food"
                    data-testid={ `${i}-card-img` }
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" color="secondary">
                      { taBvalue }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      { strDrink.length > +'24'
                        ? `${strDrink.slice(0, +'24')}...` : strDrink}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
      {/* <Footer /> */}
      <BottomNav />
    </>
  );
}

Drinks.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
