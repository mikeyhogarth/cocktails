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
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateFilter } from "../actions";

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
  updateFilter,
  filter: { rule, ingredients: selectedIngredients, barOnly },
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
                onChange={e => updateFilter({ barOnly: !barOnly })}
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
              rule !== "mustInclude" && updateFilter({ rule: "mustInclude" })
            }
          />
          <FormControlLabel
            value="canInclude"
            control={<Radio />}
            label="Can Include any of the following..."
            onClick={e =>
              rule !== "canInclude" && updateFilter({ rule: "canInclude" })
            }
          />
        </RadioGroup>
      </FormControl>

      <IngredientPicker
        selectedIngredients={selectedIngredients}
        onIngredientsChange={selectedIngredients => {
          updateFilter({ ingredients: selectedIngredients });
        }}
      />
      <Button
        color="secondary"
        onClick={() => {
          updateFilter({ ingredients: [] });
        }}
      >
        Clear Ingredients
      </Button>
    </Paper>
  );
};

const mapStateToProps = state => ({
  filter: state.filter
});

const mapDispatchToProps = dispatch => ({
  updateFilter: bindActionCreators(updateFilter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CocktailFilter));
