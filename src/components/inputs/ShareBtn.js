import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareBtn({ slug }) {
  const [displayMsg, setDisplayMsg] = useState(false);

  const handleCopy = () => {
    const text = slug.replace('/in-progress', '');
    copy(text);
    setDisplayMsg(true);
  };

  useEffect(() => {
    if (displayMsg) {
      const TIMEOUT = 1000;

      const id = setTimeout(() => {
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
            p-1 right-10 top-[23rem] font-light text-slate-800"
        >
          <p>Link copied!</p>
        </div>
      )}
    </>
  );
}

export default ShareBtn;

ShareBtn.propTypes = { slug: PropTypes.string.isRequired };
