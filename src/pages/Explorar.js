import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { Box, Button, ButtonGroup } from '@mui/material';
import AllHeader from '../components/AllHeader';
import BottomNav from '../components/mui/BottomNav';

export default function Explorar({ history: { location } }) {
  const history = useHistory();

  return (
    <div>
      <AllHeader
        actPage={ location.pathname }
        title="Explore"
        btnSearch={ false }
      />
      <Box sx={ { '@ sx': { Width: 350 }, display: 'flex' } }>
        <Box sx={ { margin: 'auto', mt: 10 } }>

          <ButtonGroup variant="outlined" color="secondary">
            <Button
              data-testid="explore-foods"
              onClick={ () => history.push('/explore/foods') }
            >
              Explore Foods
            </Button>
            <Button
              data-testid="explore-drinks"
              onClick={ () => history.push('/explore/drinks') }
            >
              Explore Drinks
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <BottomNav />
    </div>
  );
}

Explorar.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
