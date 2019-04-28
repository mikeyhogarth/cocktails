import React from "react";

export default function({ item }) {
  if (item.special) return <span>{item.special}</span>;
  else
    return (
      <span>
        {item.amount} {item.unit}{" "}
        <strong>{item.label || item.ingredient}</strong>
      </span>
    );
}
