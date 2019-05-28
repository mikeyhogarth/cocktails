import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  tooltip: {
    cursor: "pointer"
  }
};

const IngredientDetail = function({ item, allIngredients, classes }) {
  if (item.special) return <span>{item.special}</span>;
  else {
    const { taste, abv } = allIngredients[item.ingredient] || {};
    const toolTipContent = [];
    if (abv > 0) {
      toolTipContent.push(abv + "% abv");
    } else {
      toolTipContent.push("Non-alcoholic");
    }
    if (taste) toolTipContent.push(taste);

    return (
      <span>
        {item.amount} {item.unit}{" "}
        <Tooltip
          className={classes.tooltip}
          title={toolTipContent.join(", ")}
          placement="top"
        >
          <strong>{item.label || item.ingredient}</strong>
        </Tooltip>
      </span>
    );
  }
};

const mapStateToProps = state => ({
  allIngredients: state.db.ingredients
});

export default withStyles(styles)(connect(mapStateToProps)(IngredientDetail));
