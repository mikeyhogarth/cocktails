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
  byIngredient: "By ingredient...",
  byCategory: "By Category...",
  byGlass: "By Glass...",
  veganOnly: "Vegan",
  barOnly: "Makeable from Bar"
};

export function labelFor(filterRule) {
  return filterLabelLookup[filterRule && filterRule.toString()];
}

export function dialogFor(filterRule) {
  return filterComponentMap[filterRule && filterRule.toString()];
}
