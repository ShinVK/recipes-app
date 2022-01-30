import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect } from 'react-router';
// import { useHistory } from 'react-router';
import AllHeader from '../components/AllHeader';
import MyContext from '../context/Mycontext';

export default function Drinks({ history: { location } }) {
  const { stateHook: { drinksAPI } } = useContext(MyContext);

  const reduceDrinks12 = (arr) => {
    const drinks12 = arr.slice(0, +'12');
    // console.log(drinks12);
    return drinks12;
  };

  const redirectDetailedPage = (arr) => {
    const { idDrink } = arr[0];
    return <Redirect push to={ `/drinks/${idDrink}` } />;
  };

  return (
    <div>
      <AllHeader title="Drinks" actPage={ location.pathname } />
      {/* <p>Tela Principal de Drinks</p> */}
      { drinksAPI.length === 1 ? (
        redirectDetailedPage(drinksAPI)
      )
        : (reduceDrinks12(drinksAPI)).map(({ idDrink, strDrink, strDrinkThumb }, i) => (
          <div key={ idDrink } data-testid={ `${i}-recipe-card` }>
            <img
              data-testid={ `${i}-card-img` }
              src={ strDrinkThumb }
              alt="thumbnail drink"
            />
            <h3 data-testid={ `${i}-card-name` }>{strDrink}</h3>
          </div>
        ))}
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
