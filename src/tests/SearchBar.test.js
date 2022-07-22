import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import RecipeContext from '../context/RecipeContext';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import { mockSaltIngredient, mockSpicyArrabiata, mockAquamarine } from './mockData';

const TWO_SECONDS = 2000;

describe('Testa o componente de busca do header', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Testa se o elemento renderiza na tela e se chamam a api', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockSaltIngredient),
    }));

    let searchResponse = [];

    const setSearchResponse = jest.fn().mockImplementation((param) => {
      searchResponse = param;
    });

    let searchInput = '';

    const setSearchInput = jest.fn().mockImplementation((param) => {
      searchInput = param;
    });

    renderWithRouter(
      <RecipeContext.Provider
        value={
          { searchResponse, setSearchResponse, searchInput, setSearchInput }
        }
      >
        <Foods />
      </RecipeContext.Provider>,
    );
    expect(screen.getByRole('img', { name: /search icon/i })).toBeInTheDocument();
    expect(screen.queryByRole('radio', { name: /ingredient/i })).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('img', { name: /search icon/i }));

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /ingredient/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /first letter/i })).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();

    userEvent.type(screen.getByRole('textbox'), 'salt');
    userEvent.click((screen.getByRole('radio', { name: /ingredient/i })));
    userEvent.click(screen.getByTestId('exec-search-btn'));
    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=');
  });

  it('Testa se redireciona quando só retorna uma receita', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockSpicyArrabiata),
    }));

    let searchResponse = mockSpicyArrabiata;

    const setSearchResponse = jest.fn().mockImplementation((param) => {
      searchResponse = param;
    });

    let searchInput = 'spicy arrabiata';

    const setSearchInput = jest.fn().mockImplementation((param) => {
      searchInput = param;
    });

    const { history } = renderWithRouter(
      <RecipeContext.Provider
        value={
          { searchResponse, setSearchResponse, searchInput, setSearchInput }
        }
      >
        <Foods />
      </RecipeContext.Provider>,
    );

    userEvent.click(screen.getByRole('img', { name: /search icon/i }));
    userEvent.type(screen.getByTestId('search-input'), 'spicy arrabiata');
    userEvent.click((screen.getByRole('radio', { name: /name/i })));
    userEvent.click(screen.getByTestId('exec-search-btn'));
    await waitFor(() => setTimeout(() => {}, TWO_SECONDS));
    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=spicy arrabiata');
    expect(history.location.pathname).toBe('/foods/52771');
  });

  it('Testa se a api retornar nenhuma resposta um alerta aparece na tela', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ meals: null }),
    }));

    global.alert = jest.fn();

    let searchResponse = mockSpicyArrabiata;

    const setSearchResponse = jest.fn().mockImplementation((param) => {
      searchResponse = param;
    });

    let searchInput = 'xablau';

    const setSearchInput = jest.fn().mockImplementation((param) => {
      searchInput = param;
    });

    renderWithRouter(
      <RecipeContext.Provider
        value={
          { searchResponse, setSearchResponse, searchInput, setSearchInput }
        }
      >
        <Foods />
      </RecipeContext.Provider>,
    );

    userEvent.click(screen.getByRole('img', { name: /search icon/i }));
    userEvent.type(screen.getByTestId('search-input'), 'xablau');
    userEvent.click((screen.getByRole('radio', { name: /name/i })));
    userEvent.click(screen.getByTestId('exec-search-btn'));
    await waitFor(() => setTimeout(() => {}, TWO_SECONDS));
    expect(global.alert).toBeCalledTimes(1);
  });

  it('Testa se ao clicar no filtro de primeira letra e digitar mais que uma letra um alerta aparece na tela', () => {
    global.alert = jest.fn();

    let searchResponse = [];

    const setSearchResponse = jest.fn().mockImplementation((param) => {
      searchResponse = param;
    });

    let searchInput = 'xablau';

    const setSearchInput = jest.fn().mockImplementation((param) => {
      searchInput = param;
    });

    renderWithRouter(
      <RecipeContext.Provider
        value={
          { searchResponse, setSearchResponse, searchInput, setSearchInput }
        }
      >
        <Foods />
      </RecipeContext.Provider>,
    );

    userEvent.click(screen.getByRole('img', { name: /search icon/i }));
    userEvent.type(screen.getByTestId('search-input'), 'xablau');
    userEvent.click((screen.getByRole('radio', { name: /first letter/i })));
    userEvent.click(screen.getByTestId('exec-search-btn'));
    expect(global.alert).toBeCalledTimes(1);
  });

  it('Testa se ao estar na página drink os valores buscados corretamente', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockAquamarine),
    }));

    delete window.location;
    window.location = {};
    const getHrefSpy = jest.fn(() => 'drinks');
    Object.defineProperty(window.location, 'href', {
      get: getHrefSpy,
    });

    let searchResponse = mockAquamarine;

    const setSearchResponse = jest.fn().mockImplementation((param) => {
      searchResponse = param;
    });

    let searchInput = 'aquamarine';

    const setSearchInput = jest.fn().mockImplementation((param) => {
      searchInput = param;
    });

    const { history } = renderWithRouter(
      <RecipeContext.Provider
        value={
          { searchResponse, setSearchResponse, searchInput, setSearchInput }
        }
      >
        <Drinks />
      </RecipeContext.Provider>,
    );

    userEvent.click(screen.getByRole('img', { name: /search icon/i }));
    userEvent.type(screen.getByTestId('search-input'), 'aquamarine');
    userEvent.click((screen.getByRole('radio', { name: /name/i })));
    userEvent.click(screen.getByTestId('exec-search-btn'));
    await waitFor(() => setTimeout(() => {}, TWO_SECONDS));
    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=aquamarine');
    expect(history.location.pathname).toBe('/drinks/178319');
  });
});
