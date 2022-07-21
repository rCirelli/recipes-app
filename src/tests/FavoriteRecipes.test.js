import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => `[
  {
    "id": "52771",
    "type": "food",
    "nationality": "Italian",
    "category": "Vegetarian",
    "alcoholicOrNot": "",
    "name": "Spicy Arrabiata Penne",
    "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
  },
  {
    "id": "178319",
    "type": "drink",
    "nationality": "",
    "category": "Cocktail",
    "alcoholicOrNot": "Alcoholic",
    "name": "Aquamarine",
    "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg"
  }
]`),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });
});

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('', () => {
  it('Testa os filtros da Tela FavoriteRecipes', () => {
    renderWithRouter(<FavoriteRecipes />);

    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /food/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /drinks/i })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /spicy arrabiata penne/i }))
      .toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /aquamarine/i }))
      .toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /food/i }));

    expect(screen.queryByRole('img', {
      name: /spicy arrabiata penne/i,
    })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /aquamarine/i })).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /drinks/i }));

    expect(screen.queryByRole('img', {
      name: /spicy arrabiata penne/i,
    })).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /aquamarine/i })).toBeInTheDocument();
  });

  it('Testa o botão de compartilhar parte 1', () => {
    renderWithRouter(<FavoriteRecipes />);

    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
  });

  it('Testa o botão de compartilhar parte 1', () => {
    renderWithRouter(<FavoriteRecipes />);

    expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('1-horizontal-share-btn'));
  });

  it('Testa o redirecionamento dos elementos parte 1', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);

    expect(screen.queryByRole('img', { name: /spicy arrabiata penne/i }))
      .toBeInTheDocument();

    userEvent.click(screen.queryByRole('img', { name: /spicy arrabiata penne/i }));

    expect(history.location.pathname).toBe('/foods/52771');
  });

  it('Testa o redirecionamento dos elementos parte 2', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);

    expect(screen.getByText(/spicy arrabiata penne/i))
      .toBeInTheDocument();

    userEvent.click(screen.getByText(/spicy arrabiata penne/i));

    expect(history.location.pathname).toBe('/foods/52771');
  });

  it('Testa o redirecionamento dos elementos parte 3', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);

    expect(screen.queryByRole('img', { name: /aquamarine/i }))
      .toBeInTheDocument();

    userEvent.click(screen.queryByRole('img', { name: /aquamarine/i }));

    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('Testa o redirecionamento dos elementos parte 4', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);

    expect(screen.getByText(/aquamarine/i))
      .toBeInTheDocument();

    userEvent.click(screen.getByText(/aquamarine/i));

    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('Testa se ao desfavoritar uma receita ela sai da tela', () => {
    renderWithRouter(<FavoriteRecipes />);

    const unFavBtn0 = screen.getByTestId('0-horizontal-favorite-btn');
    const unFavBtn1 = screen.getByTestId('0-horizontal-favorite-btn');

    expect(screen.getByText(/spicy arrabiata penne/i))
      .toBeInTheDocument();
    expect(screen.getByText(/aquamarine/i))
      .toBeInTheDocument();

    userEvent.click(unFavBtn0);

    expect(screen.queryByText(/spicy arrabiata penne/i))
      .not.toBeInTheDocument();
    expect(screen.queryByText(/aquamarine/i))
      .toBeInTheDocument();

    userEvent.click(unFavBtn1);

    expect(screen.queryByText(/spicy arrabiata penne/i))
      .not.toBeInTheDocument();
    expect(screen.queryByText(/aquamarine/i))
      .not.toBeInTheDocument();
  });
});
