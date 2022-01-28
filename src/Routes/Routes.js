import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Explorar from '../pages/Explorar';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreDrinksIng from '../pages/ExploreDrinksIng';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreFoodsIng from '../pages/ExploreFoodsIng';
import ExploreFoodsNat from '../pages/ExploreFoodsNat';
import FavoritesRecipes from '../pages/FavoritesRecipes';
import FormLogin from '../pages/Login';
import AllHeader from '../components/AllHeader';
import Profile from '../pages/Profile';
import RecipesDone from '../pages/RecipesDone';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ FormLogin } />
      <Route path="/foods" component={ Foods } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/foods/id-da-receita/in-progress" />
      <Route path="/drinks/id-da-receita/in-progress" />
      <Route path="/explore" />
      <Route path="/explore/foods" />
      <Route path="/explore/drinks" />
      <Route path="/explore/foods/ingredientes" />
      <Route path="/explore/drinks/ingrediente" />
      <Route path="/explore/foods/nationalities" />
      <Route path="/profile" />
      <Route path="/done-recipes" />
    <Route path="/favorite-recipes" /> */}
      <Route exact path="/headertest" component={ AllHeader } />
      {/* <Route path="/foods/id-da-receita/in-progress" /> */}
      {/* <Route path="/drinks/id-da-receita/in-progress" /> */}
      <Route path="/explore" component={ Explorar } />
      <Route path="/explore/foods" component={ ExploreFoods } />
      <Route path="/explore/drinks" component={ ExploreDrinks } />
      <Route path="/explore/foods/ingredientes" component={ ExploreFoodsIng } />
      <Route path="/explore/drinks/ingrediente" component={ ExploreDrinksIng } />
      <Route path="/explore/foods/nationalities" component={ ExploreFoodsNat } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ RecipesDone } />
      <Route path="/favorite-recipes" component={ FavoritesRecipes } />
    </Switch>
  );
}
