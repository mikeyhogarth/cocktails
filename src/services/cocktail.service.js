import cocktails from "../data/cocktails.json";
import ingredients from "../data/ingredients.json";

export function fetchCocktails() {
  return Promise.resolve(cocktails);
}

export function fetchIngredients() {
  return Promise.resolve(ingredients);
}
