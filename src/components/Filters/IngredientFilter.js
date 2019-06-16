import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  DialogContent,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button
} from "@material-ui/core";

import IngredientPicker from "../IngredientPicker";
import { updateFilter } from "../../actions";

const GlassFilter = ({
  ingredientsRule,
  selectedIngredients,
  updateFilter
}) => {
  return (
    <DialogContent>
      <RadioGroup value={ingredientsRule}>
        <FormControlLabel
          value="mustInclude"
          control={<Radio />}
          label="Must Include all of the following..."
          onClick={e =>
            ingredientsRule !== "mustInclude" &&
            updateFilter({ ingredientsRule: "mustInclude" })
          }
        />
        <FormControlLabel
          value="canInclude"
          control={<Radio />}
          label="Can Include any of the following..."
          onClick={e =>
            ingredientsRule !== "canInclude" &&
            updateFilter({ ingredientsRule: "canInclude" })
          }
        />
      </RadioGroup>

      <FormControl component="fieldset">
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
      </FormControl>
    </DialogContent>
  );
};

const mapStateToProps = state => ({
  selectedIngredients: state.filterOptions.ingredients,
  ingredientsRule: state.filterOptions.ingredientsRule
});

const mapDispatchToProps = dispatch => ({
  updateFilter: bindActionCreators(updateFilter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlassFilter);
