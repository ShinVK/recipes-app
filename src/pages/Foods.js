/* eslint-disable react/jsx-max-depth */
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import AllHeader from '../components/AllHeader';
import BottomNav from '../components/mui/BottomNav';
import MyContext from '../context/Mycontext';

export default function Foods({ history: { location } }) {
  const [taBvalue, setTabValue] = useState('All');

  const { stateHook:
    {
      foodsAPI,
      categoriesFood,
      handleClick,
      isRedirect,
      handleClickRedirect,
    } } = useContext(MyContext);

  const handleChangeTab = (event, newValue) => {
    handleClick(newValue, 'food');
    setTabValue(newValue);
  };

  const reduceFoods12 = (arr, num, num2) => {
    const foods12 = arr.slice(num2, num);
    return foods12;
  };

  const redirectDetailedPage = (arr) => {
    const { idMeal } = arr[0];
    return <Redirect push to={ `/foods/${idMeal}` } />;
  };

  return (
    <>
      <AllHeader title="Foods" actPage={ location.pathname } />
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
            {reduceFoods12(categoriesFood, +'5', 0).map(({ strCategory }, i) => (
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
        { foodsAPI.length === 1 && isRedirect ? (
          redirectDetailedPage(foodsAPI)
        )
          : (reduceFoods12(foodsAPI, +'12'))
            .map(({ idMeal, strMeal, strMealThumb }, i) => (

              <Grid
                key={ idMeal }
                item
                minWidth="120px"
                style={ { textAlign: 'center' } }
              >
                <Card
                  sx={ { maxWidth: 160, bgcolor: '#fdf8f6' } }
                  data-testid={ `${i}-recipe-card` }
                  onClick={ () => handleClickRedirect(idMeal) }
                  aria-hidden="true"
                  className="card__recipes"
                  role="button"
                >
                  <CardMedia
                    component="img"
                    height="100"
                    image={ strMealThumb }
                    alt="thumbnail food"
                    data-testid={ `${i}-card-img` }
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" color="secondary">
                      { taBvalue }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      { strMeal.length > +'24'
                        ? `${strMeal.slice(0, +'24')}...` : strMeal}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
      <BottomNav />
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};

// ? `${strInstructions.slice(0, +'50')} ...` : strMeal
