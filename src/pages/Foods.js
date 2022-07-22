import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';

function Foods() {
  const { searchResponse } = useContext(RecipeContext);

  const MAX_RESULTS = 12;

  return (
    <div className="py-14">
      <Header title="Foods" withSearchButton />
      {searchResponse.length > 0 && (
        <ul>
          {searchResponse.map((item, index) => (index < MAX_RESULTS ? (
            <li key={ item.idMeal }>
              <div
                className="flex items-center bg-slate-200 my-5 mx-4 rounded-lg gap-2"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  className="w-2/6 rounded-l-lg"
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                />
                <div>
                  <p className="italic text-sm text-slate-500/90">
                    {`${item.strArea} - ${item.strCategory}`}
                  </p>
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
