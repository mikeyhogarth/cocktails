import compact from "lodash/compact";
import isArray from "lodash/isArray";
import { buildFilter } from "../filterConfig";
import {
  nameIncludes,
  isFavourite,
  canInclude,
  mustInclude,
  mustNotInclude,
  makeableFrom,
  mustHaveTruthyProperty,
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
      case "nameIncludes":
        return nameIncludes(cocktail.name, filter.text);
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
      case "isFavourite":
        return isFavourite(filter.favourites, cocktail);
      case "mustHaveTruthyProperty":
        return mustHaveTruthyProperty(cocktail, filter.property);
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
export function filtersFromUserOptions(userFilterOptions, bar, favourites) {
  // Build initial filters based on the current "activeFilters"
  const filters = userFilterOptions.activeFilters.map(filterRule => {
    return buildFilter(filterRule)(userFilterOptions, {
      bar,
      favourites
    });
  });

  // Add in the special "Name filter", which is a filter but not in the
  // typical sense (so, it's not on the menu for example)
  if (userFilterOptions.nameFilter) {
    filters.push({
      rule: "nameIncludes",
      text: userFilterOptions.nameFilter
    });
  }

  return filters;
}
