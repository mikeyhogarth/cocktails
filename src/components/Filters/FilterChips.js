import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import { removeOrAddItemFromArray } from "../../utilities/util";
import { updateFilter } from "../../actions";

const styles = theme => ({
  chip: {
    margin: theme.spacing(1)
  }
});

const FilterChips = ({
  classes,
  updateFilter,
  filterOptions: { activeFilters }
}) => {
  return (
    <>
      {activeFilters.map(activeFilter => {
        return (
          <Chip
            key={activeFilter}
            label={activeFilter}
            onClick={() => updateFilter({ editingFilter: activeFilter })}
            onDelete={() =>
              updateFilter({
                activeFilters: removeOrAddItemFromArray(
                  activeFilter,
                  activeFilters
                )
              })
            }
            className={classes.chip}
          />
        );
      })}
    </>
  );
};

const mapStateToProps = state => ({
  filterOptions: state.filterOptions
});

const mapDispatchToProps = dispatch => ({
  updateFilter: bindActionCreators(updateFilter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterChips));
