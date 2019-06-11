import React from "react";
import { Chip } from "@material-ui/core";
import { removeOrAddItemFromArray } from "../utilities/util";
import map from "lodash/map";
import { withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const styles = theme => ({
  chip: {
    margin: theme.spacing() / 2
  }
});

const IngredientPicker = ({
  selectedIngredients,
  onIngredientsChange,
  classes
}) => {
  const allIngredients = useSelector(state => state.db.ingredients);

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

export default withStyles(styles)(IngredientPicker);
