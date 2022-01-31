import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect } from 'react-router';
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
      <AllHeader title="Foods" actPage={ location.pathname } />
      <div className="container__meals">

        { foodsAPI.length === 1 ? (
          redirectDetailedPage(foodsAPI)
        )
          : (reduceFoods12(foodsAPI)).map(({ idMeal, strMeal, strMealThumb }, i) => (
            <div
              key={ idMeal }
              data-testid={ `${i}-recipe-card` }
            >
              <img
                style={ { width: '50px' } }
                data-testid={ `${i}-card-img` }
                src={ strMealThumb }
                alt="thumbnail food"
              />
              <h3
                data-testid={ `${i}-card-name` }
                style={ { font: '10px' } }
              >
                {strMeal}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
