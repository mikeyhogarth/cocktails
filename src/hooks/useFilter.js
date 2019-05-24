import { useState } from "react";

export default function(filterOptions) {
  const [filter, setFilter] = useState({
    ingredients: [],
    rule: "mustInclude",
    barOnly: false
  });

  return [
    filter,
    newFilterOptions => {
      setFilter({ ...filter, ...newFilterOptions });
    }
  ];
}
