import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storageUserEmail = localStorage.getItem('user');
    setUserEmail(JSON.parse(storageUserEmail).email);
  }, []);

  return (
    <div>
      <Header title="Profile" />
      <div>
        <p data-testid="profile-email">{ userEmail }</p>
        <button data-testid="profile-done-btn" type="button">Done Recipes</button>
        <button data-testid="profile-favorite-btn" type="button">Favorite Recipes</button>
        <button data-testid="profile-logout-btn" type="button">Logout</button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
