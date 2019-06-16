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

import { allGlassesSelector } from "../../selectors";
import { updateFilter } from "../../actions";
import { removeOrAddItemFromArray } from "../../utilities/util";

const GlassFilter = ({ glasses, allGlasses, updateFilter }) => {
  return (
    <DialogContent>
      <FormControl component="fieldset">
        <FormLabel component="legend">Glass</FormLabel>
        <FormGroup row>
          {allGlasses.map(Glass => {
            return (
              <FormControlLabel
                key={Glass}
                control={
                  <Checkbox
                    checked={glasses.includes(Glass)}
                    onChange={() =>
                      updateFilter({
                        glasses: removeOrAddItemFromArray(Glass, glasses)
                      })
                    }
                    value="checkedB"
                    color="primary"
                  />
                }
                label={Glass}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </DialogContent>
  );
};

const mapStateToProps = state => ({
  glasses: state.filterOptions.glasses,
  allGlasses: allGlassesSelector(state)
});

const mapDispatchToProps = dispatch => ({
  updateFilter: bindActionCreators(updateFilter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlassFilter);
