import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [user, setUser] = useState({
    email: '',
  });

  function handleLogout() {
    localStorage.clear();
  }

  useEffect(() => {
    const storageUser = localStorage.getItem('user');
    if (storageUser) {
      setUser(JSON.parse(storageUser));
    }
  }, []);

  return (
    <div>
      <Header title="Profile" />
      <div>
        <p data-testid="profile-email">{ user.email }</p>
        <Link to="/done-recipes">
          <button data-testid="profile-done-btn" type="button">Done Recipes</button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Favorite Recipes

          </button>
        </Link>
        <Link to="/">
          <button
            onClick={ handleLogout }
            data-testid="profile-logout-btn"
            type="button"
          >
            Logout

          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
