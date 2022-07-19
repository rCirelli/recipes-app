import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareBtn({ slug }) {
  const [displayMsg, setDisplayMsg] = useState(false);

  const handleCopy = () => {
    copy(slug);
    setDisplayMsg(true);
  };

  useEffect(() => {
    console.log('useEffect');
    if (displayMsg) {
      const TIMEOUT = 1000;

      const id = setTimeout(() => {
        console.log('timeout');
        setDisplayMsg(false);
      }, TIMEOUT);

      return () => clearInterval(id);
    }
  }, [displayMsg]);

  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleCopy }
      >
        <img src={ shareIcon } alt="Share" />
      </button>
      { displayMsg && (
        <div
          className="absolute bg-slate-50 border border-1 border-slate-200 rounded-lg
            p-1 right-10 top-[23rem]"
        >
          <p>Link copied!</p>
        </div>
      )}
    </>
  );
}

export default ShareBtn;

ShareBtn.propTypes = { slug: PropTypes.string.isRequired };
