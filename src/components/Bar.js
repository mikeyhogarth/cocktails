import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PopularIngredients from "./Bar/PopularIngredients";
import CocktailGauge from "./Bar/CocktailGauge";

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
    justifyContent: "center",
    padding: "2em 4em"
  }
});

const EditBar = ({ classes, bar, setBar }) => {
  return (
    <div className={classes.root}>
      <Paper className={classes.explanation}>
        <Typography color="inherit">
          <h2>Your Bar</h2>
        </Typography>
        <Typography color="inherit">
          <p>
            Currently these selections are not persisted (so if you refresh your
            page or leave and come back, you'll need to set them up again). What
            this gives you is the ability to say what you have in, then back on
            the cocktail browser you can set the filter to only show you things
            you can make.
          </p>
        </Typography>

        <Typography color="inherit">
          <p>
            <strong>Select the ingredients you have in your bar...</strong>
          </p>
        </Typography>

        <IngredientPicker
          selectedIngredients={bar}
          onIngredientsChange={selectedIngredients => {
            setBar(selectedIngredients);
          }}
        />
        <br />

        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={6}>
            <CocktailGauge />
          </Grid>
          <Grid item xs={6}>
            <PopularIngredients />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = state => ({
  bar: state.bar
});

const mapDispatchToProps = dispatch => ({
  setBar: bindActionCreators(setBar, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditBar));
