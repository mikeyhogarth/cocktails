import React from "react";
import { Typography } from "@material-ui/core";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import { makeableCocktailsSelector } from "../../selectors";
import "react-circular-progressbar/dist/styles.css";

const styles = theme => ({
  title: {
    fontSize: "1.5rem",
    margin: "1rem 0"
  },
  progressBar: {
    padding: "0 2em",
    fontFamily: "Roboto"
  }
});

const CocktailGauge = ({ allCocktails, makeableCocktails, classes, theme }) => {
  const progressBarStyles = {
    path: {
      // Path color
      stroke: theme.palette.primary.main
    },
    trail: {
      stroke: theme.palette.grey[50]
    },
    text: {
      fill: theme.palette.primary.main
    }
  };

  return (
    <div>
      <Typography variant="h3" className={classes.title} gutterBottom>
        Cocktail Gauge
      </Typography>
      <Typography component="p" paragraph>
        How many cocktails can you make with what's in your bar?
      </Typography>

      <CircularProgressbar
        styles={progressBarStyles}
        className={classes.progressBar}
        value={makeableCocktails.length}
        maxValue={allCocktails.length}
        text={makeableCocktails.length || "0"}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  allCocktails: state.db.cocktails,
  makeableCocktails: makeableCocktailsSelector(state)
});

export default connect(mapStateToProps)(
  withTheme(withStyles(styles)(CocktailGauge))
);
