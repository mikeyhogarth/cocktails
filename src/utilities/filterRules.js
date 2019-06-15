import { arrayContainsArray } from "./util";

/**
 * Cocktail filtering rules
 *
 * each rule basically needs to return 'true' if the cocktail should
 * be returned.
 *
 */

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
  return cocktailIngredients.some(i => filterIngredients.includes(i));
}

// cocktail will be returned if it contains NONE of the ingredients
// from the filter.
export function mustNotInclude(filterIngredients, cocktailIngredients) {
  return !canInclude(filterIngredients, cocktailIngredients);
}

export function inGlass(glasses, cocktail) {
  return glasses.includes(cocktail.glass);
}

export function inCategory(categories, cocktail) {
  return categories.includes(cocktail.category);
}
