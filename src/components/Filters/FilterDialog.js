import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  Button
} from "@material-ui/core";

import { GlassFilter, CategoryFilter, IngredientFilter } from "./index";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateFilter } from "../../actions";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const filterComponentMap = {
  byCategory: CategoryFilter,
  byGlass: GlassFilter,
  byIngredient: IngredientFilter
};

function dialogFor(filterRule) {
  return filterComponentMap[filterRule];
}

const FilterDialog = ({
  classes,
  updateFilter,
  filterOptions: { editingFilter }
}) => {
  function handleCloseDialog() {
    updateFilter({ editingFilter: null });
  }
  const DialogContentComponent = dialogFor(editingFilter);

  return (
    <Dialog
      open={!!editingFilter}
      onClose={handleCloseDialog}
      aria-labelledby="simple-dialog-title"
    >
      <>
        <DialogTitle id="simple-dialog-title">
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={handleCloseDialog}
          >
            <CloseIcon />
          </IconButton>
          {editingFilter}
        </DialogTitle>
        {DialogContentComponent && <DialogContentComponent />}
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  filterOptions: state.filterOptions
});

const mapDispatchToProps = dispatch => ({
  updateFilter: bindActionCreators(updateFilter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterDialog));
