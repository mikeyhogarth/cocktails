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
  filter: { rule, ingredients: selectedIngredients, barOnly },
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

        <RadioGroup value={rule} className={classes.radioGroup}>
          <FormControlLabel
            value="mustInclude"
            control={<Radio />}
            label="Must Include all of the following..."
            onClick={e =>
              rule !== "mustInclude" && setFilter({ rule: "mustInclude" })
            }
          />
          <FormControlLabel
            value="canInclude"
            control={<Radio />}
            label="Can Include any of the following..."
            onClick={e =>
              rule !== "canInclude" && setFilter({ rule: "canInclude" })
            }
          />
        </RadioGroup>
      </FormControl>

      <IngredientPicker
        selectedIngredients={selectedIngredients}
        allIngredients={allIngredients}
        onIngredientsChange={selectedIngredients => {
          setFilter({ ingredients: selectedIngredients });
        }}
      />
      <Button
        color="secondary"
        onClick={() => {
          setFilter({ ingredients: [] });
        }}
      >
        Clear Ingredients
      </Button>
    </Paper>
  );
};

export default withStyles(styles)(CocktailFilter);
