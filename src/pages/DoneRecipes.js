import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [linkIsCopied, setLinkIsCopied] = useState(false);
  const [actualFilter, setActualFilter] = useState('');
  const [hasToBeRedirect, setHasToBeRedirect] = useState(false);
  const [whereRedirect, setWhereRedirect] = useState('/');
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

  function handleShareBtn(id, type) {
    const urlToBeClip = `http://localhost:3000/${type}s/${id}`;
    navigator.clipboard.writeText(urlToBeClip);
    setLinkIsCopied(true);
  }

  function handleRedirectToDetails(id, type) {
    setWhereRedirect(`/${type}s/${id}`);
    setHasToBeRedirect(true);
  }

  return (
    hasToBeRedirect
      ? (
        <Redirect to={ whereRedirect } />
      )
      : (
        <div>
          <Header title="Done Recipes" />
          <div>
            <button
              onClick={ handleFilterBtns }
              data-testid="filter-by-all-btn"
              type="button"
              value=""
            >
              All
            </button>
            <button
              onClick={ handleFilterBtns }
              data-testid="filter-by-food-btn"
              type="button"
              value="food"
            >
              Food

            </button>
            <button
              value="drink"
              onClick={ handleFilterBtns }
              data-testid="filter-by-drink-btn"
              type="button"
            >
              Drinks

            </button>
            {
              doneRecipes.filter((recipe) => recipe.type.includes(actualFilter))
                .map((recipe, index) => (
                  recipe.type === 'food'
                    ? (
                      <div key={ index }>
                        <button
                          type="button"
                          onClick={
                            () => handleRedirectToDetails(recipe.id, recipe.type)
                          }
                        >
                          <img
                            src={ `${recipe.image}` }
                            alt={ recipe.name }
                            data-testid={ `${index}-horizontal-image` }
                          />
                        </button>
                        <p data-testid={ `${index}-horizontal-top-text` }>
                          {`${recipe.nationality} - ${recipe.category}`}
                        </p>
                        <button
                          type="button"
                          onClick={
                            () => handleRedirectToDetails(recipe.id, recipe.type)
                          }
                        >
                          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                        </button>
                        <p
                          data-testid={ `${index}-horizontal-done-date` }
                        >
                          {recipe.doneDate}

                        </p>
                        {
                          recipe.tags.map((tagName) => (
                            <div
                              key={ tagName }
                              data-testid={ `${index}-${tagName}-horizontal-tag` }
                            >
                              {tagName}
                            </div>
                          ))
                        }
                        <button
                          onClick={ () => handleShareBtn(recipe.id, recipe.type) }
                          type="button"
                        >
                          <img
                            data-testid={ `${index}-horizontal-share-btn` }
                            src={ shareIcon }
                            alt="Botão de compartilhar"
                          />
                        </button>
                        {
                          linkIsCopied && <p>Link copied!</p>
                        }
                      </div>
                    )
                    : (
                      <div key={ index }>
                        <button
                          type="button"
                          onClick={
                            () => handleRedirectToDetails(recipe.id, recipe.type)
                          }
                        >
                          <img
                            src={ `${recipe.image}` }
                            alt={ recipe.name }
                            data-testid={ `${index}-horizontal-image` }
                          />
                        </button>
                        <p data-testid={ `${index}-horizontal-top-text` }>
                          {recipe.alcoholicOrNot}
                        </p>
                        <button
                          type="button"
                          onClick={
                            () => handleRedirectToDetails(recipe.id, recipe.type)
                          }
                        >
                          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                        </button>
                        <p
                          data-testid={ `${index}-horizontal-done-date` }
                        >
                          {recipe.doneDate}
                        </p>
                        <button
                          onClick={ () => handleShareBtn(recipe.id, recipe.type) }
                          type="button"
                        >
                          <img
                            data-testid={ `${index}-horizontal-share-btn` }
                            src={ shareIcon }
                            alt="Botão de compartilhar"
                          />
                        </button>
                        {
                          linkIsCopied && <p>Link copied!</p>
                        }
                      </div>
                    )
                ))
            }
          </div>
        </div>
      )
  );
}

export default DoneRecipes;
