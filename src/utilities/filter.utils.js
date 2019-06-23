import {
  GlassFilterDialog,
  CategoryFilterDialog,
  IngredientFilterDialog
} from "../components/Filters";

const filterComponentMap = {
  byCategory: CategoryFilterDialog,
  byGlass: GlassFilterDialog,
  byIngredient: IngredientFilterDialog
};

const filterLabelLookup = {
  byIngredient: "By Ingredient...",
  byCategory: "By Category...",
  byGlass: "By Glass...",
  barOnly: "Makeable from Bar",
  veganOnly: "Vegan only",
  ibaOnly: "IBA only",
  favouritesOnly: "Favourites only"
};

export function labelFor(filterRule) {
  return filterLabelLookup[filterRule && filterRule.toString()];
}

export function dialogFor(filterRule) {
  return filterComponentMap[filterRule && filterRule.toString()];
}

export function isEditable(filterRule) {
  return !!dialogFor(filterRule);
}
