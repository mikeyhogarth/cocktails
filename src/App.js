import React, { useState } from "react";
import Theme from "./theme";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalBar from "@material-ui/icons/LocalBar";
import CocktailBrowser from "./components/CocktailBrowser";
import EditBar from "./components/Bar";
import useFilter from "./hooks/useFilter";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  title: {
    margin: ".3em",
    color: "white",
    fontSize: "1.5em"
  }
};

function App({ classes }) {
  const [filter, setFilter] = useFilter({});
  const [bar, setBar] = useState([]);

  return (
    <Theme>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <LocalBar />
            <Typography component="h1" className={classes.grow} color="inherit">
              <Link to="/cocktails" style={{ textDecoration: "none" }}>
                <h1 className={classes.title}>Cocktail Browser</h1>
              </Link>
            </Typography>
            <Button component={Link} to="/cocktails" color="inherit">
              Browse
            </Button>
            <Button component={Link} to="/my-bar" color="inherit">
              Bar
            </Button>
          </Toolbar>
        </AppBar>

        <Route
          exact
          path={["/", "/cocktails"]}
          render={props => (
            <CocktailBrowser bar={bar} filter={filter} setFilter={setFilter} />
          )}
        />

        <Route
          path="/my-bar"
          render={props => <EditBar bar={bar} setBar={setBar} />}
        />
      </Router>
    </Theme>
  );
}

export default withStyles(styles)(App);
