import { arrayContainsArray } from "./util";

/**
 * Cocktail filtering rules
 *
 * each rule basically needs to return 'true' if the cocktail should
 * be returned.
 *
 */

export function nameIncludes(cocktailName, searchText) {
  return cocktailName.toLowerCase().includes(searchText.toLowerCase());
}

// cocktail will be returned if the passed-in property is truthy
export function mustHaveTruthyProperty(cocktail, property) {
  return !!cocktail[property.toString()];
}

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
  return glasses.length === 0 || glasses.includes(cocktail.glass);
}

export function inCategory(categories, cocktail) {
  return categories.length === 0 || categories.includes(cocktail.category);
}

export function isFavourite(favourites, cocktail) {
  return favourites.includes(cocktail.slug);
}
