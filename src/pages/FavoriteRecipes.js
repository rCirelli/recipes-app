import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';

function FavoriteRecipes() {
  const [actualFilter, setActualFilter] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  function getLocalStorageFavoriteRecipes() {
    const favRecipes = localStorage.getItem('favoriteRecipes');
    if (favRecipes !== null) {
      const favRecipesJson = JSON.parse(favRecipes);
      setFavoriteRecipes(favRecipesJson);
    }
  }

  useEffect(() => {
    getLocalStorageFavoriteRecipes();
  }, []);

  function handleFilterBtns({ target }) {
    setActualFilter(target.value);
  }

  return (
    <div>
      <Header title="Favorite Recipes" />
      <div className="w-full flex justify-between items-center p-4">
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
      <div className="flex flex-col gap-4 px-4">
        {favoriteRecipes
          .filter((recipe) => recipe.type.includes(actualFilter))
          .map((recipe, index) => (recipe.type === 'food' ? (
            <DoneRecipesCard
              key={ index }
              recipe={ recipe }
              index={ index }
              url={ `/${recipe.type}s/${recipe.id}` }
              favoriteBtn
            />
          ) : (
            <DoneRecipesCard
              key={ index }
              recipe={ recipe }
              index={ index }
              url={ `/${recipe.type}s/${recipe.id}` }
              favoriteBtn
            />
          )))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
