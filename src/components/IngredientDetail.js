import React from "react";
import { Tooltip } from "@material-ui/core";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import compact from "lodash/compact";

const styles = {
  tooltip: {
    cursor: "pointer"
  }
};

const IngredientDetail = function({ item, classes }) {
  const allIngredients = useSelector(state => state.db.ingredients);

  if (item.special) return <span>{item.special}</span>;

  const { taste, abv } = allIngredients[item.ingredient] || {};

  const toolTipContent = [];
  toolTipContent.push(abv > 0 ? abv + "% abv" : "Non-alcoholic");
  toolTipContent.push(taste);

  return (
    <span>
      {item.amount} {item.unit}{" "}
      <Tooltip
        className={classes.tooltip}
        title={compact(toolTipContent).join(", ")}
        placement="top"
      >
        <strong>{item.label || item.ingredient}</strong>
      </Tooltip>
    </span>
  );
};

export default withStyles(styles)(IngredientDetail);
