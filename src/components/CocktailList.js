import React from "react";
import CocktailItem from "./CocktailItem";
import GridList from "@material-ui/core/GridList";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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
          <Paper>
            <Typography gutterBottom>
              <span>No results</span>
            </Typography>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(CocktailList);
