import compact from "lodash/compact";
import isArray from "lodash/isArray";
import {
  canInclude,
  mustInclude,
  mustNotInclude,
  makeableFrom,
  inGlass,
  inCategory
} from "./filterRules";

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

    switch (filter.rule) {
      case "mustNotInclude":
        return mustNotInclude(filter.ingredients, cocktailIngredients);
      case "makeableFrom":
        return makeableFrom(filter.ingredients, cocktailIngredients);
      case "canInclude":
        return canInclude(filter.ingredients, cocktailIngredients);
      case "mustInclude":
        return mustInclude(filter.ingredients, cocktailIngredients);
      case "inGlass":
        return inGlass(filter.glasses, cocktail);
      case "inCategory":
        return inCategory(filter.categories, cocktail);
      default:
        return true;
    }
  });
}

/**
 * Apply multiple filters, one after the other
 * @param {*} cocktails
 * @param {*} filters
 */
export function applyFilters(cocktails, filters = []) {
  if (!isArray(filters)) filters = [filters];

  return compact(filters).reduce(
    (acc, filter) => [...applyFilter(acc, filter)],
    [...cocktails]
  );
}
// builds an array of filters based on the users current filter options.
export function filtersFromUserOptions(
  userFilterOptions,
  bar,
  nonVeganIngredients
) {
  const filters = [];

  // the option about whether to include all/some ingredients
  filters.push({
    rule: userFilterOptions.ingredientsRule,
    ingredients: userFilterOptions.ingredients
  });

  // the option as to whether to only show stuff that is makeable from the bar
  if (userFilterOptions.barOnly)
    filters.push({ rule: "makeableFrom", ingredients: bar });

  // the option as to whether to only show stuff that is makeable from the bar
  if (userFilterOptions.veganOnly)
    filters.push({ ingredients: nonVeganIngredients, rule: "mustNotInclude" });

  // the category option
  if (userFilterOptions.categories.length)
    filters.push({
      rule: "inCategory",
      categories: userFilterOptions.categories
    });

  // the glasses option
  if (userFilterOptions.glasses.length)
    filters.push({
      rule: "inGlass",
      glasses: userFilterOptions.glasses
    });

  return filters;
}
