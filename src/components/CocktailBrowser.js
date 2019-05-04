import React from "react";
import CocktailList from "./CocktailList";
import CocktailFilter from "./CocktailFilter";

export default function({ allCocktails, allIngredients, filter, setFilter }) {
  return (
    <div>
      <CocktailFilter
        allIngredients={allIngredients}
        filter={filter}
        setFilter={setFilter}
      />

      <CocktailList filter={filter} cocktails={allCocktails} />
    </div>
  );
}
