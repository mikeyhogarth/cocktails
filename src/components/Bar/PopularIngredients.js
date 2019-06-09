import React from "react";
import { connect } from "react-redux";
import { countIngredients } from "../../utilities/cocktail.utils";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { addToBar } from "../../actions";

const styles = theme => ({
  title: {
    fontSize: "1.5rem",
    margin: "1rem 0"
  },

  cocktailNameContainer: {
    display: "flex"
  }
});

const PopularIngredients = ({ allCocktails, bar, addToBar, classes }) => {
  const counts = countIngredients(allCocktails)
    .filter(i => {
      return bar.includes(i.name) === false;
    })
    .slice(0, 5);

  return (
    <div>
      <Typography variant="h3" className={classes.title} gutterBottom>
        Popular Ingredients
      </Typography>
      <Typography component="p" paragraph>
        These are popular ingredients not currently in your bar.
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Ingredient</TableCell>
            <TableCell align="right">Appearances</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {counts.map(row => (
            <TableRow key={row.name}>
              <TableCell
                className={classes.cocktailNameContainer}
                component="th"
                scope="row"
              >
                <div>
                  <span>{row.name}</span>
                  <IconButton
                    onClick={() => addToBar(row.name)}
                    color="primary"
                    aria-label="Add"
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </TableCell>
              <TableCell align="right">{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const mapStateToProps = state => ({
  bar: state.bar,
  allCocktails: state.db.cocktails
});

const mapDispatchToProps = dispatch => ({
  addToBar: bindActionCreators(addToBar, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PopularIngredients));
