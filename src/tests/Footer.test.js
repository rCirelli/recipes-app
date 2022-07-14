import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Teste componente footer', () => {
  it('verifica se os ícones estão presentes', () => {
    render(<Footer />);

    const drinksIcon = screen.getByRole('img', { name: /drinks/i });
    const mealsIcon = screen.getByRole('img', { name: /meals/i });

    expect(drinksIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();
  });
});
