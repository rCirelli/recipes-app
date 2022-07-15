import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipeProvider from './context/providers/RecipeProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <RecipeProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Recipes } />
      </Switch>
    </RecipeProvider>
  );
}

export default App;
