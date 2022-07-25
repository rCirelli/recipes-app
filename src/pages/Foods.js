import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import RecipeContext from '../context/RecipeContext';

function Foods() {
  const { searchResponse } = useContext(RecipeContext);
  const [recipesList, setRecipesList] = useState([]);

  const MAX_RESULTS = 12;

  useEffect(() => {
    if (searchResponse.length > 0 && searchResponse[0].idMeal) {
      setRecipesList(searchResponse);
    }
  }, [searchResponse]);

  return (
    <div className="py-14">
      <Header title="Foods" withSearchButton />
      <Recipes isMeal />
      {recipesList.length > 0 && (
        <ul>
          {recipesList.map((item, index) => (index < MAX_RESULTS ? (
            <li key={ item.idMeal }>
              <div
                className="flex items-center bg-slate-100 my-5 mx-4 rounded-lg gap-2
                drop-shadow-md"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  className="w-2/6 rounded-l-lg"
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                />
                <div>
                  {/*
                  <p className="italic text-sm text-slate-500/90">
                    {`${item.strArea} - ${item.strCategory}`}
                  </p> */}
                  <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
                </div>
              </div>
            </li>
          ) : null))}
        </ul>
      )}
      <Footer />
    </div>
  );
}

export default Foods;
