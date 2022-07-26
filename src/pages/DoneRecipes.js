import React, { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../components/Header';

function DoneRecipes() {
  const [actualFilter, setActualFilter] = useState('');
  // const [hasToBeRedirect, setHasToBeRedirect] = useState(false);
  // const [whereRedirect, setWhereRedirect] = useState('/');
  const [doneRecipes, setDoneRecipes] = useState([]);

  function getLocalStorageDoneRecipes() {
    const doneRecipesStorage = localStorage.getItem('doneRecipes');
    if (doneRecipesStorage !== null) {
      const doneRecipesJson = JSON.parse(doneRecipesStorage);
      setDoneRecipes(doneRecipesJson);
    }
  }

  useEffect(() => {
    getLocalStorageDoneRecipes();
  }, []);

  function handleFilterBtns({ target }) {
    setActualFilter(target.value);
  }

  // const handleRedirectToDetails = (id, type) => {
  //   setWhereRedirect(`/${type}s/${id}`);
  //   setHasToBeRedirect(true);
  // };

  return (
    <div className="w-screen">
      <Header title="Done Recipes" />
      <div className="px-4">
        <div className="w-full flex justify-between items-center py-4">
          <button
            className="border px-5 py-1 rounded-lg bg-emerald-500 text-white
                          font-medium tracking-wide whitespace-nowrap"
            onClick={ handleFilterBtns }
            data-testid="filter-by-all-btn"
            type="button"
            value=""
          >
            All
          </button>
          <button
            className="border px-5 py-1 rounded-lg bg-emerald-500 text-white
                          font-medium tracking-wide whitespace-nowrap"
            onClick={ handleFilterBtns }
            data-testid="filter-by-food-btn"
            type="button"
            value="food"
          >
            Food
          </button>
          <button
            className="border px-5 py-1 rounded-lg bg-emerald-500 text-white
                          font-medium tracking-wide whitespace-nowrap"
            value="drink"
            onClick={ handleFilterBtns }
            data-testid="filter-by-drink-btn"
            type="button"
          >
            Drinks
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {doneRecipes
            .filter((recipe) => recipe.type.includes(actualFilter))
            .map((recipe, index) => (recipe.type === 'food' ? (
              <DoneRecipesCard
                key={ index }
                recipe={ recipe }
                index={ index }
                url={ `/${recipe.type}s/${recipe.id}` }
              />
            ) : (
              <DoneRecipesCard
                key={ index }
                recipe={ recipe }
                index={ index }
                url={ `/${recipe.type}s/${recipe.id}` }
              />
            )))}
        </div>
      </div>
    </div>
  );
}

export default DoneRecipes;
