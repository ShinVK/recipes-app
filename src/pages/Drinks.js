import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect } from 'react-router';
// import { useHistory } from 'react-router';
import AllHeader from '../components/AllHeader';
import Footer from '../components/Footer';
import MyContext from '../context/Mycontext';

export default function Drinks({ history: { location } }) {
  const { stateHook:
    {
      drinksAPI,
      categoriesDrinks,
      handleClick,
      isRedirect,
      handleClickRedirect,
    } } = useContext(MyContext);
  // const history = useHistory();

  const reduceDrinks12 = (arr, num) => {
    const drinks12 = arr.slice(0, num);
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
      <form>

        {reduceDrinks12(categoriesDrinks, +'5').map(({ strCategory }, i) => (
          <button
            key={ i }
            data-testid={ `${strCategory}-category-filter` }
            value={ strCategory }
            onClick={ (event) => handleClick(event, 'drinks') }
            type="button"
          >
            {strCategory}
          </button>
        ))}
        <button
          type="button"
          value="all"
          data-testid="All-category-filter"
          onClick={ (event) => handleClick(event, 'drinks') }
        >
          All
        </button>

      </form>
      <div className="container__meals">
        { drinksAPI.length === 1 && isRedirect ? (
          redirectDetailedPage(drinksAPI)
        )
          : (reduceDrinks12(drinksAPI, +'12'))
            .map(({ idDrink, strDrink, strDrinkThumb }, i) => (
              <div
                key={ idDrink }
                data-testid={ `${i}-recipe-card` }
                onClick={ () => handleClickRedirect(idDrink) }
                aria-hidden="true"
                role="button"
              >
                <img
                  style={ { width: '50px' } }
                  data-testid={ `${i}-card-img` }
                  src={ strDrinkThumb }
                  alt="thumbnail drink"
                />
                <h3 data-testid={ `${i}-card-name` }>{strDrink}</h3>
              </div>
            ))}
      </div>
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.objectOf(String).isRequired,
};
