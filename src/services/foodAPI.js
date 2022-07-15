const DETAILS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const fetchFoodDetails = async (foodId) => {
  const response = await fetch(`${DETAILS_ENDPOINT}${foodId}`);
  const foodDetails = await response.json();
  return foodDetails.meals[0];
};

module.exports = { fetchFoodDetails };
