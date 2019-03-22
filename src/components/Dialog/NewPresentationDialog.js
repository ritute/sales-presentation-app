import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { hideDialog } from '../../actions/dialog';
import { createPresentation } from '../../actions/presentations';

class NewPresentationDialog extends Component {
  state = {
    title: '',
    isCreateDisabled: true,
  };

  handleChange = (event) => {
    const newTitle = event.target.value;
    this.setState({
      ...this.state,
      title: newTitle,
      isCreateDisabled: isEmpty(newTitle)
    });
  };

  handleCreate = (event) => {
    event.preventDefault();
    this.props.createPresentation(this.state.title)
      .then(this.props.hideDialog)
      .then(this.props.onCreate);
  };

  render() {
    const { hideDialog } = this.props;

    return (
      <Dialog
        onClose={hideDialog}
        fullWidth={true}
        maxWidth="sm"
        aria-labelledby="form-dialog-title"
        open={true}
      >
        <DialogTitle id="form-dialog-title">Create Presentation</DialogTitle>
        <form noValidate onSubmit={this.handleCreate}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="presentation-title"
              label="Title"
              type="text"
              onChange={this.handleChange}
              value={this.state.title}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideDialog} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={this.state.isCreateDisabled}
            >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

NewPresentationDialog.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  hideDialog,
  createPresentation
};

export default compose(
  connect(null, mapDispatchToProps)
)(NewPresentationDialog);
