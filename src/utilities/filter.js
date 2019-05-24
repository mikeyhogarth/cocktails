import compact from "lodash/compact";
import { arrayContainsArray } from "./util";

export function applyFilter(cocktails, filter) {
  return cocktails.filter(cocktail => {
    const cocktailIngredients = compact(
      cocktail.ingredients.map(i => i.ingredient)
    );

    // cocktail will be returned if it includes all of the ingredients
    // in the filter - NONE can be missing.
    if (filter.rule === "makeableFrom") {
      if (filter.ingredients.length === 0) return false;
      return arrayContainsArray(filter.ingredients, cocktailIngredients);
    }

    // cocktail will be returned if it includes all of the
    // ingredients in the filter - SOME can be missing.
    if (filter.rule === "mustInclude") {
      if (filter.ingredients.length === 0) return true;
      return arrayContainsArray(cocktailIngredients, filter.ingredients);
    }

    // cocktail will be returned if it contains any of the
    // ingredients from the filter.
    if (filter.rule === "canInclude") {
      if (filter.ingredients.length === 0) return true;
      return cocktailIngredients.some(i => {
        return filter.ingredients.includes(i);
      });
    }

    return false;
  });
}

export async function applyFilters(cocktails, filters = []) {
  if (!filters.length) filters = [filters];

  let results = [...cocktails];
  compact(filters).forEach(filter => {
    results = [...applyFilter(results, filter)];
  });
  return results;
}
