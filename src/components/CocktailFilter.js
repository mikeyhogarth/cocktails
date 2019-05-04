import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import IngredientPicker from "./IngredientPicker";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Paper from "@material-ui/core/Paper";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  filter: {
    ...theme.mixins.gutters,
    justifyContent: "center",
    padding: "1em 2em"
  },
  heading: {
    fontSize: 16
  },
  radioGroup: {
    display: "inline-block"
  }
});

const CocktailFilter = ({
  setFilter,
  filter: { conjunction, selectedIngredients, barOnly },
  allIngredients,
  classes
}) => {
  return (
    <Paper square={true} elevation={24} className={classes.filter}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={barOnly}
                onChange={e => setFilter({ barOnly: !barOnly })}
                value={barOnly}
              />
            }
            label="Only include things I can make from my bar"
          />
        </FormGroup>

        <FormLabel component="legend">Ingredients</FormLabel>
        <RadioGroup value={conjunction} className={classes.radioGroup}>
          <FormControlLabel
            value="and"
            control={<Radio />}
            label="Must Include all of the following..."
            onClick={e => setFilter({ conjunction: "and" })}
          />
          <FormControlLabel
            value="or"
            control={<Radio />}
            label="Can Include any of the following..."
            onClick={e => setFilter({ conjunction: "or" })}
          />
        </RadioGroup>
      </FormControl>

      <IngredientPicker
        selectedIngredients={selectedIngredients}
        allIngredients={allIngredients}
        onIngredientsChange={selectedIngredients => {
          setFilter({ selectedIngredients });
        }}
      />
    </Paper>
  );
};

export default withStyles(styles)(CocktailFilter);
