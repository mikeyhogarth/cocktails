/**
 * Filter Config
 *
 * Stores the main filter config object and exports a bunch of
 * utility functions to help work with it. A 'filter' can exist in
 * two distinct forms;
 *
 * * An intention from the user (e.g. in their options)
 * * A filter that is ready to be applied
 *
 * In this config, the key is the "rule" and filters can have the
 * following properties;
 *
 * label: The human-readable label to display for this filter
 * dialogComponent: (optional) Dialog associated with filter
 * buildFilter: Function for constructing a filter from user options
 *
 * the `buildFilter` function of each filter config entry will be
 * passed two arguments;
 *
 * - the user filter options
 * - the rest of the state
 *
 * it should  return an object representing the filter rule to apply.
 * At the very least this needs to specify a "rule" property - this
 * will be used to determine which function to  call in `filterRules`
 * in order to actually apply the filter.
 *
 */
import { keys, get } from "lodash";

import {
  GlassFilterDialog,
  CategoryFilterDialog,
  IngredientFilterDialog
} from "./components/Filters";

/**
 * Main filter config object
 */
const filterConfig = {
  byIngredient: {
    dialogComponent: IngredientFilterDialog,
    label: "By Ingredient...",
    buildFilter: ({ ingredientsRule, ingredients }) => ({
      rule: ingredientsRule,
      ingredients
    })
  },
  byCategory: {
    dialogComponent: CategoryFilterDialog,
    label: "By Category...",
    buildFilter: ({ categories }) => ({
      rule: "inCategory",
      categories
    })
  },
  byGlass: {
    dialogComponent: GlassFilterDialog,
    label: "By Glass...",
    buildFilter: ({ glasses }) => ({
      rule: "inGlass",
      glasses
    })
  },
  barOnly: {
    label: "Makeable from Bar",
    buildFilter: (_, { bar }) => ({
      rule: "makeableFrom",
      ingredients: bar
    })
  },
  favouritesOnly: {
    label: "Favourites only",
    buildFilter: (_, { favourites }) => ({
      rule: "isFavourite",
      favourites
    })
  },
  veganOnly: {
    label: "Vegan only",
    buildFilter: () => ({
      rule: "mustHaveTruthyProperty",
      property: "vegan"
    })
  },
  ibaOnly: {
    label: "IBA only",
    buildFilter: () => ({
      rule: "mustHaveTruthyProperty",
      property: "iba"
    })
  }
};

function getFilterConfig(filterRule) {
  return filterConfig[filterRule && filterRule.toString()];
}

// Fishes out the label for a filter rule (if there is one)
export function labelFor(filterRule) {
  return get(getFilterConfig(filterRule), "label") || filterRule;
}

// Fishes out the custom dialog for a filter rule (if there is one)
export function dialogFor(filterRule) {
  return get(getFilterConfig(filterRule), "dialogComponent");
}

// Returns true if this filter rule has a custom dialog
export function hasDialog(filterRule) {
  return !!dialogFor(filterRule);
}

// HoF for building the actual filters that will be applied from
// user options.
export function buildFilter(filterRule) {
  return get(getFilterConfig(filterRule), "buildFilter");
}

// Returns a list of the rules
export function getRules() {
  return keys(filterConfig);
}
