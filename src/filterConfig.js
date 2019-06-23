import { keys, get } from "lodash";

import {
  GlassFilterDialog,
  CategoryFilterDialog,
  IngredientFilterDialog
} from "./components/Filters";

const filterConfig = {
  byIngredient: {
    dialogComponent: IngredientFilterDialog,
    label: "By Ingredient..."
  },
  byCategory: {
    dialogComponent: CategoryFilterDialog,
    label: "By Category..."
  },
  byGlass: {
    dialogComponent: GlassFilterDialog,
    label: "By Glass..."
  },
  barOnly: {
    label: "Makeable from Bar"
  },
  favouritesOnly: {
    label: "Favourites only"
  },
  veganOnly: {
    label: "Vegan only"
  },
  ibaOnly: {
    label: "IBA only"
  }
};

export default filterConfig;

function getFilter(filterRule) {
  return filterConfig[filterRule && filterRule.toString()];
}

export function labelFor(filterRule) {
  return get(getFilter(filterRule), "label");
}

export function dialogFor(filterRule) {
  return get(getFilter(filterRule), "dialogComponent");
}

export function isEditable(filterRule) {
  return !!dialogFor(filterRule);
}

export function getRules() {
  return keys(filterConfig);
}
