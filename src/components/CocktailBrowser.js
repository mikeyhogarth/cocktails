import React from "react";
import { connect } from "react-redux";
import CocktailList from "./CocktailList";
import CocktailFilter from "./CocktailFilter";
import { filteredCocktailsSelector } from "../selectors";

const CocktailBrowser = ({ filteredCocktails }) => (
  <div>
    <CocktailFilter />
    <CocktailList cocktails={filteredCocktails} />
  </div>
);

const mapStateToProps = state => ({
  filteredCocktails: filteredCocktailsSelector(state)
});

export default connect(mapStateToProps)(CocktailBrowser);
