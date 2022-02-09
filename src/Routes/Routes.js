import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Explorar from '../pages/Explorar';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreDrinksIng from '../pages/ExploreDrinksIng';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreFoodsIng from '../pages/ExploreFoodsIng';
import ExploreFoodsNat from '../pages/ExploreFoodsNat';
import FavoritesRecipes from '../pages/FavoritesRecipes';
import Login from '../pages/Login';
import AllHeader from '../components/AllHeader';
import Profile from '../pages/Profile';
import RecipesDone from '../pages/RecipesDone';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import DetailedDrink from '../pages/DetailedDrink';
import DetailedFood from '../pages/DetailedFood';
import FoodsInProgress from '../pages/FoodsInProgress';
import DrinksInProgress from '../pages/DrinksInProgress';
import NotFound from '../pages/NotFound';
import TemporaryDrawer from '../components/mui/TemporaryDrawer';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/temp" component={ TemporaryDrawer } />
      <Route exact path="/foods/:id" component={ DetailedFood } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks/:id" component={ DetailedDrink } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/headertest" component={ AllHeader } />
      <Route exact path="/foods/:id/in-progress" component={ FoodsInProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ DrinksInProgress } />
      <Route exact path="/explore" component={ Explorar } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route exact path="/explore/foods/ingredients" component={ ExploreFoodsIng } />
      <Route exact path="/explore/drinks/ingredients" component={ ExploreDrinksIng } />
      <Route exact path="/explore/foods/nationalities" component={ ExploreFoodsNat } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ RecipesDone } />
      <Route exact path="/favorite-recipes" component={ FavoritesRecipes } />
      <Route exact path="*" component={ NotFound } />
    </Switch>
  );
}
