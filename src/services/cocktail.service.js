import cocktails from "../data/cocktails.json";
import ingredients from "../data/ingredients.json";

export function fetchCocktails() {
  return Promise.resolve(
    cocktails.map(cocktail => {
      cocktail.slug = cocktail.name.toLowerCase().replace(/ /, "-");
      return cocktail;
    })
  );
}

export function fetchIngredients() {
  return Promise.resolve(ingredients);
}
