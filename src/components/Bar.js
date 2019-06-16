import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper, Grid } from "@material-ui/core";
import PopularIngredients from "./Bar/PopularIngredients";
import CocktailGauge from "./Bar/CocktailGauge";
import MakeableCocktails from "./Bar/MakeableCocktails";
import IngredientPicker from "./IngredientPicker";
import { bindActionCreators } from "redux";
import { setBar } from "../actions";
import { connect } from "react-redux";

const styles = theme => ({
  explanation: {
    padding: theme.spacing(1, 2)
  },
  root: {
    ...theme.mixins.gutters,
    justifyContent: "center"
  }
});

const EditBar = ({ classes, bar, makeableCocktails, setBar }) => {
  return (
    <div className={classes.root}>
      <Paper className={classes.explanation}>
        <Typography variant="h2" gutterBottom>
          Your Bar
        </Typography>

        <Typography component="p" paragraph>
          Select the ingredients you have in your bar...
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
            <MakeableCocktails />
          </Grid>
          <Grid item md={3} xs={12}>
            <CocktailGauge />
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
