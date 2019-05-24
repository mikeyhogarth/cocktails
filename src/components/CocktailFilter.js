import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import IngredientPicker from "./IngredientPicker";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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
            label={
              <span>
                Only include drinks I can make from{" "}
                <Link to="/my-bar">my bar</Link>
              </span>
            }
          />
        </FormGroup>

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
      <Button
        color="secondary"
        onClick={() => {
          setFilter({ selectedIngredients: [] });
        }}
      >
        Clear Ingredients
      </Button>
    </Paper>
  );
};

export default withStyles(styles)(CocktailFilter);
