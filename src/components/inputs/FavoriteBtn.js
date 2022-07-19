import React from 'react';

import favoriteIcon from '../../images/whiteHeartIcon.svg';

function FavoriteBtn() {
  return (
    <button type="button" data-testid="favorite-btn">
      <img src={ favoriteIcon } alt="Favorite" />
    </button>
  );
}

export default FavoriteBtn;
