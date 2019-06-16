import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  DialogContent,
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

import { allCategoriesSelector } from "../../selectors";
import { updateFilter } from "../../actions";
import { removeOrAddItemFromArray } from "../../utilities/util";

const CategoryFilter = ({ categories, allCategories, updateFilter }) => {
  return (
    <DialogContent>
      <FormControl component="fieldset">
        <FormLabel component="legend">Category</FormLabel>
        <FormGroup row>
          {allCategories.map(category => {
            return (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={categories.includes(category)}
                    onChange={() =>
                      updateFilter({
                        categories: removeOrAddItemFromArray(
                          category,
                          categories
                        )
                      })
                    }
                    value="checkedB"
                    color="primary"
                  />
                }
                label={category}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </DialogContent>
  );
};

const mapStateToProps = state => ({
  categories: state.filterOptions.categories,
  allCategories: allCategoriesSelector(state)
});

const mapDispatchToProps = dispatch => ({
  updateFilter: bindActionCreators(updateFilter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryFilter);
