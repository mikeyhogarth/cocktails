import compact from "lodash/compact";
import isArray from "lodash/isArray";
import { buildFilter } from "../filterConfig";
import * as rules from "./filterRules";

/**
 * Apply a single filter to a set of cocktails
 * @param {*} cocktails
 * @param {*} filter
 */
export function applyFilter(cocktails, filter) {
  return cocktails.filter(cocktail => {
    return rules[filter.rule.toString()](cocktail, filter);
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
export function filtersFromUserOptions(state) {
  const { filterOptions, ...otherState } = state;

  // Build initial filters based on the current "activeFilters"
  const filters = filterOptions.activeFilters.map(filterRule => {
    return buildFilter(filterRule)(filterOptions, otherState);
  });

  // Add in the special "Name filter", which is a filter but not in the
  // typical sense (so, it's not on the menu for example)
  if (filterOptions.nameFilter) {
    filters.push({
      rule: "nameIncludes",
      searchText: filterOptions.nameFilter
    });
  }

  return filters;
}
