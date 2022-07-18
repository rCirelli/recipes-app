import React from 'react';
import { screen } from '@testing-library/react';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from './renderWithRouter';

describe('Testa a página Done Recipes', () => {
  it('Testa os componentes da Tela Done Recipes', () => {
    renderWithRouter(<DoneRecipes />);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  });
});
