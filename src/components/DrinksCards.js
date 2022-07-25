import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import { getDrink, getDrinkCategories, getSpecificDrink } from '../service/api';

function DrinksCards() {
  const { searchResponse, setSearchResponse } = useContext(RecipeContext);
  const [drinksCategories, setDrinksCategories] = useState({});
  const [toggle, setToggle] = useState(false);

  const twelve = 12;
  const five = 5;
  const { drinks } = searchResponse;

  useEffect(() => {
    async function addRecipes() {
      const drink = await getDrink();
      setSearchResponse(drink);
      const drinkCategories = await getDrinkCategories();
      setDrinksCategories(drinkCategories);
    }
    addRecipes();
  }, []);

  async function filterRecipes({ target: { value } }) {
    if (toggle === false) {
      setToggle(true);
      const drinkRecipe = await getSpecificDrink(value);
      setSearchResponse(drinkRecipe);
    } else {
      setToggle(false);
      const drink = await getDrink();
      setSearchResponse(drink);
    }
  }

  async function handleClick() {
    const drinksRec = await getDrink();
    setSearchResponse(drinksRec);
  }

  return (
    <div>
      <div>
        {drinksCategories?.drinks?.slice(0, five).map((categories, index) => (
          <button
            type="button"
            key={ index }
            value={ categories.strCategory }
            data-testid={ String(categories.strCategory).concat('-category-filter') }
            onClick={ filterRecipes }
          >
            {categories.strCategory}

          </button>
        ))}
        <button
          type="button"
          onClick={ handleClick }
          data-testid="All-category-filter"
        >
          All
        </button>
      </div>
      <div>
        {drinks?.slice(0, twelve).map((drink, index) => (
          <div
            key={ drink.idDrink }
            data-testid={ String(index).concat('-recipe-card') }
          >
            <Link to={ '/drinks/'.concat(drink.idDrink) }>
              <img
                data-testid={ String(index).concat('-card-img') }
                src={ drink.strDrinkThumb }
                alt={ drink.strdrink }
              />
            </Link>
            <p
              data-testid={ String(index).concat('-card-name') }
            >
              {drink.strDrink}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DrinksCards;
