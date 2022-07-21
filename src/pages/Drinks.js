import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <>
      <Header title="Drinks" withSearchButton />
      <Recipes isMeal={ false } />
      <Footer />
    </>
  );
}

export default Drinks;
