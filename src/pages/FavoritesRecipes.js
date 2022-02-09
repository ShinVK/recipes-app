/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Card,
  CardActions, CardContent, CardMedia, Grid, IconButton, Tab, Tabs, Typography }
from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AllHeader from '../components/AllHeader';
import MyContext from '../context/Mycontext';
import useFavoriteFromLocal from '../hooks/useFavoriteFromLocal';
import BottomNav from '../components/mui/BottomNav';
import ClipBoardCopy from '../components/mui/ClipBoardCopy';

export default function FavoritesRecipes({ history: { location } }) {
  const {
    stateHook:
    {
      removeFavorite,
    } } = useContext(MyContext);
  const [up, setUp] = useState(true);
  const [allRecipes, meals, drinks, updt] = useFavoriteFromLocal(up);
  const [recipes, setRecipes] = useState(allRecipes);
  const [taBvalue, setTabValue] = useState('All');
  const isFavorite = true;
  const history = useHistory();

  const handleChangeTab = (event, newValue) => {
    if (newValue === 'meals') {
      setRecipes(meals);
    }
    if (newValue === 'drinks') {
      setRecipes(drinks);
    }
    if (newValue === 'All') {
      setRecipes(allRecipes);
    }

    setTabValue(newValue);
  };

  useEffect(() => {
    setRecipes(allRecipes);
    setUp(updt);
  }, [allRecipes, updt]);

  return (
    <>
      <div>
        <AllHeader
          title="Favorite Recipes"
          btnSearch={ false }
          actPage={ location.pathname }
        />
        <Box sx={ { width: '100%', mb: 5 } }>
          <Tabs
            value={ taBvalue }
            onChange={ handleChangeTab }
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            aria-label="secondary tabs example"
          >
            <Tab value="All" data-testid="filter-by-all-btn" label="All" />
            <Tab value="meals" data-testid="filter-by-food-btn" label="Foods" />
            <Tab value="drinks" data-testid="filter-by-food-btn" label="Cocktails" />

          </Tabs>
        </Box>

        <Grid
          container
          spacing={ 1 }
          justifyContent="center"
          minWidth="300px"
          sx={ { mb: 10 } }
        >
          {recipes.length > 0 && recipes
            .map(({ id,
              image,
              category,
              nationality,
              name,
              type,
              alcoholicOrNot,
            }, i) => {
              if (type === 'food') {
                return (
                  <Grid
                    key={ id }
                    item
                    minWidth="120px"
                    style={ { textAlign: 'center' } }
                  >
                    <Card
                      sx={ { maxWidth: 160, minHeight: '250px', bgcolor: '#fdf8f6' } }
                      data-testid={ `${i}-recipe-card` }
                      aria-hidden="true"
                      className="card__recipes"
                      role="button"
                    >
                      <CardActions disableSpacing>
                        <IconButton
                          onClick={ () => { removeFavorite(id); setUp(true); } }
                          aria-label="add to favorites"
                        >
                          <FavoriteIcon
                            color="primary"
                            data-testid="favorite-btn"
                          />
                        </IconButton>
                        <ClipBoardCopy url={ `foods/${id}` } />
                      </CardActions>
                      <CardMedia
                        onClick={ () => history.push(`/foods/${id}`) }
                        component="img"
                        height="100"
                        image={ image }
                        alt="thumbnail food"
                        data-testid={ `${0}-horizontal-image` }
                      />
                      <CardContent>
                        <Typography
                          onClick={ () => history.push(`/foods/${id}`) }
                          data-testid={ `${i}-horizontal-name` }
                          variant="h5"
                          component="div"
                          color="secondary"
                        >
                          { name.length > +'15' ? `${name.slice(0, +'15')}...` : name }
                        </Typography>
                        <Typography
                          data-testid={ `${0}-horizontal-top-text` }
                          variant="body2"
                          color="text.secondary"
                        >
                          {`${nationality} - ${category}`}
                        </Typography>
                      </CardContent>

                    </Card>
                  </Grid>
                );
              }
              return (
                <Grid
                  key={ id }
                  item
                  minWidth="120px"
                  style={ { textAlign: 'center' } }
                >
                  <Card
                    sx={ { maxWidth: 160, minHeight: '250px', bgcolor: '#fdf8f6' } }
                    data-testid={ `${i}-recipe-card` }
                    aria-hidden="true"
                    className="card__recipes"
                    role="button"
                  >
                    <CardActions disableSpacing>
                      <IconButton
                        onClick={ () => { removeFavorite(id); setUp(true); } }
                        aria-label="add to favorites"
                      >
                        <FavoriteIcon
                          color={ isFavorite ? 'primary' : 'grey[500]' }
                          data-testid="favorite-btn"
                        />
                      </IconButton>
                      <ClipBoardCopy url={ `drinks/${id}` } />
                    </CardActions>
                    <CardMedia
                      onClick={ () => history.push(`/drinks/${id}`) }
                      component="img"
                      height="100"
                      image={ image }
                      alt="thumbnail food"
                      data-testid={ `${0}-horizontal-image` }
                    />
                    <CardContent>
                      <Typography
                        onClick={ () => history.push(`/drinks/${id}`) }
                        variant="h5"
                        component="div"
                        color="secondary"
                      >
                        { name }
                      </Typography>
                      <Typography
                        data-testid={ `${0}-horizontal-top-text` }
                        variant="body2"
                        color="text.secondary"
                      >
                        {alcoholicOrNot}
                      </Typography>
                    </CardContent>

                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </div>
      <BottomNav />
    </>
  );
}

FavoritesRecipes.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
