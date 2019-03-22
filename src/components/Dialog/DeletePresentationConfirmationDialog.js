import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import { hideDialog } from '../../actions/dialog';
import { deletePresentation } from '../../actions/presentations';

const DeletePresentationConfirmationDialog = props => {
  const { hideDialog } = props;

  const handleDelete = () => {
    const { deletePresentation, hideDialog, onDeleteConfirm, id } = props;
    deletePresentation(id)
      .then(hideDialog)
      .then(() => onDeleteConfirm(id));
  };

  return (
    <Dialog
      onClose={hideDialog}
      fullWidth={true}
      maxWidth="xs"
      aria-labelledby="alert-dialog-title"
      open={true}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle id="alert-dialog-title">Delete presentation?</DialogTitle>
      <DialogActions>
        <Button onClick={hideDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeletePresentationConfirmationDialog.propTypes = {
  id: PropTypes.string.isRequired,
  onDeleteConfirm: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  hideDialog,
  deletePresentation
};

export default compose(
  connect(null, mapDispatchToProps)
)(DeletePresentationConfirmationDialog);
