import React from "react";
import capitalize from "lodash/capitalize";
import { withStyles } from "@material-ui/core/styles";
import ConditionalHidden from "./ConditionalHidden";
import CocktailActions from "./CocktailActions";
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table
} from "@material-ui/core";
import CocktailAvatar from "./CocktailAvatar";

const styles = () => {
  return {
    root: {
      width: "100%"
    }
  };
};

const TableView = ({ classes, displayedCocktails }) => {
  const columns = [
    {
      name: "name"
    },
    { name: "category", hideOnXS: true }
  ];

  return (
    <TableContainer className={classes.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Appearance</TableCell>
            {columns.map(column => (
              <ConditionalHidden key={column.name} hideOnXS={column.hideOnXS}>
                <TableCell>{capitalize(column.name)}</TableCell>
              </ConditionalHidden>
            ))}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedCocktails.map(cocktail => (
            <TableRow hover tabIndex={-1} key={cocktail.name}>
              <TableCell>
                <CocktailAvatar cocktail={cocktail} />
              </TableCell>
              {columns.map(column => {
                return (
                  <ConditionalHidden
                    key={column.name}
                    hideOnXS={column.hideOnXS}
                  >
                    <TableCell>{cocktail[column.name]}</TableCell>
                  </ConditionalHidden>
                );
              })}
              <TableCell align="right">
                <CocktailActions cocktail={cocktail} hideLabelOnXS={true} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withStyles(styles)(TableView);
