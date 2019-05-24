import compact from "lodash/compact";
import { canInclude, mustInclude, makeableFrom } from "./filterRules";

const rules = {
  makeableFrom,
  canInclude,
  mustInclude
};

/**
 * Apply a single filter to a set of cocktails
 * @param {*} cocktails
 * @param {*} filter
 */
export function applyFilter(cocktails, filter) {
  return cocktails.filter(cocktail => {
    const cocktailIngredients = compact(
      cocktail.ingredients.map(i => i.ingredient)
    );
    return rules[filter.rule](filter.ingredients, cocktailIngredients);
  });
}

/**
 * Apply multiple filters, one after the other
 * @param {*} cocktails
 * @param {*} filters
 */
export async function applyFilters(cocktails, filters = []) {
  if (!filters.length) filters = [filters];

  let results = [...cocktails];

  // TODO: can probably use reduce here.
  compact(filters).forEach(filter => {
    // the results of each filter are passed in as the
    // things to fitler in the next one.
    results = [...applyFilter(results, filter)];
  });
  return results;
}
