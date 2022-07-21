import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipeProvider from './context/providers/RecipeProvider';
import DoneRecipes from './pages/DoneRecipes';
// import DrinkDetails from './pages/DrinkDetails';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <RecipeProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route
          exact
          path="/foods/:id"
          render={ (props) => <RecipeDetails { ...props } recipeType="food" /> }
        />
        <Route
          exact
          path="/foods/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } recipeType="food" /> }
        />
        <Route exact path="/drinks" component={ Drinks } />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <RecipeDetails { ...props } recipeType="drink" /> }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } recipeType="drink" /> }
        />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </RecipeProvider>
  );
}

export default App;
