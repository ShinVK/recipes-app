import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DoneIcon from '@mui/icons-material/Done';
import { useHistory } from 'react-router-dom';
import { Paper } from '@mui/material';

export default function BottomNav() {
  const history = useHistory();

  return (
    <Paper
      sx={
        { position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10000 }
      }
      elevation={ 3 }
    >
      <Box sx={ { '@ sx': { maxWidth: 330 } } }>
        <BottomNavigation
          showLabels
        >
          <BottomNavigationAction
            label="Back"
            icon={ <ArrowBackIosNewIcon /> }
            onClick={ () => history.goBack() }
          />
          <BottomNavigationAction
            label="Favorites"
            icon={ <FavoriteIcon /> }
            onClick={ () => history.push('/favorite-recipes') }
          />
          <BottomNavigationAction
            label="Done"
            icon={ <DoneIcon
              onClick={ () => history.push('/done-recipes') }
            /> }
          />
        </BottomNavigation>
      </Box>
    </Paper>
  );
}
