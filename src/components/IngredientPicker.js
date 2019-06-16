import React, { useState } from "react";
import { Chip, TextField, InputAdornment } from "@material-ui/core";
import { removeOrAddItemFromArray } from "../utilities/util";
import map from "lodash/map";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  chip: {
    margin: theme.spacing() / 2
  },
  searchField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  }
});

const IngredientPicker = ({
  allIngredients,
  selectedIngredients,
  onIngredientsChange,
  classes
}) => {
  const [searchTerm, updateSearchTerm] = useState(null);

  return (
    <div>
      <TextField
        id="standard-search"
        label="Filter ingredients"
        type="search"
        className={classes.searchField}
        margin="normal"
        onChange={e => updateSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      <br style={{ clear: "both" }} />
      {map(allIngredients, (ingredientDetail, ingredientName) => {
        if (
          searchTerm &&
          !ingredientName.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return null;
        }
        return (
          <Chip
            key={ingredientName}
            color={
              selectedIngredients.includes(ingredientName)
                ? "primary"
                : "default"
            }
            onClick={e => {
              onIngredientsChange(
                removeOrAddItemFromArray(ingredientName, selectedIngredients)
              );
            }}
            label={ingredientName}
            className={classes.chip}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  allIngredients: state.db.ingredients
});

export default connect(mapStateToProps)(withStyles(styles)(IngredientPicker));
