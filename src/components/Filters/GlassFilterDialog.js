import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { map } from "lodash";
import GlassIcon from "../GlassIcon";

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
          {map(allGlasses, (glassDetail, glassKey) => {
            return (
              <FormControlLabel
                key={glassKey}
                control={
                  <Checkbox
                    checked={glasses.includes(glassKey)}
                    onChange={() =>
                      updateFilter({
                        glasses: removeOrAddItemFromArray(glassKey, glasses)
                      })
                    }
                    value="checkedB"
                    color="primary"
                  />
                }
                label={
                  <span>
                    <GlassIcon glass={glassKey} />
                    {glassDetail.name}
                  </span>
                }
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
