import React from 'react';

import shareIcon from '../../images/shareIcon.svg';

function ShareBtn() {
  return (
    <button type="button" data-testid="share-btn">
      <img src={ shareIcon } alt="Share" />
    </button>
  );
}

export default ShareBtn;
