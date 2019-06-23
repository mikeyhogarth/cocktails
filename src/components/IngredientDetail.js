import React from "react";
import { Tooltip } from "@material-ui/core";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import compact from "lodash/compact";
import { createMeasurementString } from "../utilities/cocktail.utils";
const styles = {
  tooltip: {
    cursor: "pointer"
  }
};

const IngredientDetail = ({
  item,
  units,
  useLingo,
  allIngredients,
  classes
}) => {
  if (item.special) return <span>{item.special}</span>;

  const { taste, abv, vegan } = allIngredients[item.ingredient] || {};

  const toolTipContent = [];
  toolTipContent.push(abv > 0 ? abv + "% abv" : "Non-alcoholic");
  toolTipContent.push(vegan === false ? "Non-Vegan" : "");
  toolTipContent.push(taste);

  return (
    <span>
      {item.unit === "cl"
        ? createMeasurementString(item.amount, units, useLingo)
        : item.amount}{" "}
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

const mapStateToProps = state => ({
  allIngredients: state.db.ingredients,
  units: state.settings.units,
  useLingo: state.settings.lingo
});

export default withStyles(styles)(connect(mapStateToProps)(IngredientDetail));
