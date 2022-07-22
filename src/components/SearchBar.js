import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';

function SearchBar({ toggleVisible }) {
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
      byFirstLetter:
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
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
    toggleVisible();
  }

  function handleInput({ target }) {
    setSearchInput(target.value);
  }

  return shouldRedirect ? (
    <Redirect to={ redirectTarget } />
  ) : (
    <form className="flex flex-col items-center gap-2 px-7 py-2">
      <input
        className="bg-slate-300 rounded px-3 py-1 w-full"
        onChange={ handleInput }
        data-testid="search-input"
        type="text"
      />
      <div className="flex flex-col gap-2">
        <label
          htmlFor="ingredient-search-radio"
          className="flex items-center gap-3"
        >
          <input
            onClick={ () => setSearchEndPoint(queryType[foodType].byIngredient) }
            name="search-radio-btns"
            // value={ queryType[foodType.byIngredient] }
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient-search-radio"
            className="form-radio h-4 w-4"
          />
          Ingredient
        </label>
        <label htmlFor="name-search-radio" className="flex items-center gap-3">
          <input
            onClick={ () => setSearchEndPoint(queryType[foodType].byName) }
            // value={ queryType[foodType.byName] }
            name="search-radio-btns"
            data-testid="name-search-radio"
            type="radio"
            id="name-search-radio"
            className="form-radio h-4 w-4"
          />
          Name
        </label>
        <label
          htmlFor="first-letter-search-radio"
          className="flex items-center gap-3"
        >
          <input
            onClick={ () => setSearchEndPoint(queryType[foodType].byFirstLetter) }
            // value={ queryType[foodType.byFirstLetter] }
            name="search-radio-btns"
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter-search-radio"
            className="form-radio h-4 w-4"
          />
          First Letter
        </label>
      </div>
      <button
        className="rounded-lg py-2 w-full text-slate-200 font-medium tracking-wider
        text-lg bg-emerald-500 active:bg-emerald-600"
        data-testid="exec-search-btn"
        type="button"
        onClick={ callApi }
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  toggleVisible: PropTypes.func.isRequired,
};
