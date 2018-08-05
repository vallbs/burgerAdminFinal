import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import Menu from './containers/Menu/Menu';
import Burgers from './containers/Burgers/Burgers';
import BurgerDetails from './containers/Burger/BurgerDetails';
import CreateBurger from './containers/Burger/CreateBurger';
import EditBurger from './containers/Burger/EditBurger';
import Ingredients from './containers/Ingredients/Ingredients';
import IngredientDetails from './containers/Ingredient/IngredientDetails';
import CreateIngredient from './containers/Ingredient/CreateIngredient';

class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Switch>
          <Route path="/burgers/create" exact component={CreateBurger}/>
          <Route path="/burgers/:id/edit" exact component={EditBurger}/>
          <Route path="/burgers/:id" exact component={BurgerDetails}/>
          <Route path="/burgers" component={Burgers}/>
          <Route path="/ingredients/new" component={CreateIngredient}/>
          <Route path="/ingredients/:id" component={IngredientDetails}/>
          <Route path="/ingredients" component={Ingredients}/>
          <Route path="/" component={Burgers}/>
        </Switch>
        {/* <Burgers />
        <Ingredients /> */}
      </div>
    );
  }
}

export default withRouter(App);
