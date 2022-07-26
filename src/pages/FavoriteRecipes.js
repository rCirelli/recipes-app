import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';
import unfavoriteIcon from '../images/blackHeartIcon.svg';
import DoneRecipesCard from '../components/DoneRecipesCard';

function FavoriteRecipes() {
  const [actualFilter, setActualFilter] = useState('');
  const [linkIsCopied, setLinkIsCopied] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [hasToBeRedirect, setHasToBeRedirect] = useState(false);
  const [whereRedirect, setWhereRedirect] = useState('/');

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

  function handleRedirectToDetails(id, type) {
    setWhereRedirect(`/${type}s/${id}`);
    setHasToBeRedirect(true);
  }

  function handleShareBtn(id, type) {
    const urlToBeClip = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(urlToBeClip);
    setLinkIsCopied(true);
  }

  function unFavRecipe(id) {
    const newRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
    setFavoriteRecipes(newRecipes);
  }

  function handleFilterBtns({ target }) {
    setActualFilter(target.value);
  }

  return hasToBeRedirect ? (
    <Redirect to={ whereRedirect } />
  ) : (
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

          //   <div key={ index }>
          //     <button
          //       type="button"
          //       onClick={ () => handleRedirectToDetails(recipe.id, recipe.type) }
          //     >
          //       <img
          //         src={ `${recipe.image}` }
          //         alt={ recipe.name }
          //         data-testid={ `${index}-horizontal-image` }
          //       />
          //     </button>
          //     <p data-testid={ `${index}-horizontal-top-text` }>
          //       {`${recipe.nationality} - ${recipe.category}`}
          //     </p>
          //     <button
          //       type="button"
          //       onClick={ () => handleRedirectToDetails(recipe.id, recipe.type) }
          //     >
          //       <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          //     </button>
          //     <br />
          //     <button
          //       onClick={ () => handleShareBtn(recipe.id, recipe.type) }
          //       type="button"
          //     >
          //       <img
          //         data-testid={ `${index}-horizontal-share-btn` }
          //         src={ shareIcon }
          //         alt="Botão de compartilhar"
          //       />
          //     </button>
          //     {linkIsCopied && <p>Link copied!</p>}
          //     <button type="button" onClick={ () => unFavRecipe(recipe.id) }>
          //       <img
          //         src={ unfavoriteIcon }
          //         data-testid={ `${index}-horizontal-favorite-btn` }
          //         alt="Ícone para desfavoritar uma receita"
          //       />
          //     </button>
          //   </div>
          // ) : (
          //   <div key={ index }>
          //     <button
          //       type="button"
          //       onClick={ () => handleRedirectToDetails(recipe.id, recipe.type) }
          //     >
          //       <img
          //         src={ `${recipe.image}` }
          //         alt={ recipe.name }
          //         data-testid={ `${index}-horizontal-image` }
          //       />
          //     </button>
          //     <p data-testid={ `${index}-horizontal-top-text` }>
          //       {recipe.alcoholicOrNot}
          //     </p>
          //     <button
          //       type="button"
          //       onClick={ () => handleRedirectToDetails(recipe.id, recipe.type) }
          //     >
          //       <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          //     </button>
          //     <br />
          //     <button
          //       onClick={ () => handleShareBtn(recipe.id, recipe.type) }
          //       type="button"
          //     >
          //       <img
          //         data-testid={ `${index}-horizontal-share-btn` }
          //         src={ shareIcon }
          //         alt="Botão de compartilhar"
          //       />
          //     </button>
          //     {linkIsCopied && <p>Link copied!</p>}
          //     <button type="button" onClick={ () => unFavRecipe(recipe.id) }>
          //       <img
          //         data-testid={ `${index}-horizontal-favorite-btn` }
          //         src={ unfavoriteIcon }
          //         alt="Ícone para desfavoritar uma receita"
          //       />
          //     </button>
          //   </div>
          )))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
