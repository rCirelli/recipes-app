import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from './renderWithRouter';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testa a página Done Recipes', () => {
  it('Testa os filtros da Tela Done Recipes', () => {
    renderWithRouter(<DoneRecipes />);

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
    renderWithRouter(<DoneRecipes />);

    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
  });

  it('Testa o botão de compartilhar parte 1', () => {
    renderWithRouter(<DoneRecipes />);

    expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('1-horizontal-share-btn'));
  });

  it('Testa o redirecionamento dos elementos parte 1', () => {
    const { history } = renderWithRouter(<DoneRecipes />);

    expect(screen.queryByRole('img', { name: /spicy arrabiata penne/i }))
      .toBeInTheDocument();

    userEvent.click(screen.queryByRole('img', { name: /spicy arrabiata penne/i }));

    expect(history.location.pathname).toBe('/foods/52771');
  });

  it('Testa o redirecionamento dos elementos parte 2', () => {
    const { history } = renderWithRouter(<DoneRecipes />);

    expect(screen.getByText(/spicy arrabiata penne/i))
      .toBeInTheDocument();

    userEvent.click(screen.getByText(/spicy arrabiata penne/i));

    expect(history.location.pathname).toBe('/foods/52771');
  });

  it('Testa o redirecionamento dos elementos parte 3', () => {
    const { history } = renderWithRouter(<DoneRecipes />);

    expect(screen.queryByRole('img', { name: /aquamarine/i }))
      .toBeInTheDocument();

    userEvent.click(screen.queryByRole('img', { name: /aquamarine/i }));

    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('Testa o redirecionamento dos elementos parte 3', () => {
    const { history } = renderWithRouter(<DoneRecipes />);

    expect(screen.getByText(/aquamarine/i))
      .toBeInTheDocument();

    userEvent.click(screen.getByText(/aquamarine/i));

    expect(history.location.pathname).toBe('/drinks/178319');
  });
});
