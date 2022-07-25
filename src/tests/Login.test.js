import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa a tela de Login', () => {
  it('Testa os campos do formulário', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitBtn = screen.getByRole('button', { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn.disabled).toBe(true);

    userEvent.type(emailInput, 'test@gmail.com');

    expect(submitBtn).toBeDisabled();

    userEvent.type(passwordInput, 'senha123');

    expect(submitBtn).toBeEnabled();

    userEvent.click(submitBtn);
  });
});
