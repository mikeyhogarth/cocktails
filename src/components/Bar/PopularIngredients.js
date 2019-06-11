import React from "react";
import { useSelector, useDispatch } from "react-redux";
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

const PopularIngredients = ({ classes }) => {
  const dispatch = useDispatch();
  const bar = useSelector(state => state.bar);
  const allCocktails = useSelector(state => state.db.cocktails);

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
                    onClick={() => dispatch(addToBar(row.name))}
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

export default withStyles(styles)(PopularIngredients);
