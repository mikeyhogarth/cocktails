import React from "react";
import CocktailItem from "./CocktailItem";
import { GridList, Typography, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import BadMood from "@material-ui/icons/MoodBad";

const styles = theme => ({
  content: {
    paddingTop: "1em",
    paddingBottom: "1em"
  },
  gridList: {
    justifyContent: "center"
  }
});

const CocktailList = ({ classes, cocktails = [] }) => {
  return (
    <div>
      <div className={classes.content}>
        {cocktails.length > 0 && (
          <GridList spacing={0} className={classes.gridList}>
            {cocktails.map(cocktail => (
              <CocktailItem key={cocktail.name} cocktail={cocktail} />
            ))}
          </GridList>
        )}
        {!cocktails.length && (
          <Paper
            style={{
              textAlign: "center",
              fontSize: "2em",
              padding: "1em"
            }}
          >
            <BadMood />
            <Typography gutterBottom>No results</Typography>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(CocktailList);
