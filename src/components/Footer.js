import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      className="w-screen fixed bottom-0 py-3 px-5 bg-slate-200 z-50
      border-t border-slate-300
      shadow-[0_-10px_30px_4px_rgba(0,0,0,0.1),0_10px_30px_4px_rgba(45,78,255,0.15)]"
      data-testid="footer"
    >
      <div className="flex justify-between">
        <Link to="/drinks">
          <img src={ drinkIcon } alt="drinks" data-testid="drinks-bottom-btn" />
        </Link>
        <Link to="/foods">
          <img src={ mealIcon } alt="foods" data-testid="food-bottom-btn" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
