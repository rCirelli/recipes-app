import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks'
import renderWithRouter from './renderWithRouter';
import { getDrink, getDrinkCategories, getFood, getFoodCategories } from '../service/api';
import FoodsCards from '../components/FoodsCards';
import DrinksCards from '../components/DrinksCards';

const mealCategoriesMock = require('../../cypress/mocks/mealCategories');
const { meals } = mealCategoriesMock;
const mealsMock = require('../../cypress/mocks/meals')
// const foodMocks = require('../service/api')
jest.mock('../service/api');

describe('Testa a tela de Login', () => {
   it('Testa os botões de categorias da página foods', async () => {
    renderWithRouter(<FoodsCards />);
    getFood.mockResolvedValue(mealsMock.meals)
    getFoodCategories.mockResolvedValue(mealCategoriesMock);
    const categorieList = await screen.findAllByRole('button')

    expect(categorieList.length).toBe(6);
  });

  // it('Testa os botões de categorias da página drinks', async () => {
  //   renderWithRouter(<FoodsCards />);
  //   await getDrink();
  //   await getDrinkCategories();
  //   const categorieList = screen.getAllByRole('button')

  //   expect(categorieList.length).toBe(6);
  // });
});
