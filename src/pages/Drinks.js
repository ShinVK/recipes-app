import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import AllHeader from '../components/AllHeader';
import MyContext from '../context/Mycontext';

export default function Drinks({ history: { location } }) {
  const { stateHook: { drinksAPI } } = useContext(MyContext);
  const history = useHistory();

  const reduceDrinks12 = (arr) => {
    const drinks12 = arr.slice(0, +'12');
    // console.log(drinks12);
    return drinks12;
  };

  return (
    <div>
      <AllHeader actPage={ location.pathname } />
      <p>Tela Principal de Drinks</p>
      { drinksAPI.length === 1 ? (
        drinksAPI.map(({ idDrink }) => history.push(`/drinks/${idDrink}`))
      )
        : (reduceDrinks12(drinksAPI)).map(({ idDrink, strDrink, strDrinkThumb }) => (
          <div key={ idDrink } data-testid={ `${idDrink}-recipe-card` }>
            <img
              data-testid={ `${idDrink}-card-img` }
              src={ strDrinkThumb }
              alt="thumbnail drink"
            />
            <h3 data-testid={ `${idDrink}-card-name` }>{strDrink}</h3>
          </div>
        ))}

      {/* // drinksAPI.map(({ strDrink, idDrink }) => <h3 key={ idDrink }>{strDrink}</h3>)} */}

    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
