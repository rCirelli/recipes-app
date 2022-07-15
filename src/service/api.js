export async function getFood() {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const data = await (await fetch(url)).json();
  console.log(data);
  return data;
}

export async function getDrink() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const data = await (await fetch(url)).json();
  console.log(data);
  return data;
}
