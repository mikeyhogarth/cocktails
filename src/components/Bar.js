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
    justifyContent: "center"
  }
});

const EditBar = ({ classes, bar, setBar }) => {
  return (
    <div className={classes.root}>
      <Paper className={classes.explanation}>
        <Typography variant="h2" color="inherit" gutterBottom>
          Your Bar
        </Typography>
        <Typography component="p" color="inherit" paragraph>
          Currently these selections are not persisted (so if you refresh your
          page or leave and come back, you'll need to set them up again). What
          this gives you is the ability to say what you have in, then back on
          the cocktail browser you can set the filter to only show you things
          you can make.
        </Typography>

        <Typography color="inherit" component="p" paragraph>
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
          <Grid item md={4} xs={12}>
            <CocktailGauge />
          </Grid>
          <Grid item md={8} xs={12}>
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
