import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import { removeOrAddItemFromArray } from "../../utilities/util";
import { updateFilter, setEditingFilter } from "../../actions";

const styles = theme => ({
  chip: {
    margin: theme.spacing(1)
  }
});

const chipContent = {
  veganOnly: () => "Vegan",
  barOnly: () => "Makeable from Bar",
  byIngredient: filterOptions => {
    if (!filterOptions.ingredients.length) {
      return "Ingredients: all";
    }
    return `Ingredients (${
      filterOptions.ingredientsRule === "mustInclude" ? "all" : "any"
    }):
      ${filterOptions.ingredients.join(", ")}`;
  },
  byGlass: filterOptions => {
    return `Glasses: ${
      filterOptions.glasses.length ? filterOptions.glasses.join(", ") : "all"
    }`;
  },
  byCategory: filterOptions => {
    return `Categories: ${
      filterOptions.categories.length
        ? filterOptions.categories.join(", ")
        : "all"
    }`;
  }
};

const FilterChips = ({
  classes,
  setEditingFilter,
  updateFilter,
  filterOptions
}) => {
  const { activeFilters } = filterOptions;
  return (
    <>
      {activeFilters.map(activeFilter => {
        return (
          <Chip
            key={activeFilter}
            label={chipContent[activeFilter.toString()](filterOptions)}
            onClick={() => setEditingFilter(activeFilter)}
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
  updateFilter: bindActionCreators(updateFilter, dispatch),
  setEditingFilter: bindActionCreators(setEditingFilter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterChips));
