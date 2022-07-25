import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Recipes from '../components/Recipes'
import renderWithRouter from './renderWithRouter';


const mealCategoriesMock = {
  meals: [
    { strCategory: 'Beef' },
    { strCategory: 'Breakfast' },
    { strCategory: 'Chicken' },
    { strCategory: 'Dessert' },
    { strCategory: 'Goat' },
    { strCategory: 'Lamb' },
    { strCategory: 'Miscellaneous' },
    { strCategory: 'Pasta' },
    { strCategory: 'Pork' },
    { strCategory: 'Seafood' },
    { strCategory: 'Side' },
    { strCategory: 'Starter' },
    { strCategory: 'Vegan' },
    { strCategory: 'Vegetarian' }
  ]
};

const drinkCategoriesMock = {
  drinks: [
    { strCategory: 'Ordinary Drink' },
    { strCategory: 'Cocktail' },
    { strCategory: 'Shake' },
    { strCategory: 'Other\/Unknown' },
    { strCategory: 'Cocoa' },
    { strCategory: 'Shot' },
    { strCategory: 'Coffee \/ Tea' },
    { strCategory: 'Homemade Liqueur' },
    { strCategory: 'Punch \/ Party Drink' },
    { strCategory: 'Beer' },
    { strCategory: 'Soft Drink \/ Soda' }
  ],
};



describe('Testa o componente Recipes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

   it('Testa os botões de categorias da página foods', async () => {
     const fetchMock = jest.spyOn(global, 'fetch');
     global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategoriesMock),
     });
    renderWithRouter(<Recipes isMeal />);
    expect(fetchMock).toBeCalledTimes(1);
    const allButton = screen.getByRole('button', {name: /all/i});
    const beefCategorie = await screen.findByRole('button', {name: /beef/i});
    const breakfastCategorie = await screen.findByRole('button', {name: /breakfast/i});
    const chickenCategorie = await screen.findByRole('button', {name: /chicken/i});
    const dessertCategorie = await screen.findByRole('button', {name: /dessert/i});
    const goatCategorie = await screen.findByRole('button', {name: /goat/i});

    expect(allButton).toBeInTheDocument();
    expect(beefCategorie).toBeInTheDocument();
    expect(breakfastCategorie).toBeInTheDocument();
    expect(chickenCategorie).toBeInTheDocument();
    expect(dessertCategorie).toBeInTheDocument();
    expect(goatCategorie).toBeInTheDocument();
  });

  it('Testa os botões de categorias da página drinks', async () => {
    const fetchMock = jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
     json: jest.fn().mockResolvedValue(drinkCategoriesMock),
    });

   renderWithRouter(<Recipes isMeal={false} />);
   expect(fetchMock).toBeCalledTimes(1);
   const allButton = screen.getByRole('button', {name: /all/i});
   const ordDrinkCategorie = await screen.findByRole('button', {name: /ordinary drink/i});
   const cocktailCategorie = await screen.findByRole('button', {name: /cocktail/i});
   const shakeCategorie = await screen.findByRole('button', {name: /shake/i});
   const otherCategorie = await screen.findByRole('button', {name: /other/i});
   const cocoaCategorie = await screen.findByRole('button', {name: /cocoa/i});


   expect(allButton).toBeInTheDocument();
   expect(ordDrinkCategorie).toBeInTheDocument();
   expect(cocktailCategorie).toBeInTheDocument();
   expect(shakeCategorie).toBeInTheDocument();
   expect(otherCategorie).toBeInTheDocument();
   expect(cocoaCategorie).toBeInTheDocument();
 });
});
