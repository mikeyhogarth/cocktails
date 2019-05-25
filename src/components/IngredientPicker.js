import React from "react";
import Chip from "@material-ui/core/Chip";
import remove from "lodash/remove";
import map from "lodash/map";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

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
              } else {
                onIngredientsChange([...selectedIngredients, ingredientName]);
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

const mapStateToProps = state => ({
  allIngredients: state.db.ingredients
});

export default connect(mapStateToProps)(withStyles(styles)(IngredientPicker));
