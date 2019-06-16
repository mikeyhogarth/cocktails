import React from "react";
import { Paper, Button, Menu, MenuItem } from "@material-ui/core";
import { removeOrAddItemFromArray } from "../utilities/util";
import { labelFor } from "../utilities/filter.utils";
import { FilterChips, FilterDialog } from "./Filters";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateFilter, setEditingFilter } from "../actions";
import { allGlassesSelector, allCategoriesSelector } from "../selectors";
import FilterListIcon from "@material-ui/icons/FilterList";
import { filteredCocktailsSelector } from "../selectors";
import pluralize from "pluralize";
const styles = theme => ({
  filters: {
    padding: theme.spacing(1, 0, 0, 0)
  },
  cocktailsCount: {
    textTransform: "upperCase"
  },
  filterButton: {
    float: "right",
    margin: theme.spacing(1)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  cocktailCountContainer: {
    padding: theme.spacing(0.5),
    fontWeight: "bold",
    clear: "both",
    textAlign: "center",
    textTransform: "uppercase",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.light)
  }
});

// This probably isn't the right place for this variable - we should
// have a list of filter rules stored somewhere centrally.
const filterMenuOptions = [
  { rule: "byIngredient" },
  { rule: "byCategory" },
  { rule: "byGlass" },
  { rule: "veganOnly" },
  { rule: "barOnly" }
];

const CocktailFilter = ({
  filteredCocktails,
  filterOptions: { activeFilters },
  updateFilter,
  setEditingFilter,
  classes
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function openFilterMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeFilterMenu() {
    setAnchorEl(null);
  }

  function addFilter(filter) {
    updateFilter({
      activeFilters: removeOrAddItemFromArray(filter, activeFilters)
    });
    setEditingFilter(filter);
    closeFilterMenu();
  }

  return (
    <Paper square={true} elevation={24} className={classes.filters}>
      <Button
        className={classes.filterButton}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={openFilterMenu}
      >
        <FilterListIcon />
        Add Filter
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeFilterMenu}
      >
        {filterMenuOptions.map((menuOption, idx) => {
          return (
            <MenuItem
              disabled={activeFilters.includes(menuOption.rule)}
              key={idx}
              onClick={() => addFilter(menuOption.rule)}
            >
              {labelFor(menuOption.rule)}
            </MenuItem>
          );
        })}
      </Menu>
      <FilterChips />

      <FilterDialog />

      <div className={classes.cocktailCountContainer}>
        Showing {pluralize("cocktail", filteredCocktails.length, true)}
      </div>
    </Paper>
  );
};

const mapStateToProps = state => ({
  filterOptions: state.filterOptions,
  filteredCocktails: filteredCocktailsSelector(state),
  allGlasses: allGlassesSelector(state),
  allCategories: allCategoriesSelector(state)
});

const mapDispatchToProps = dispatch => ({
  updateFilter: bindActionCreators(updateFilter, dispatch),
  setEditingFilter: bindActionCreators(setEditingFilter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CocktailFilter));
