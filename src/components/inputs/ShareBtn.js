import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// import shareIcon from '../../images/shareIcon.svg';

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
    <button
      className="relative"
      type="button"
      data-testid="share-btn"
      onClick={ handleCopy }
    >
      {/* <img src={ shareIcon } alt="Share" /> */}
      <i
        className="fa-solid fa-share-nodes fa-lg"
      />
      { displayMsg && (
        <div
          className="absolute border border-1 border-slate-300 rounded-md w-20
            p-1 right-0 -top-7 font-light text-slate-800 backdrop-blur-sm
            text-xs font-medium"
        >
          <p>Link copied!</p>
        </div>
      )}
    </button>
  );
}

export default ShareBtn;

ShareBtn.propTypes = { slug: PropTypes.string.isRequired };
