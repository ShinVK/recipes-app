import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, ButtonGroup } from '@mui/material';
import AllHeader from '../components/AllHeader';
import BottomNav from '../components/mui/BottomNav';

export default function ExploreDrinks({ history: { location } }) {
  const history = useHistory();
  const handlerandom = async () => {
    const fetchRandom = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const jason = await fetchRandom.json();
    const { drinks } = await jason;
    history.push(`/drinks/${drinks[0].idDrink}`);
  };

  return (
    <div>
      <AllHeader
        actPage={ location.pathname }
        title="Explore Drinks"
        btnSearch={ false }
      />
      <Box sx={ { '@ sx': { Width: 350 }, display: 'flex' } }>
        <Box sx={ { margin: 'auto', mt: 10 } }>

          <ButtonGroup variant="text" color="secondary">
            <Button
              data-testid="explore-by-ingredient"
              onClick={ () => history.push('/explore/drinks/ingredients') }
            >
              By Ingredient
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

ExploreDrinks.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
