import React from "react";
import Chip from "@material-ui/core/Chip";
import remove from "lodash/remove";
import map from "lodash/map";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2
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
              if (selectedIngredients.includes(ingredientName)) {
                remove(selectedIngredients, i => i === ingredientName);
                onIngredientsChange([...selectedIngredients]);
                /**
                  setFilter({
                  selectedIngredients: [...selectedIngredients]
                });
                */
              } else {
                onIngredientsChange([...selectedIngredients, ingredientName]);
                /**
                 * setFilter({
                  selectedIngredients: [...selectedIngredients, ingredientName]
                });
                 */
              }
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
