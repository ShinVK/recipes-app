/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid, IconButton, Typography, styled, Collapse, List, ListItem, ListItemText, Button }
from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyContext from '../context/Mycontext';
import CarouselBotstrap from '../components/CarouselBotstrap';
import useUpdateDetailRecipe from '../hooks/useUpdateDetailRecipe';
import useIngredients from '../hooks/useIngredients';
import useVerifyStatus from '../hooks/useVerifiyStatus';
import useDone from '../hooks/useVerifyDone';
import AllHeader from '../components/AllHeader';
import ClipBoardCopy from '../components/mui/ClipBoardCopy';
import BottomNav from '../components/mui/BottomNav';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton { ...other } />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function DetailedFood({ location: { pathname } }) {
  const {
    stateHook:
    {
      drinksAPI,
      isFavorite,
      handleClickFavorite,
    } } = useContext(MyContext);

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [video, setVideo] = useState('');
  const [detailItem, id] = useUpdateDetailRecipe(pathname, true);
  const [detailFood, setdetailFood] = useState(detailItem);
  const [ingredients2, video2] = useIngredients(detailItem, true);
  const [status] = useVerifyStatus(id, 'food');
  const [done2] = useDone(id);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setdetailFood(detailItem);
  }, [detailItem]);

  useEffect(() => {
    setIngredients(ingredients2);
    setVideo(video2);
    setIsLoading(true);
  }, [ingredients2, video2]);

  const reduceArr = (arr, num) => {
    const arrRed = arr.slice(0, num);
    return arrRed;
  };

  const divideArray = (arr, num) => {
    const arrFinal = [];
    while (arr.length) {
      arrFinal.push(arr.splice(0, num));
    }
    return arrFinal;
  };

  return (
    <div>
      <AllHeader
        title="Favorite Recipes"
        btnSearch={ false }
        actPage={ pathname }
      />
      { isLoading
        ? (
          <Box sx={ { '@ sx': { maxWidth: 350 }, mt: 3 } }>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={ { '@ sx': { maxWidth: 340 } } }
            >
              <Grid item xs={ 3 } textAlign="left">

                <Card sx={ { maxWidth: 340 } }>
                  <CardMedia
                    component="img"
                    height="150"
                    image={ detailFood.strMealThumb }
                    alt="imagem da refeição"
                    data-testid="recipe-photo"
                  />
                  <CardContent>
                    <Typography
                      variant="h4"
                      component="div"
                      color="secondary"
                      data-testid="recipe-title"
                    >
                      { detailFood.strMeal }
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      color="secondary"
                      data-testid="recipe-category"
                    >
                      {detailFood.strCategory}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      { detailFood.strInstructions }
                    </Typography>
                    {!done2 && (
                      <Button
                        type="button"
                        data-testid="start-recipe-btn"
                        onClick={ () => history.push(`${pathname}/in-progress`) }
                        color={ status ? 'primary' : 'secondary' }
                      >
                        {status ? 'Continue Recipe' : 'Start Recipe'}
                      </Button>
                    )}

                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      onClick={ () => handleClickFavorite(id, detailItem, true) }
                      aria-label="add to favorites"
                    >
                      <FavoriteIcon
                        color={ isFavorite ? 'primary' : 'grey[500]' }
                        data-testid="favorite-btn"
                      />
                    </IconButton>
                    <ClipBoardCopy url={ `foods/${detailFood.idMeal}` } />
                    <ExpandMore
                      expand={ expanded }
                      onClick={ () => setExpanded(!expanded) }
                      aria-expanded={ expanded }
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={ expanded } timeout="auto" unmountOnExit>
                    <CardContent>
                      <List>
                        {ingredients.map((ingredient, i) => (
                          <ListItem key={ i }>
                            <ListItemText
                              data-testid={ `${i}-ingredient-name-and-measure` }
                            >
                              {ingredient}
                            </ListItemText>
                          </ListItem>
                        ))}
                      </List>
                      <iframe
                        data-testid="video"
                        width="300"
                        height="155"
                        src={ video }
                        title="YouTube video player"
                        allow="accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture"
                      />
                    </CardContent>
                  </Collapse>
                </Card>
                {drinksAPI.length > 0
                && <CarouselBotstrap
                  itensCar={ divideArray(reduceArr(drinksAPI, +'6'), 2) }
                  foods={ false }
                />}
              </Grid>

            </Grid>
          </Box>
        ) : <p>carregando...</p> }
      <BottomNav />
    </div>
  );
}

DetailedFood.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};

export default DetailedFood;
