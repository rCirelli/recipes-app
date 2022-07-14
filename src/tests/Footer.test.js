import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';

import renderWithRouter from './renderWithRouter';

describe('Teste componente footer', () => {
  it('verifica se os ícones estão presentes', () => {
    renderWithRouter(<Footer />);

    const drinksIcon = screen.getByRole('img', { name: /drinks/i });
    const mealsIcon = screen.getByRole('img', { name: /foods/i });

    expect(drinksIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();
  });

  it('verifica se os redirecionam para as URLs correspondentes', () => {
    const {history} = renderWithRouter(<Footer />);

    const drinksIcon = screen.getByRole('link', { name: /drinks/i });
    expect(drinksIcon).toBeInTheDocument();
    const mealsIcon = screen.getByRole('link', { name: /foods/i });
    expect(mealsIcon).toBeInTheDocument();

    userEvent.click(drinksIcon);
    expect(history.location.pathname).toBe('/drinks');
    
    history.goBack()

    userEvent.click(mealsIcon);
    expect(history.location.pathname).toBe('/foods');
  });
});
