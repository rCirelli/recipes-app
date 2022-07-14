import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa a tela de Login', () => {
  it('Testa os campos do formulário', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByText(/insira seu e-mail/i);
    const passwordInput = screen.getByLabelText(/insira sua senha/i);
    const submitBtn = screen.getByRole('button', { name: /enter/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn.disabled).toBe(true);

    userEvent.type(emailInput, 'test@gmail.com');

    expect(submitBtn.disabled).toBe(true);

    userEvent.type(passwordInput, 'senha123');

    expect(submitBtn.disabled).toBe(false);

    userEvent.click(submitBtn);
  });
});
