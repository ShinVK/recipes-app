import { Button, ButtonGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AllHeader from '../components/AllHeader';

export default function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (localStorage.getItem('user')) { setEmail(JSON.parse(localStorage.user).email); }
  }, []);

  return (
    <div>
      <AllHeader actPage="" title="Profile" btnSearch={ false } />
      <Typography
        variant="h5"
        sx={ { mt: 7, mb: 5, textAlign: 'center' } }
        data-testid="profile-email"
      >
        {email}
      </Typography>
      <ButtonGroup variant="contained" color="secondary">

        <Button
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </Button>
        <Button
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </Button>
      </ButtonGroup>
    </div>
  );
}
