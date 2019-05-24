import React, { useState, useEffect } from "react";
import CocktailList from "./CocktailList";
import CocktailFilter from "./CocktailFilter";
import { applyFilters } from "../utilities/filter";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function({
  allCocktails,
  allIngredients,
  filter,
  bar,
  setFilter
}) {
  const [filteredCocktails, setFilteredCocktails] = useState(allCocktails);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    applyFilters(allCocktails, [
      filter.barOnly ? { rule: "makeableFrom", ingredients: bar } : null,
      filter
    ])
      .then(cocktails => {
        return cocktails.sort((a, b) => (a.name > b.name ? 1 : -1));
      })
      .then(cocktails => {
        setTimeout(() => {
          setFilteredCocktails(cocktails);
          setLoading(false);
        }, 500);
      });
  }, [filter, bar, allCocktails]);

  return (
    <div>
      <CocktailFilter
        allIngredients={allIngredients}
        filter={filter}
        setFilter={setFilter}
      />

      {loading && <LinearProgress />}
      {!loading && (
        <CocktailList filter={filter} cocktails={filteredCocktails} />
      )}
    </div>
  );
}
