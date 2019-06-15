import React from "react";
import pluralize from "pluralize";
import {
  Radio,
  RadioGroup,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Grid,
  Switch,
  Paper,
  Button,
  FormControl,
  Typography
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IngredientPicker from "./IngredientPicker";
import { updateFilter } from "../actions";
import { allGlassesSelector, allCategoriesSelector } from "../selectors";
import { removeOrAddItemFromArray } from "../utilities/util";

const styles = theme => {
  //debugger;
  return {
    filter: {
      justifyContent: "center"
    },
    filterContent: {
      padding: "1em 2em"
    },
    heading: {
      fontSize: 16
    },
    radioGroup: {
      display: "inline-block"
    },
    checkboxOptionContainer: {
      marginTop: "1.5em"
    },
    resultCount: {
      textAlign: "center",
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.getContrastText(theme.palette.secondary.light)
    }
  };
};

const CocktailFilter = ({
  filteredCocktails,
  updateFilter,
  allGlasses,
  allCategories,
  filterOptions: {
    categories,
    glasses,
    ingredientsRule,
    ingredients: selectedIngredients,
    barOnly,
    veganOnly
  },
  classes
}) => (
  <Paper square={true} elevation={24} className={classes.filter}>
    <div className={classes.filterContent}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Ingredients</FormLabel>

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
              <Typography component="span">
                Only include drinks I can make from{" "}
                <Link to="/my-bar" style={{ textDecoration: "none" }}>
                  <Typography
                    component="span"
                    color="secondary"
                    style={{ display: "inline" }}
                  >
                    my bar
                  </Typography>
                </Link>
              </Typography>
            }
          />
        </FormGroup>

        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={veganOnly}
                onChange={e => updateFilter({ veganOnly: !veganOnly })}
                value={veganOnly}
              />
            }
            label={
              <Typography component="span">
                Vegan Only
                {veganOnly && (
                  <em>
                    {" "}
                    - always check the label as some alcohol and mixers are not
                    vegan friendly.
                  </em>
                )}
              </Typography>
            }
          />
        </FormGroup>

        <RadioGroup value={ingredientsRule} className={classes.radioGroup}>
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
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
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

      <Grid container>
        <Grid item md={6} xs={12} className={classes.checkboxOptionContainer}>
          <FormControl component="fieldset" className={classes.formControl}>
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
        </Grid>
        <Grid item md={6} xs={12} className={classes.checkboxOptionContainer}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Glass</FormLabel>
            <FormGroup row>
              {allGlasses.map(glass => {
                return (
                  <FormControlLabel
                    key={glass}
                    control={
                      <Checkbox
                        checked={glasses.includes(glass)}
                        onChange={() =>
                          updateFilter({
                            glasses: removeOrAddItemFromArray(glass, glasses)
                          })
                        }
                        value="checkedB"
                        color="primary"
                      />
                    }
                    label={glass}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
    <div className={classes.resultCount}>
      <Typography gutterBottom>
        Showing {pluralize("Cocktail", filteredCocktails.length, true)}
      </Typography>
    </div>
  </Paper>
);

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
