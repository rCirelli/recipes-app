import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareBtn from './inputs/ShareBtn';
import FavoriteBtn from './inputs/FavoriteBtn';

function DoneRecipesCard({ recipe, index, url, favoriteBtn }) {
  const history = useHistory();

  const handleRedirect = () => {
    history.push(url);
  };

  return (
    <div
      className="w-full flex items-center bg-slate-100 rounded-lg gap-x-3
      relative"
      key={ index }
    >
      <button
        className="w-2/6 h-full"
        type="button"
        onClick={ handleRedirect }
      >
        <img
          className="w-full rounded-l-lg"
          src={ `${recipe.image}` }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </button>
      <div className="h-full flex flex-col items-start">
        <p
          className="text-slate-400 italic antialiased text-sm lowercase"
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`
            ${recipe.nationality ? recipe.nationality : ''}
            ${recipe.nationality ? '-' : ''}
            ${recipe.category}
          `}
        </p>
        <button
          type="button"
          onClick={ handleRedirect }
        >
          <p className="text-lg" data-testid={ `${index}-horizontal-name` }>
            {recipe.name}
          </p>
        </button>
        <div className="flex flex-col gap-2">
          {recipe.doneDate && (
            <p
              className="text-xs text-slate-400 antialiased"
              data-testid={ `${index}-horizontal-done-date` }
            >
              Completed on:
              {' '}
              {recipe.doneDate}
            </p>)}
          <div className="flex gap-2">
            {recipe.tags && recipe.tags.map((tagName) => (
              <div
                className="bg-slate-300 rounded px-2 text-xs"
                key={ tagName }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </div>
            ))}
          </div>
          {favoriteBtn && (
            <div className="absolute right-2 bottom-1">
              <FavoriteBtn recipeInfo={ recipe } recipeType={ recipe.type } />
            </div>
          )}
        </div>
        <div className="absolute right-2 top-1">
          <ShareBtn slug={ `http://localhost:3000${url}` } />
        </div>
      </div>
    </div>
  );
}

export default DoneRecipesCard;

DoneRecipesCard.defaultProps = {
  favoriteBtn: false,
};

DoneRecipesCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string,
    category: PropTypes.string.isRequired,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  favoriteBtn: PropTypes.bool,
};
