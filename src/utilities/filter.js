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
// builds an array of filters based on the users current filter options.
export function filtersFromUserOptions(userFilterOptions, bar) {
  const filters = [];

  // the option about whether to include all/some ingredients
  filters.push({
    rule: userFilterOptions.ingredientsRule,
    ingredients: userFilterOptions.ingredients
  });

  // the option as to whether to only show stuff that is makeable from the bar
  if (userFilterOptions.barOnly)
    filters.push({ rule: "makeableFrom", ingredients: bar });

  return filters;
}
