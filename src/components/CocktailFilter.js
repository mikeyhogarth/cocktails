import React from "react";
import { Paper, Button, Menu, MenuItem } from "@material-ui/core";
import { removeOrAddItemFromArray } from "../utilities/util";
import { labelFor } from "../utilities/filter.utils";
import { FilterChips, FilterDialog } from "./Filters";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateFilter } from "../actions";
import { allGlassesSelector, allCategoriesSelector } from "../selectors";
import FilterListIcon from "@material-ui/icons/FilterList";

const styles = theme => ({
  filters: {
    padding: theme.spacing(1, 1)
  },
  filterButton: {
    float: "right"
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const filterMenuOptions = [
  { rule: "byIngredient" },
  { rule: "byCategory" },
  { rule: "byGlass" },
  { rule: "veganOnly" },
  { rule: "barOnly" }
];

const CocktailFilter = ({
  filterOptions: { activeFilters, editingFilter },
  updateFilter,
  classes
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function openFilterMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeFilterMenu() {
    setAnchorEl(null);
  }

  function addFilter(rule) {
    updateFilter({
      activeFilters: removeOrAddItemFromArray(rule, activeFilters)
    });
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
            <MenuItem key={idx} onClick={() => addFilter(menuOption.rule)}>
              {labelFor(menuOption.rule)}
            </MenuItem>
          );
        })}
      </Menu>

      <FilterChips />

      <FilterDialog />

      <br style={{ clear: "both" }} />
    </Paper>
  );
};

const mapStateToProps = state => ({
  filterOptions: state.filterOptions,
  allGlasses: allGlassesSelector(state),
  allCategories: allCategoriesSelector(state)
});

const mapDispatchToProps = dispatch => ({
  updateFilter: bindActionCreators(updateFilter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CocktailFilter));
