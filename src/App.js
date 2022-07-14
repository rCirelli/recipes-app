import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipeProvider from './context/providers/RecipeProvider';
import Login from './pages/Login';

function App() {
  return (
    <RecipeProvider>
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </RecipeProvider>
  );
}

export default App;
