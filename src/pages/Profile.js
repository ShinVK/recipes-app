import React from 'react';
import AllHeader from '../components/AllHeader';
import Footer from '../components/Footer';

export default function Profile() {
  return (
    <div>
      <AllHeader title="Profile" btnSearch={ false } />
      <p>Tela de perfil</p>
      <Footer />
    </div>
  );
}
