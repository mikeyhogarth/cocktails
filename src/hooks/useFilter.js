import { useState } from "react";

export default function(filterOptions) {
  const [filter, setFilter] = useState({
    selectedIngredients: [],
    conjunction: "and",
    barOnly: false
  });

  return [
    filter,
    newFilterOptions => {
      setFilter({ ...filter, ...newFilterOptions });
    }
  ];
}
