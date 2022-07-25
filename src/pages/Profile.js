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
    if (storageUser !== null) {
      setUser(JSON.parse(storageUser));
    }
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      <Header title="Profile" />
      <div className="h-full flex flex-col items-center gap-5 mt-10 p-5">
        <p
          className="text-xl"
          data-testid="profile-email"
        >
          {user.email}
        </p>
        <Link
          to="/done-recipes"
          className="w-full px-10 py-3 rounded-lg bg-emerald-500 text-slate-50
          font-medium tracking-wider text-center active:bg-emerald-600"
        >
          <button data-testid="profile-done-btn" type="button">
            Done Recipes
          </button>
        </Link>
        <Link
          to="/favorite-recipes"
          className="w-full px-10 py-3 rounded-lg bg-emerald-500 text-slate-50
          font-medium tracking-wider text-center active:bg-emerald-600"
        >
          <button data-testid="profile-favorite-btn" type="button">
            Favorite Recipes
          </button>
        </Link>
        <Link
          className="w-full px-10 py-3 rounded-lg bg-slate-200 text-slate-700
          font-medium tracking-wider text-center active:bg-slate-300"
          to="/"
        >
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
