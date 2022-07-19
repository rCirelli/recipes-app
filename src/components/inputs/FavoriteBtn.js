import React from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../../hooks/useLocalStorage';

import favoriteIcon from '../../images/whiteHeartIcon.svg';

function FavoriteBtn({ recipeInfo, recipeType }) {
  const [favoriteRecipes, saveFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);

  const type = {
    food: {
      id: 'idMeal',
      thumbnail: 'strMealThumb',
      name: 'strMeal',
      category: 'strCategory',
    },
    drink: {
      id: 'idDrink',
      thumbnail: 'strDrinkThumb',
      name: 'strDrink',
      category: 'strAlcoholic',
    },
  };

  const newFavoriteRecipe = {
    id: recipeInfo[type[recipeType].id],
    type: recipeType,
    nationality: recipeInfo.strArea || '',
    category: recipeInfo.strCategory || '',
    alcoholicOrNot: recipeInfo.strAlcoholic || '',
    name: recipeInfo[type[recipeType].name],
    image: recipeInfo[type[recipeType].thumbnail],
  };

  const handleSaveFavorite = () => {
    saveFavoriteRecipes([...favoriteRecipes, newFavoriteRecipe]);
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ handleSaveFavorite }
    >
      <img src={ favoriteIcon } alt="Favorite" />
    </button>
  );
}

export default FavoriteBtn;

FavoriteBtn.propTypes = {
  recipeType: PropTypes.string.isRequired,
  recipeInfo: PropTypes.shape({
    strArea: PropTypes.string,
    strCategory: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string,
  }).isRequired,
};
