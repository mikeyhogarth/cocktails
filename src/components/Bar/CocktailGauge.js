import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { applyFilter } from "../../utilities/filter";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { withTheme } from "@material-ui/core/styles";

const styles = theme => ({
  progressBar: {
    padding: "0 2em",
    fontFamily: "Roboto"
  }
});

const CocktailGauge = ({ allCocktails, bar, classes, theme }) => {
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

  const totalCocktailCount = allCocktails.length;
  const makeableCocktailCount = applyFilter(allCocktails, {
    rule: "makeableFrom",
    ingredients: bar
  }).length;

  return (
    <div>
      <Typography color="inherit">
        <h4>Cocktail Gauge</h4>
      </Typography>
      <Typography color="inherit">
        <p>How many cocktails can you make with what's in your bar?</p>
      </Typography>
      <CircularProgressbar
        styles={progressBarStyles}
        className={classes.progressBar}
        value={makeableCocktailCount}
        maxValue={totalCocktailCount}
        text={makeableCocktailCount || "0"}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  allCocktails: state.db.cocktails,
  bar: state.bar
});

export default connect(mapStateToProps)(
  withTheme()(withStyles(styles)(CocktailGauge))
);
