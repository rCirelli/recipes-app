import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

function SearchBar() {
  const { searchInput, setSearchResponse } = useContext(RecipeContext);
  const [hasToRedirect, setHasToRedirect] = useState(false);
  const [whereToRedirect, setWhereToRedirect] = useState('/');
  const [isFood, setIsFood] = useState(true);
  const [actualRadio, setActualRadio] = useState('');
  const [actualSearchEndPoint, setActualSearchEndPoint] = useState('');

  useEffect(() => {
    const actualUrl = `${window.location.href}`;
    setIsFood(actualUrl.includes('foods'));
  }, []);

  function handleSearchEndPoint({ target }) {
    setActualSearchEndPoint(target.value);
    setActualRadio(target.id);
  }

  function handleRedirect(responseJson) {
    if (isFood) {
      setWhereToRedirect(`/foods/${responseJson.meals[0].idMeal}`);
      setHasToRedirect(true);
      return null;
    }
    setWhereToRedirect(`/drinks/${responseJson.drinks[0].idDrink}`);
    setHasToRedirect(true);
  }

  async function callApi() {
    if (actualRadio === 'first-letter-search-radio' && searchInput.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      return null;
    }
    const response = await fetch(`${actualSearchEndPoint}${searchInput}`);
    const responseJson = await response.json();
    const oneResponse = responseJson[Object.keys(responseJson)[0]].length === 1;
    if (oneResponse) {
      handleRedirect(responseJson);
      return null;
    }
    setSearchResponse(responseJson);
  }

  return (
    hasToRedirect
      ? <Redirect to={ whereToRedirect } />
      : (
        <form>
          <label htmlFor="ingredient-search-radio">
            Ingredient
            <input
              onClick={ handleSearchEndPoint }
              name="search-radio-btns"
              value={
                isFood
                  ? 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
                  : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='
              }
              data-testid="ingredient-search-radio"
              type="radio"
              id="ingredient-search-radio"
            />
          </label>
          <label htmlFor="name-search-radio">
            Name
            <input
              onClick={ handleSearchEndPoint }
              value={
                isFood
                  ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
                  : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
              }
              name="search-radio-btns"
              data-testid="name-search-radio"
              type="radio"
              id="name-search-radio"
            />
          </label>
          <label htmlFor="first-letter-search-radio">
            First Letter
            <input
              onClick={ handleSearchEndPoint }
              value={
                isFood
                  ? 'https://www.themealdb.com/api/json/v1/1/search.php?f='
                  : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f='
              }
              name="search-radio-btns"
              data-testid="first-letter-search-radio"
              type="radio"
              id="first-letter-search-radio"
            />
          </label>
          <button
            data-testid="exec-search-btn"
            type="button"
            onClick={ callApi }
          >
            Search
          </button>
        </form>
      )
  );
}

export default SearchBar;
