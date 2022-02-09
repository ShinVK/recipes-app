import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, ButtonGroup } from '@mui/material';
import AllHeader from '../components/AllHeader';
import BottomNav from '../components/mui/BottomNav';

export default function ExploreFoods({ history: { location } }) {
  const history = useHistory();
  const handlerandom = async () => {
    const fetchRandom = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const jason = await fetchRandom.json();
    const { meals } = await jason;
    history.push(`/foods/${meals[0].idMeal}`);
  };

  return (
    <div>
      <AllHeader
        actPage={ location.pathname }
        title="Explore Foods"
        btnSearch={ false }
      />

      <Box sx={ { '@ sx': { Width: 350 }, display: 'flex' } }>
        <Box sx={ { margin: 'auto', mt: 10 } }>

          <ButtonGroup variant="text" color="secondary">
            <Button
              data-testid="explore-by-ingredient"
              onClick={ () => history.push('/explore/foods/ingredients') }

            >
              By Ingredient
            </Button>
            <Button
              data-testid="explore-by-nationality"
              onClick={ () => history.push('/explore/foods/nationalities') }
            >
              By Nationality
            </Button>
            <Button
              data-testid="explore-surprise"
              onClick={ () => handlerandom() }
            >
              Surprise me!
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <BottomNav />
    </div>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
