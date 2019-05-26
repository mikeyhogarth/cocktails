import compact from "lodash/compact";
import isArray from "lodash/isArray";
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
  if (!isArray(filters)) filters = [filters];

  return compact(filters).reduce(
    (acc, filter) => [...applyFilter(acc, filter)],
    [...cocktails]
  );
}
