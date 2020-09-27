import React, { useState } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import { Typography, Paper, Fade } from "@material-ui/core";
import CardView from "./CardView";
import TableView from "./TableView";
import { withStyles } from "@material-ui/core/styles";
import BadMood from "@material-ui/icons/MoodBad";

const styles = theme => {
  return {
    content: {
      padding: theme.spacing(1)
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

const CocktailList = ({ browserMode, classes, cocktails = [] }) => {
  const [page, setPage] = useState(0);

  const displayedCocktails = cocktails.slice(0, PER_PAGE + page * PER_PAGE);
  const View = browserMode === "card" ? CardView : TableView;
  return (
    <div>
      <div className={classes.content}>
        {displayedCocktails.length > 0 && (
          <Fade in={displayedCocktails.length > 0}>
            <InfiniteScroll
              loadMore={setPage}
              hasMore={displayedCocktails.length < cocktails.length}
            >
              <View displayedCocktails={displayedCocktails} />
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

const mapStateToProps = state => ({
  browserMode: state.settings.browserMode
});

export default withStyles(styles)(connect(mapStateToProps)(CocktailList));
