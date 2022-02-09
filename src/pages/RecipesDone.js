import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Card,
  CardActions, CardContent, CardMedia, Grid, IconButton, Tab, Tabs, Typography }
from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AllHeader from '../components/AllHeader';
import useGetFromLocal from '../hooks/useGetFromLocal';
import BottomNav from '../components/mui/BottomNav';
import ClipBoardCopy from '../components/mui/ClipBoardCopy';

export default function RecipesDone({ history: { location } }) {
  const [allRecipes, meals, drinks] = useGetFromLocal();

  const [taBvalue, setTabValue] = useState('All');
  const [recipes, setRecipes] = useState(allRecipes);
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
  }, [allRecipes]);

  return (
    <>
      <div>
        <AllHeader
          title="Done Recipes"
          actPage={ location.pathname }
          btnSearch={ false }
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

          {recipes && recipes.map((
            { id,
              image,
              category,
              nationality,
              name,
              tags,
              doneDate,
              type,
              alcoholicOrNot,
            }, i,
          ) => {
            if (type === 'food') {
              return (
                <Grid
                  key={ id }
                  item
                  minWidth="120px"
                  style={ { textAlign: 'center' } }
                >
                  <Card
                    sx={ { maxWidth: 160, minHeight: '280px', bgcolor: '#fdf8f6' } }
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
                      <Typography
                        data-testid={ `${i}-horizontal-done-date` }
                        variant="body2"
                        color="text.secondary"
                      >
                        {doneDate}
                      </Typography>
                      {tags.length > 0 && tags.map((el, i2) => (
                        <Typography
                          data-testid={ `${i}-${el}-horizontal-tag` }
                          variant="body2"
                          color="primary"
                          key={ i2 }
                        >
                          {el}
                        </Typography>
                      ))}
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
                  sx={ { maxWidth: 160, minHeight: '280px', bgcolor: '#fdf8f6' } }
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
                      {alcoholicOrNot}
                    </Typography>
                    <Typography
                      data-testid={ `${i}-horizontal-done-date` }
                      variant="body2"
                      color="text.secondary"
                    >
                      {doneDate}
                    </Typography>
                    {tags.length > 0 && tags.map((el, i2) => (
                      <Typography
                        data-testid={ `${i}-${el}-horizontal-tag` }
                        variant="body2"
                        color="primary"
                        key={ i2 }
                      >
                        {el}
                      </Typography>
                    ))}
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

RecipesDone.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
