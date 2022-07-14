import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      className="w-screen fixed bottom-0 py-3 px-5 bg-slate-200 shadow-inner"
      data-testid="footer"
    >
      <div className="flex justify-between">
        <Link to="/drinks">
          <img
            src={ drinkIcon }
            alt="drinks"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/foods">
          <img
            src={ mealIcon }
            alt="meals"
            data-testid="food-bottom-btn"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
