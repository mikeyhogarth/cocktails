import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  Button
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateFilter, setEditingFilter } from "../../actions";
import CloseIcon from "@material-ui/icons/Close";
import { dialogFor, labelFor } from "../../utilities/filter.utils";

const styles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const FilterDialog = ({
  classes,
  setEditingFilter,
  filterOptions: { editingFilter }
}) => {
  function handleCloseDialog() {
    setEditingFilter(null);
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
          {labelFor(editingFilter)}
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
  updateFilter: bindActionCreators(updateFilter, dispatch),
  setEditingFilter: bindActionCreators(setEditingFilter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FilterDialog));
