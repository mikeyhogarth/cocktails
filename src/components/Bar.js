import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PopularIngredients from "./Bar/PopularIngredients";
import CocktailGauge from "./Bar/CocktailGauge";
import MakeableCocktails from "./Bar/MakeableCocktails";
import { applyFilter } from "../utilities/filter";

import IngredientPicker from "./IngredientPicker";
import { bindActionCreators } from "redux";
import { setBar } from "../actions";
import { connect } from "react-redux";

const styles = theme => ({
  explanation: {
    marginBottom: "1em",
    padding: "1em 2em"
  },
  root: {
    ...theme.mixins.gutters,
    justifyContent: "center"
  }
});

const EditBar = ({ classes, allCocktails, bar, setBar }) => {
  const makeableCocktails = applyFilter(allCocktails, {
    rule: "makeableFrom",
    ingredients: bar
  });

  return (
    <div className={classes.root}>
      <Paper className={classes.explanation}>
        <Typography variant="h2" gutterBottom>
          Your Bar
        </Typography>
        <Typography component="p" paragraph>
          Currently these selections are not persisted (so if you refresh your
          page or leave and come back, you'll need to set them up again). What
          this gives you is the ability to say what you have in, then back on
          the cocktail browser you can set the filter to only show you things
          you can make.
        </Typography>

        <Typography component="p" paragraph>
          <strong>Select the ingredients you have in your bar...</strong>
        </Typography>

        <IngredientPicker
          selectedIngredients={bar}
          onIngredientsChange={selectedIngredients => {
            setBar(selectedIngredients);
          }}
        />
        <br />

        <Grid container className={classes.root}>
          <Grid item md={3} xs={12}>
            <MakeableCocktails makeableCocktails={makeableCocktails} />
          </Grid>
          <Grid item md={3} xs={12}>
            <CocktailGauge makeableCocktails={makeableCocktails} />
          </Grid>
          <Grid item md={6} xs={12}>
            <PopularIngredients />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = state => ({
  bar: state.bar,
  allCocktails: state.db.cocktails
});

const mapDispatchToProps = dispatch => ({
  setBar: bindActionCreators(setBar, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditBar));
