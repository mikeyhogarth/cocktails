import { useState } from "react";

export default function(filterOptions) {
  const [filter, setFilter] = useState({
    selectedIngredients: [],
    conjunction: "and"
  });

  return [
    filter,
    newFilterOptions => {
      setFilter({ ...filter, ...newFilterOptions });
    }
  ];
}
