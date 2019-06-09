import React from "react";
import Chip from "@material-ui/core/Chip";
import { removeOrAddItemFromArray } from "../utilities/util";
import map from "lodash/map";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const styles = theme => ({
  chip: {
    margin: theme.spacing() / 2
  }
});

const IngredientPicker = ({
  allIngredients,
  selectedIngredients,
  onIngredientsChange,
  classes
}) => {
  return (
    <div>
      {map(allIngredients, (ingredientDetail, ingredientName) => {
        return (
          <Chip
            key={ingredientName}
            color={
              selectedIngredients.includes(ingredientName)
                ? "primary"
                : "default"
            }
            onClick={e => {
              onIngredientsChange(
                removeOrAddItemFromArray(ingredientName, selectedIngredients)
              );
            }}
            label={ingredientName}
            className={classes.chip}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  allIngredients: state.db.ingredients
});

export default connect(mapStateToProps)(withStyles(styles)(IngredientPicker));
