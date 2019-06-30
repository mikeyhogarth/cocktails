import cocktails from "../data/cocktails.json";
import ingredients from "../data/ingredients.json";
import glasses from "../data/glasses.json";

import { isArray } from "lodash";

export function fetchCocktails() {
  return Promise.resolve(
    cocktails.map(cocktail => {
      // calculate the slug
      cocktail.slug = cocktail.name.toLowerCase().replace(/ /, "-");

      // calculate if the cocktail is vegan
      cocktail.vegan = !cocktail.ingredients
        .filter(i => i.ingredient)
        .some(function(i) {
          return ingredients[i.ingredient].vegan === false;
        });

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

export function fetchGlasses() {
  return Promise.resolve(glasses);
}
