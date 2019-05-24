import { arrayContainsArray } from "./util";

// cocktail will be returned if it includes all of the ingredients
// in the filter - NONE can be missing.
export function makeableFrom(filterIngredients, cocktailIngredients) {
  if (filterIngredients.length === 0) return false;
  return arrayContainsArray(filterIngredients, cocktailIngredients);
}

// cocktail will be returned if it includes all of the
// ingredients in the filter - SOME can be missing.
export function mustInclude(filterIngredients, cocktailIngredients) {
  if (filterIngredients.length === 0) return true;
  return arrayContainsArray(cocktailIngredients, filterIngredients);
}

// cocktail will be returned if it contains any of the
// ingredients from the filter.
export function canInclude(filterIngredients, cocktailIngredients) {
  if (filterIngredients.length === 0) return true;
  return cocktailIngredients.some(i => {
    return filterIngredients.includes(i);
  });
}
