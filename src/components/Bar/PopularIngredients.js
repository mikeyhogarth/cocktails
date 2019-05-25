import React from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { countIngredients } from "../../utilities/cocktail.utils";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "../../../../../Library/Caches/typescript/3.4.5/node_modules/redux";
import { addToBar } from "../../actions";

const styles = theme => ({
  button: {
    marginLeft: theme.spacing.unit
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
      <Typography color="inherit">
        <h4>Popular Ingredients</h4>
      </Typography>
      <Typography color="inherit">
        <p>These are popular ingredients not currently in your bar.</p>
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
              <TableCell component="th" scope="row">
                {row.name}
                <IconButton
                  className={classes.button}
                  onClick={() => addToBar(row.name)}
                  color="primary"
                  aria-label="Add"
                >
                  <AddIcon />
                </IconButton>
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
