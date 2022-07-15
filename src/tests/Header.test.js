import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import Header from "../components/Header";
import renderWithRouter from "./renderWithRouter";

describe("Teste do componente header" , () => {
  it("Deve ter o título passado como prop", () => {
    const expectedTitle = "Titulo esperado";
    
    renderWithRouter(<Header title={ expectedTitle } />);

    const pageTitle = screen.getByRole( "heading", { name: expectedTitle, level: 1 })
    expect(pageTitle).toBeInTheDocument();
  })

  it("Deve renderizar o botão de pesquisa quando passado como prop", () => {
    renderWithRouter(<Header title="titulo aleatório" withSearchButton />);

    const searchButton = screen.getByRole("img", { name: /search icon/i })
    expect(searchButton).toBeInTheDocument();
  })

  it("Não deve renderizar o botão de pesquisa quando nada é passado como prop", () => {
    renderWithRouter(<Header title="titulo aleatório" />);
    const searchButton = screen.queryByRole("img", { name: /search icon/i })
    expect(searchButton).not.toBeInTheDocument();
  })

  it("Deve ter o ícone do perfil", () => {
    renderWithRouter(<Header title="titulo aleatório" />);
    const profileIcon = screen.getByRole("img", { name: /profile icon/i })
    expect(profileIcon).toBeInTheDocument();
  })

  it("Deve redirecionar para o /profile ao clicar na foto de perfil", () => {

    const { history } = renderWithRouter(<Header title="titulo aleatório" />);
    const profileIcon = screen.getByRole("link", { name: /profile icon/i })

    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe("/profile");
  })

  it("Não deve ter um input antes de clicar no botão de pesquisa", () => {
    renderWithRouter(<Header title="titulo aleatório" withSearchButton />);
    const searchInput = screen.queryByTestId("search-input");
    expect(searchInput).not.toBeInTheDocument();

  })

  it("Deve aparecer um input ao clicar no botão de pesquisar e desaparecer ao clicar novamente", () => {
    renderWithRouter(<Header title="titulo aleatório" withSearchButton />);
    const searchButton = screen.getByRole("button", { name: /search icon/i });

    userEvent.click(searchButton);

    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toBeInTheDocument();

    userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  })
})