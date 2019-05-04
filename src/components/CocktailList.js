import React, { useState, useEffect } from "react";
import CocktailItem from "./CocktailItem";
import GridList from "@material-ui/core/GridList";
import { withStyles } from "@material-ui/core/styles";
import { filterCocktails } from "../utilities/cocktail.utils";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.indigo[50]
  },
  content: {
    paddingTop: "1em",
    paddingBottom: "1em"
  },
  gridList: {
    justifyContent: "center"
  },
  messageContainer: {
    textAlign: "center"
  },
  message: {
    width: "50%",
    display: "inline-block",
    justifyContent: "center",
    padding: "2em"
  }
});

const CocktailList = ({ filter, classes, cocktails = [] }) => {
  const [filteredCocktails, setFilteredCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    filterCocktails(cocktails, filter)
      .then(filteredCocktails => {
        setFilteredCocktails(filteredCocktails);
      })
      // artificial delay to prevent animation janking when changing filters
      .then(() => new Promise(resolve => setTimeout(resolve, 500)))
      .then(() => {
        setLoading(false);
      });
  }, [cocktails, filter]);

  return (
    <div className={classes.root}>
      {loading && <LinearProgress />}
      <div className={classes.content}>
        {!loading && filteredCocktails.length > 0 && (
          <GridList className={classes.gridList}>
            {filteredCocktails.map(cocktail => (
              <CocktailItem key={cocktail.name} cocktail={cocktail} />
            ))}
          </GridList>
        )}
        {!loading && !filteredCocktails.length && (
          <div className={classes.messageContainer}>
            <Paper className={classes.message}>
              <Typography gutterBottom>
                <span>Filter returned no results</span>
              </Typography>
            </Paper>
          </div>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(CocktailList);
