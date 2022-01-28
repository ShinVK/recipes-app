import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FormLogin from '../pages/Login';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ FormLogin } />
      {/* <Route path="/foods" component={ Foods } />
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
    </Switch>
  );
}
