import { createSelector } from "reselect";
import { uniq, compact } from "lodash";

import {
  applyFilters,
  applyFilter,
  filtersFromUserOptions
} from "../utilities/filter";

// TODO: Use these in the `mapStateToProps` functions accross application
// rather than accessing state directly?
const allCocktailsSelector = state => state.db.cocktails;
const barSelector = state => state.bar;
const filterOptionsSelector = state => state.filterOptions;
const currentSlugSelector = (_, props) => props.match.params.slug;

// filtersSelector
// Derives the currently applied filters
const filtersSelector = createSelector(
  filterOptionsSelector,
  barSelector,
  (filterOptions, bar) => filtersFromUserOptions(filterOptions, bar)
);

export const currentCocktailSelector = createSelector(
  allCocktailsSelector,
  currentSlugSelector,
  (cocktails, slug) => cocktails.find(c => c.slug === slug)
);

// filteredCocktailsSelector
// Derives the currently filtered cocktails
export const filteredCocktailsSelector = createSelector(
  allCocktailsSelector,
  filtersSelector,
  (cocktails, filter) =>
    applyFilters(cocktails, filter).sort((a, b) => (a.name > b.name ? 1 : -1))
);

// makeableCocktailsSelector
// Derives the currently makeable cocktails based on bar contents
export const makeableCocktailsSelector = createSelector(
  allCocktailsSelector,
  barSelector,
  (cocktails, bar) =>
    applyFilter(cocktails, {
      rule: "makeableFrom",
      ingredients: bar
    })
);

// allGlassesSelector
// Derives an array of all the glass types
export const allGlassesSelector = createSelector(
  allCocktailsSelector,
  cocktails => compact(uniq(cocktails.map(c => c.glass)))
);

// allCategoriesSelector
// Derives an array of all the categories
export const allCategoriesSelector = createSelector(
  allCocktailsSelector,
  cocktails => compact(uniq(cocktails.map(c => c.category)))
);
