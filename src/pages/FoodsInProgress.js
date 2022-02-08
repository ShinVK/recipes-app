/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid, IconButton, Typography }
from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MyContext from '../context/Mycontext';
import useUpdateDetailRecipe from '../hooks/useUpdateDetailRecipe';
import useCatchIngredients from '../hooks/useCatchIngredients';
import { saveRecipesDone, saveRecipesInProgess } from '../services/localStorage';
import { foodsDone } from '../services/favRecipes';
import useVerifyStatus from '../hooks/useVerifiyStatus';
import ClipBoardCopy from '../components/mui/ClipBoardCopy';
import AllHeader from '../components/AllHeader';
import BottomNav from '../components/mui/BottomNav';

function FoodsInProgress({ location: { pathname } }) {
  const {
    stateHook:
    {
      isFavorite,
      handleClickFavorite,
    } } = useContext(MyContext);
  const [detailItem, id] = useUpdateDetailRecipe(pathname, true);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState();
  const [status] = useVerifyStatus(id, 'food');
  const [ingredients2, steps2] = useCatchIngredients(detailItem, status, id);
  const [disable, setDisable] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const verifyChecks = (a) => {
      if (a) {
        const isDisable = a.some((e) => e === false);
        setDisable(isDisable);
      } else { setDisable(true); }
    };
    verifyChecks(steps);
  }, [steps]);

  useEffect(() => {
    setIngredients(ingredients2);
    setSteps(steps2);
    setIsLoading(true);
  }, [ingredients2, steps2]);

  const onHandleChange = (i2) => {
    const updatedCheckedStep = steps.map((step, i) => (i === i2 ? !step : step));
    const objLocal = { [id]: updatedCheckedStep };
    saveRecipesInProgess(objLocal);
    setSteps(updatedCheckedStep);
  };

  const handleClickDone = (obj) => {
    const itemDone = foodsDone(obj);
    saveRecipesDone(itemDone);
    history.push('/done-recipes');
  };

  return (
    <>
      <AllHeader
        title="Favorite Recipes"
        btnSearch={ false }
        actPage={ pathname }
      />
      <Box sx={ { '@ sx': { minWidth: 350 }, mt: 3, mb: 10 } }>
        { isLoading
          ? (
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
                    minwidth="150"
                    image={ detailItem.strMealThumb }
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
                      { detailItem.strMeal }
                    </Typography>
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
                    <ClipBoardCopy url={ `foods/${detailItem.idMeal}` } />
                    <Button
                      type="button"
                      data-testid="finish-recipe-btn"
                      disabled={ disable }
                      onClick={ () => handleClickDone(detailItem) }
                      variant="contained"
                    >
                      Done!
                    </Button>
                  </CardActions>
                  <CardContent>
                    <Typography
                      variant="body2"
                      component="div"
                      color="secondary"
                      data-testid="instructions"
                    >
                      { detailItem.strInstructions }
                    </Typography>
                    {ingredients.map((ingredient, i) => (
                      <div
                        className="form-check"
                        key={ i }
                        data-testid={ `${i}-ingredient-step` }
                      >
                        <label
                          key={ i }
                          className={ (steps[i])
                            ? 'checked_text form-check-label' : 'form-check-label' }
                          htmlFor={ `${i}-input` }
                        >

                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={ `${i}-input` }
                            name={ `step${i}` }
                            checked={ steps[i] }
                            onChange={ () => onHandleChange(i) }
                          />
                          {ingredient}
                        </label>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : <p>carregando...</p> }
      </Box>
      <BottomNav />
    </>
  );
}

FoodsInProgress.propTypes = {
  location: PropTypes.objectOf(Object).isRequired,
};

export default FoodsInProgress;
