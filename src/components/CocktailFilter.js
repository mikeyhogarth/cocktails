import React from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { withStyles } from "@material-ui/core/styles";
import map from "lodash/map";

const styles = theme => ({
  filter: {
    ...theme.mixins.gutters,
    justifyContent: "center",
    padding: "2em 8em"
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

const CocktailFilter = ({ allIngredients, classes }) => {
  return (
    <div className={classes.filter}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Ingredients</FormLabel>
        <RadioGroup value="and" className={classes.radioGroup}>
          <FormControlLabel
            value="and"
            control={<Radio />}
            label="Must Include..."
          />
          <FormControlLabel
            value="or"
            control={<Radio />}
            label="Can Include..."
          />
        </RadioGroup>
      </FormControl>
      <div>
        {map(allIngredients, (ingredientDetail, ingredientName) => {
          return <Chip label={ingredientName} className={classes.chip} />;
        })}
      </div>
    </div>
  );
};

export default withStyles(styles)(CocktailFilter);
