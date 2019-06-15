import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeableCocktailsSelector } from "../../selectors";

const styles = theme => ({
  title: {
    fontSize: "1.5rem",
    margin: "1rem 0"
  },
  list: {
    maxHeight: "20rem",
    overflowY: "scroll"
  }
});

const MakeableCocktails = ({ makeableCocktails, classes }) => {
  return (
    <div>
      <Typography variant="h3" className={classes.title} gutterBottom>
        Makeable Cocktails
      </Typography>
      <Typography component="p" paragraph>
        These are the cocktails you can make...
      </Typography>
      <List className={classes.list}>
        {makeableCocktails.map(cocktail => (
          <ListItem
            button
            key={cocktail.name}
            component={Link}
            to={`/cocktails/${cocktail.slug}`}
          >
            <ListItemText primary={cocktail.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const mapStateToProps = state => ({
  makeableCocktails: makeableCocktailsSelector(state)
});

export default connect(mapStateToProps)(withStyles(styles)(MakeableCocktails));
