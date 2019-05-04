import React from "react";
import { withStyles } from "@material-ui/core/styles";
import IngredientPicker from "./IngredientPicker";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters,
    justifyContent: "center",
    padding: "2em 4em"
  }
});

const EditBar = ({ classes, allIngredients, bar, setBar }) => {
  return (
    <div className={classes.root}>
      Edit bar
      <IngredientPicker
        allIngredients={allIngredients}
        selectedIngredients={bar}
        onIngredientsChange={selectedIngredients => {
          setBar(selectedIngredients);
        }}
      />
    </div>
  );
};

export default withStyles(styles)(EditBar);
