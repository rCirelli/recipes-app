import React from 'react';
import PropTypes from 'prop-types';

function RecommendedRecipes({ recipeType, recommendations }) {
  const QTY = 6;
  const recommendationsArray = Object.values(recommendations)[0].slice(0, QTY);

  const keys = {
    type: {
      food: 'drink',
      drink: 'food',
    },
    food: {
      id: 'idMeal',
      name: 'strMeal',
      category: 'strCategory',
      image: 'strMealThumb',
    },
    drink: {
      id: 'idDrink',
      name: 'strDrink',
      category: 'strAlcoholic',
      image: 'strDrinkThumb',
    },
  };

  const type = keys.type[recipeType];

  return (
    <div className="w-full mb-7 pl-7">
      <h3 className="text-xl font-medium mb-4">
        Recommendations
      </h3>
      <ul className="w-full inline-flex gap-5 overflow-x-auto">
        {recommendationsArray.map((recipe, index) => (
          <li
            key={ recipe[keys[type].id] }
            data-testid={ String(index).concat('-recomendation-card') }
            className="w-1/2 border border-1 border-slate-200 rounded-lg shrink-0"
          >
            <img
              src={ recipe[keys[type].image] }
              alt={ recipe[keys[type].name] }
              className="rounded-t-lg"
            />
            <div className="w-full pt-3 px-3">
              <p
                data-testid={ String(index).concat('-recomendation-title') }
                className="text-lg font-medium"
              >
                {recipe[keys[type].name]}
              </p>
              <p
                className="text-sm italic lowercase antialiased text-slate-500 mb-5"
              >
                {recipe[keys[type].category]}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendedRecipes;

RecommendedRecipes.propTypes = {
  recipeType: PropTypes.string.isRequired,
  recommendations: PropTypes.shape({
    drinks: PropTypes.arrayOf(PropTypes.object),
    foods: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
