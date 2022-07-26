import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

import favoriteIcon from '../../images/whiteHeartIcon.svg';
import selectedFavoriteIcon from '../../images/blackHeartIcon.svg';

function FavoriteBtn({ recipeInfo, recipeType }) {
  const [favoriteRecipes, saveFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const [isFavorite, setIsFavorite] = useState(false);
  // const { id } = useParams();

  // const type = {
  //   food: {
  //     id: 'idMeal',
  //     thumbnail: 'strMealThumb',
  //     name: 'strMeal',
  //     category: 'strCategory',
  //   },
  //   drink: {
  //     id: 'idDrink',
  //     thumbnail: 'strDrinkThumb',
  //     name: 'strDrink',
  //     category: 'strAlcoholic',
  //   },
  // };

  // const newFavoriteRecipe = {
  //   id: recipeInfo[type[recipeType].id],
  //   type: recipeType,
  //   nationality: recipeInfo.strArea || '',
  //   category: recipeInfo.strCategory || '',
  //   alcoholicOrNot: recipeInfo.strAlcoholic || '',
  //   name: recipeInfo[type[recipeType].name],
  //   image: recipeInfo[type[recipeType].thumbnail],
  // };
  const newFavoriteRecipe = {
    id: recipeInfo.id,
    type: recipeType,
    nationality: recipeInfo.nationality || '',
    category: recipeInfo.category || '',
    alcoholicOrNot: recipeInfo.alcoholicOrNot || '',
    name: recipeInfo.name,
    image: recipeInfo.image,
  };

  const checkIsFavorite = useCallback(() => {
    const favoriteRecipe = favoriteRecipes.some((recipe) => recipe.id === recipeInfo.id);
    setIsFavorite(favoriteRecipe);
    return favoriteRecipe;
  }, [favoriteRecipes, recipeInfo.id]);

  useEffect(() => {
    if (favoriteRecipes.length > 0) {
      checkIsFavorite();
    }
  }, [favoriteRecipes, checkIsFavorite, recipeInfo.id]);

  const handleToggleFavorite = () => {
    const favorite = checkIsFavorite();
    if (favorite) {
      const updatedFavorites = favoriteRecipes.filter(
        (recipe) => recipe.id !== recipeInfo.id,
      );
      saveFavoriteRecipes(updatedFavorites);
      setIsFavorite(false);
      return;
    }
    saveFavoriteRecipes([...favoriteRecipes, newFavoriteRecipe]);
  };

  return (
    <button
      type="button"
      onClick={ handleToggleFavorite }
    >
      {/* <img
        data-testid="favorite-btn"
        src={ isFavorite ? selectedFavoriteIcon : favoriteIcon }
        alt="Favorite"
      /> */}
      <i className={ `${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart` } />
    </button>
  );
}

export default FavoriteBtn;

FavoriteBtn.propTypes = {
  recipeType: PropTypes.string.isRequired,
  recipeInfo: PropTypes.shape({
    // strArea: PropTypes.string,
    // strCategory: PropTypes.string,
    // strAlcoholic: PropTypes.string,
    id: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
