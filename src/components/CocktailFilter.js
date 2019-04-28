import React from "react";
import Chip from "@material-ui/core/Chip";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import remove from "lodash/remove";

import { withStyles } from "@material-ui/core/styles";
import map from "lodash/map";

const styles = theme => ({
  filter: {
    ...theme.mixins.gutters,
    justifyContent: "center",
    padding: "2em 4em"
  },
  heading: {
    fontSize: 16
  },
  chip: {
    margin: theme.spacing.unit / 2
  },
  radioGroup: {
    display: "inline-block"
  }
});

const CocktailFilter = ({
  setConjunction,
  setIngredients,
  selectedIngredients,
  conjunction,
  allIngredients,
  classes
}) => {
  return (
    <div className={classes.filter}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Ingredients</FormLabel>
        <RadioGroup value={conjunction} className={classes.radioGroup}>
          <FormControlLabel
            value="and"
            control={<Radio />}
            label="Must Include all of the following..."
            onClick={e => setConjunction("and")}
          />
          <FormControlLabel
            value="or"
            control={<Radio />}
            label="Can Include any of the following..."
            onClick={e => setConjunction("or")}
          />
        </RadioGroup>
      </FormControl>
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
                  setIngredients([...selectedIngredients]);
                } else {
                  setIngredients([...selectedIngredients, ingredientName]);
                }
              }}
              label={ingredientName}
              className={classes.chip}
            />
          );
        })}
      </div>
    </div>
  );
};

export default withStyles(styles)(CocktailFilter);
