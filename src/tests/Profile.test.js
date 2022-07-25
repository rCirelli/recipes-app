import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa a tela Profile', () => {
  it('Testa os campos da tela Profile', () => {
    renderWithRouter(<App />);

    const testEmail = 'test@test.test';
    const emailInput = screen.getByPlaceholderText(/email/i);  
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, testEmail);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(submitBtn);

    const profileIco = screen.getByRole('img', { name: /profile icon/i });

    userEvent.click(profileIco);

    const testEmailElement = screen.getByText(/test@test\.test/i);
    const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
    const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    expect(testEmailElement).toBeInTheDocument();
    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(logoutBtn);
  });

  it('Testa a tela Profile quando não passa pelo login', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
  });
});
