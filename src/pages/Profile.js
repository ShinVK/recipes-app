import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AllHeader from '../components/AllHeader';
import Footer from '../components/Footer';

export default function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (localStorage.getItem('user')) { setEmail(JSON.parse(localStorage.user).email); }
  }, []);

  return (
    <div>
      <AllHeader actPage="" title="Profile" btnSearch={ false } />
      <p>Tela de perfil</p>
      <h4
        data-testid="profile-email"
      >
        {email}
      </h4>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
