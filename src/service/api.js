export async function getFood() {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const data = await (await fetch(url)).json();
  return data;
}

export async function getDrink() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const data = await (await fetch(url)).json();
  return data;
}

export async function getFoodCategories() {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const data = await (await fetch(url)).json();
  return data;
}

export async function getDrinkCategories() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const data = await (await fetch(url)).json();
  return data;
}

export async function getSpecificMeal(meal) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`;
  const data = await (await fetch(url)).json();
  return data;
}

export async function getSpecificDrink(drink) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drink}`;
  const data = await (await fetch(url)).json();
  return data;
}
