import cocktails from "../data/cocktails.json";
import ingredients from "../data/ingredients.json";
import isArray from "lodash/isArray";

export function fetchCocktails() {
  return Promise.resolve(
    cocktails.map(cocktail => {
      // calculate the slug
      cocktail.slug = cocktail.name.toLowerCase().replace(/ /, "-");

      // force colors to be an array
      cocktail.colors = isArray(cocktail.colors)
        ? cocktail.colors
        : [cocktail.colors];

      return cocktail;
    })
  );
}

export function fetchIngredients() {
  return Promise.resolve(ingredients);
}
