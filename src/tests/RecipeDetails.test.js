import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import RecipeDetails from '../pages/RecipeDetails';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const mockFoodData = {
  "meals": [
    {
      "idMeal": "52904",
      "strMeal": "Beef Bourguignon",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "French",
      "strInstructions": "Heat a large casserole pan and add 1 tbsp goose fat. Season the beef and fry until golden brown, about 3-5 mins, then turn over and fry the other side until the meat is browned all over, adding more fat if necessary. Do this in 2-3 batches, transferring the meat to a colander set over a bowl when browned.\r\nIn the same pan, fry the bacon, shallots or pearl onions, mushrooms, garlic and bouquet garni until lightly browned. Mix in the tomato purée and cook for a few mins, stirring into the mixture. This enriches the bourguignon and makes a great base for the stew. Then return the beef and any drained juices to the pan and stir through.\r\nPour over the wine and about 100ml water so the meat bobs up from the liquid, but isn’t completely covered. Bring to the boil and use a spoon to scrape the caramelised cooking juices from the bottom of the pan – this will give the stew more flavour.\r\nHeat oven to 150C/fan 130C/gas 2. Make a cartouche: tear off a square of foil slightly larger than the casserole, arrange it in the pan so it covers the top of the stew and trim away any excess foil. Then cook for 3 hrs. If the sauce looks watery, remove the beef and veg with a slotted spoon, and set aside. Cook the sauce over a high heat for a few mins until the sauce has thickened a little, then return the beef and vegetables to the pan.\r\nTo make the celeriac mash, peel the celeriac and cut into cubes. Heat the olive oil in a large frying pan. Tip in the celeriac and fry for 5 mins until it turns golden. Season well with salt and pepper. Stir in the rosemary, thyme, bay and cardamom pods, then pour over 200ml water, enough to nearly cover the celeriac. Turn the heat to low, partially cover the pan and leave to simmer for 25-30 mins.\r\nAfter 25-30 mins, the celeriac should be soft and most of the water will have evaporated. Drain away any remaining water, then remove the herb sprigs, bay and cardamom pods. Lightly crush with a potato masher, then finish with a glug of olive oil and season to taste. Spoon the beef bourguignon into serving bowls and place a large spoonful of the celeriac mash on top. Garnish with one of the bay leaves, if you like.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/vtqxtu1511784197.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=SQnr4Z-7rok",
      "strIngredient1": "Goose Fat",
      "strIngredient2": "Beef Shin",
      "strIngredient3": "Bacon",
      "strIngredient4": "Challots",
      "strIngredient5": "Chestnut Mushroom",
      "strIngredient6": "Garlic Clove",
      "strIngredient7": "Bouquet Garni",
      "strIngredient8": "Tomato Puree",
      "strIngredient9": "Red Wine",
      "strIngredient10": "Celeriac",
      "strIngredient11": "Olive Oil",
      "strIngredient12": "Thyme",
      "strIngredient13": "Rosemary",
      "strIngredient14": "Bay Leaf",
      "strIngredient15": "Cardamom",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "3 tsp",
      "strMeasure2": "600g",
      "strMeasure3": "100g ",
      "strMeasure4": "350g",
      "strMeasure5": "250g",
      "strMeasure6": "2 sliced",
      "strMeasure7": "1",
      "strMeasure8": "1 tbs",
      "strMeasure9": "750 ml ",
      "strMeasure10": "600g",
      "strMeasure11": "2 tbs",
      "strMeasure12": "sprigs of fresh",
      "strMeasure13": "sprigs of fresh",
      "strMeasure14": "2",
      "strMeasure15": "4",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbcgoodfood.com/recipes/5032/beef-bourguignon",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    }
  ]
};

const mockDrinkData = 
{
  "drinks": [
    {
      "idDrink": "11007",
      "strDrink": "Margarita",
      "strDrinkAlternate": null,
      "strTags": "IBA,ContemporaryClassic",
      "strVideo": null,
      "strCategory": "Ordinary Drink",
      "strIBA": "Contemporary Classics",
      "strAlcoholic": "Alcoholic",
      "strGlass": "Cocktail glass",
      "strInstructions": "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
      "strInstructionsES": null,
      "strInstructionsDE": "Reiben Sie den Rand des Glases mit der Limettenscheibe, damit das Salz daran haftet. Achten Sie darauf, dass nur der äußere Rand angefeuchtet wird und streuen Sie das Salz darauf. Das Salz sollte sich auf den Lippen des Genießers befinden und niemals in den Cocktail einmischen. Die anderen Zutaten mit Eis schütteln und vorsichtig in das Glas geben.",
      "strInstructionsFR": null,
      "strInstructionsIT": "Strofina il bordo del bicchiere con la fetta di lime per far aderire il sale.\r\nAvere cura di inumidire solo il bordo esterno e cospargere di sale.\r\nIl sale dovrebbe presentarsi alle labbra del bevitore e non mescolarsi mai al cocktail.\r\nShakerare gli altri ingredienti con ghiaccio, quindi versarli delicatamente nel bicchiere.",
      "strInstructionsZH-HANS": null,
      "strInstructionsZH-HANT": null,
      "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
      "strIngredient1": "Tequila",
      "strIngredient2": "Triple sec",
      "strIngredient3": "Lime juice",
      "strIngredient4": "Salt",
      "strIngredient5": null,
      "strIngredient6": null,
      "strIngredient7": null,
      "strIngredient8": null,
      "strIngredient9": null,
      "strIngredient10": null,
      "strIngredient11": null,
      "strIngredient12": null,
      "strIngredient13": null,
      "strIngredient14": null,
      "strIngredient15": null,
      "strMeasure1": "1 1/2 oz ",
      "strMeasure2": "1/2 oz ",
      "strMeasure3": "1 oz ",
      "strMeasure4": null,
      "strMeasure5": null,
      "strMeasure6": null,
      "strMeasure7": null,
      "strMeasure8": null,
      "strMeasure9": null,
      "strMeasure10": null,
      "strMeasure11": null,
      "strMeasure12": null,
      "strMeasure13": null,
      "strMeasure14": null,
      "strMeasure15": null,
      "strImageSource": "https://commons.wikimedia.org/wiki/File:Klassiche_Margarita.jpg",
      "strImageAttribution": "Cocktailmarler",
      "strCreativeCommonsConfirmed": "Yes",
      "dateModified": "2015-08-18 14:42:59"
    }
  ]
};

describe('Testa a página Recipe Details', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se os componentes da tela são renderizados', async () => {
    const fetchMock = jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockFoodData),
    });
    
    renderWithRouter(
      <RecipeDetails recipeType="food" match={ {params: { id: '52904' }} } />);

    expect(fetchMock).toBeCalledTimes(2);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const recipeImage = screen.getByRole('img', {  name: /beef bourguignon/i})
    expect(recipeImage).toBeInTheDocument();

    const recipeName = screen.getByRole('heading', {  name: /beef bourguignon/i});
    expect(recipeName).toBeInTheDocument();

    const recipeCategory = screen.getByRole('heading', {  name: "Beef"});
    expect(recipeCategory).toBeInTheDocument();

    const ingredients = screen.getAllByTestId(/ingredient/i);
    expect(ingredients).toHaveLength(15);

    const instructions = screen.getByText('Heat a large casserole pan and add 1 tbsp goose fat.');
    expect(instructions).toBeInTheDocument();

    const video = screen.getByTestId('video');
    expect(video).toHaveAttribute('src', 'https://www.youtube.com/embed/SQnr4Z-7rok');
    expect(video).toBeInTheDocument();

    const recommendations = screen.getAllByTestId(/recomendation-card/i);
    expect(recommendations).toHaveLength(6);

    const startRecipeButton = screen.getByRole('button', { name: /start recipe/i })
    expect(startRecipeButton).toBeInTheDocument();
  });

  it('Verifica o comportamento ao clicar em Start Recipe', async () => {
    const fetchMockFood = jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockFoodData),
    });
    
    const { history } = renderWithRouter(<App />, '/foods/52904');

    expect(fetchMockFood).toBeCalledTimes(2);

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const startRecipeButton = screen.getByRole('button', { name: /start recipe/i });
    expect(startRecipeButton).toBeInTheDocument();
    userEvent.click(startRecipeButton);
    expect(history.location.pathname).toBe('/foods/52904/in-progress');

    history.push('/drinks/11007');

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const startRecipeButton2 = screen.getByRole('button', { name: /start recipe/i });
    expect(startRecipeButton2).toBeInTheDocument();
    userEvent.click(startRecipeButton2);
    expect(history.location.pathname).toBe('/drinks/11007/in-progress');

    history.goBack();

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const continueRecipeButton = screen.getByRole('button', { name: /continue recipe/i });
    expect(continueRecipeButton).toBeInTheDocument();
    userEvent.click(continueRecipeButton);

    const doneRecipe = [{
      alcoholicOrNot: "Alcoholic",
      category: "Ordinary Drink",
      id: "11007",
      image: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
      name: "Margarita",
      nationality: "",
      type: "drink",
    }];

    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));

    history.goBack();

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

    const disabledButton = screen.getByRole('button', { name: /continue recipe/i });
    expect(disabledButton).toBeInTheDocument();
  });
});
