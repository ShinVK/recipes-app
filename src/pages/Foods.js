import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router';
import AllHeader from '../components/AllHeader';
import MyContext from '../context/Mycontext';

export default function Foods({ history: { location } }) {
  // const history = useHistory();

  const { stateHook: { foodsAPI } } = useContext(MyContext);

  const reduceFoods12 = (arr) => {
    const foods12 = arr.slice(0, +'12');
    // console.log(drinks12);
    return foods12;
  };

  const redirectDetailedPage = (arr) => {
    const { idMeal } = arr[0];
    return <Redirect push to={ `/foods/${idMeal}` } />;
  };

  return (
    <div>
      <AllHeader actPage={ location.pathname } />
      <p>  Tela de Comidas </p>

      { foodsAPI.length === 1 ? (
        redirectDetailedPage(foodsAPI)
      )
        : (reduceFoods12(foodsAPI)).map(({ idMeal, strMeal, strMealThumb }) => (
          <div key={ idMeal } data-testid={ `${idMeal}-recipe-card` }>
            <img
              data-testid={ `${idMeal}-card-img` }
              src={ strMealThumb }
              alt="thumbnail food"
            />
            <h3 data-testid={ `${idMeal}-card-name` }>{strMeal}</h3>
          </div>
        ))}
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
