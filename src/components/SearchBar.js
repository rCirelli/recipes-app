import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

function SearchBar() {
  const { setSearchResponse, searchInput, setSearchInput } = useContext(RecipeContext);
  // const [searchInput, setSearchInput] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [redirectTarget, setRedirectTarget] = useState('/');
  const [foodType, setFoodType] = useState('foods');
  // const [selectedRadio, setSelectedRadio] = useState('');
  const [searchEndPoint, setSearchEndPoint] = useState('');

  useEffect(() => {
    const currentUrl = `${window.location.href}`;
    if (currentUrl.includes('drinks')) {
      setFoodType('drinks');
    }
  }, []);

  const queryType = {
    foods: {
      byIngredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
      byName: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      byFirstLetter: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
    },
    drinks: {
      byIngredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
      byName: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      byFirstLetter: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
    },
  };

  // function handleSearchEndPoint({ target }) {
  // setSearchEndPoint(target.value);
  // setSelectedRadio(target.id);
  // }

  function handleRedirect(responseJson) {
    if (foodType === 'foods') {
      setRedirectTarget(`/foods/${responseJson.meals[0].idMeal}`);
      setShouldRedirect(true);
      return null;
    }
    setRedirectTarget(`/drinks/${responseJson.drinks[0].idDrink}`);
    setShouldRedirect(true);
  }

  async function callApi() {
    if (
      searchEndPoint === queryType[foodType].byFirstLetter
      // selectedRadio === 'first-letter-search-radio'
      && searchInput.length !== 1
    ) {
      global.alert('Your search must have only 1 (one) character');
      return null;
    }
    const response = await fetch(`${searchEndPoint}${searchInput}`);
    const responseJson = await response.json();

    if (Object.values(responseJson)[0] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return null;
    }
    const oneResponse = responseJson[Object.keys(responseJson)[0]].length === 1;
    if (oneResponse) {
      handleRedirect(responseJson);
      return null;
    }

    const resultsArray = Object.values(responseJson)[0];
    setSearchResponse(resultsArray);
  }

  function handleInput({ target }) {
    setSearchInput(target.value);
  }

  return shouldRedirect ? (
    <Redirect to={ redirectTarget } />
  ) : (
    <form className="flex flex-col items-center">
      <input
        className="bg-slate-300"
        onChange={ handleInput }
        data-testid="search-input"
        type="text"
      />
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          onClick={ () => setSearchEndPoint(queryType[foodType].byIngredient) }
          name="search-radio-btns"
          // value={ queryType[foodType.byIngredient] }
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          onClick={ () => setSearchEndPoint(queryType[foodType].byName) }
          // value={ queryType[foodType.byName] }
          name="search-radio-btns"
          data-testid="name-search-radio"
          type="radio"
          id="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          onClick={ () => setSearchEndPoint(queryType[foodType].byFirstLetter) }
          // value={ queryType[foodType.byFirstLetter] }
          name="search-radio-btns"
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter-search-radio"
        />
      </label>
      <button data-testid="exec-search-btn" type="button" onClick={ callApi }>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
