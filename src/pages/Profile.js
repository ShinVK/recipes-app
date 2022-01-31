import React from 'react';
import AllHeader from '../components/AllHeader';

export default function Profile() {
  return (
    <div>
      <AllHeader title="Profile" btnSearch={ false } />
      <p>Tela de perfil</p>
    </div>
  );
}
