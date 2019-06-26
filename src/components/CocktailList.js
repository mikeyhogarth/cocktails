import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import CocktailItem from "./CocktailItem";
import { GridList, Typography, Paper, Fade } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import BadMood from "@material-ui/icons/MoodBad";

const styles = theme => {
  return {
    content: {
      paddingTop: "1em",
      paddingBottom: "1em"
    },
    gridList: {
      justifyContent: "center"
    },
    noResults: {
      textAlign: "center",
      padding: theme.spacing(1)
    },
    noResutlsIcon: {
      fontSize: "10rem"
    }
  };
};
const PER_PAGE = 9;

const CocktailList = ({ classes, cocktails = [] }) => {
  const [page, setPage] = useState(0);

  const displayedCocktails = cocktails.slice(0, PER_PAGE + page * PER_PAGE);

  return (
    <div>
      <div className={classes.content}>
        {displayedCocktails.length > 0 && (
          <Fade in={displayedCocktails.length > 0}>
            <InfiniteScroll
              loadMore={setPage}
              hasMore={displayedCocktails.length < cocktails.length}
            >
              <GridList className={classes.gridList}>
                {displayedCocktails.map(cocktail => (
                  <CocktailItem key={cocktail.name} cocktail={cocktail} />
                ))}{" "}
              </GridList>
            </InfiniteScroll>
          </Fade>
        )}

        {!cocktails.length && (
          <Paper className={classes.noResults}>
            <BadMood className={classes.noResutlsIcon} />
            <Typography gutterBottom>No results</Typography>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(CocktailList);
