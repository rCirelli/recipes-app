import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipeProvider from './context/providers/RecipeProvider';
import DoneRecipes from './pages/DoneRecipes';
import DrinkDetails from './pages/DrinkDetails';
import DrinkInProgress from './pages/DrinkInProgress';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodDetails from './pages/FoodDetails';
import FoodInProgress from './pages/FoodInProgress';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <RecipeProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/:foodId" component={ FoodDetails } />
        <Route path="/foods/:foodId/in-progress" component={ FoodInProgress } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:drinkId" component={ DrinkDetails } />
        <Route path="/drinks/:drinkId/in-progress" component={ DrinkInProgress } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </RecipeProvider>
  );
}

export default App;
