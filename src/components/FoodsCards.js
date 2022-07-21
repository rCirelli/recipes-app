import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFood, getFoodCategories, getSpecificMeal } from '../service/api';

function FoodsCards() {
  const [foodCategories, setFoodCategories] = useState({});
  const [foodData, setfoodData] = useState({});
  const [toggle, setToggle] = useState(false);

  const twelve = 12;
  const five = 5;

  useEffect(() => {
    async function addRecipes() {
      const foods = await getFood();
      setfoodData(foods);
      const mealCategories = await getFoodCategories();
      setFoodCategories(mealCategories);
    }
    addRecipes();
  }, []);

  async function filterRecipes({ target: { value } }) {
    if (toggle === false) {
      setToggle(true);
      const mealRecipe = await getSpecificMeal(value);
      setfoodData(mealRecipe);
    } else {
      setToggle(false);
      const foods = await getFood();
      setfoodData(foods);
    }
  }

  async function handleClick() {
    const foods = await getFood();
    setfoodData(foods);
  }

  return (
    <div>
      <div>
        {foodCategories?.meals?.slice(0, five).map((categories, index) => (
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
        {foodData?.meals?.slice(0, twelve).map((meal, index) => (
          <div
            key={ meal.idMeal }
            data-testid={ String(index).concat('-recipe-card') }
          >
            <Link to={ '/foods/'.concat(meal.idMeal) }>
              <img
                data-testid={ String(index).concat('-card-img') }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
            </Link>
            <p data-testid={ String(index).concat('-card-name') }>{meal.strMeal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodsCards;
