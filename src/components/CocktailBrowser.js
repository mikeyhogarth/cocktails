import React from "react";
import CocktailList from "./CocktailList";
import CocktailFilter from "./CocktailFilter";
import { applyFilters } from "../utilities/filter";

export default function({
  allCocktails,
  allIngredients,
  filter,
  bar,
  setFilter
}) {
  const filteredCocktails = applyFilters(allCocktails, [
    filter.barOnly ? { rule: "makeableFrom", ingredients: bar } : null,
    filter
  ]).sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <div>
      <CocktailFilter
        allIngredients={allIngredients}
        filter={filter}
        setFilter={setFilter}
      />

      <CocktailList filter={filter} cocktails={filteredCocktails} />
    </div>
  );
}
