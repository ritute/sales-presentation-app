import React, { Component } from 'react';
import { compose } from 'recompose';
import { isEqual, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { hideDialog } from '../../actions/dialog';
import { savePresentation } from '../../actions/presentations';

class EditPresentationTitleDialog extends Component {
  state = {
    presentation: {},
    isSaveDisabled: true,
  };

  componentDidMount() {
    const { presentation } = this.props;
    this.setState({ ...this.state, presentation });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.presentation, this.state.presentation)) {
      this.setState({ ...this.state, presentation: nextProps.presentation });
    }
  }

  handleChange = (event) => {
    const title = event.target.value;
    const presentation = Object.assign({}, this.state.presentation, { title });
    this.setState({
      ...this.state,
      presentation,
      isSaveDisabled: isEmpty(title)
    });
  };

  handleSave = (event) => {
    event.preventDefault();
    this.props.savePresentation(this.state.presentation)
      .then(this.props.hideDialog)
      .then(this.props.onSave);
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
        <DialogTitle id="form-dialog-title">Edit Presentation Title</DialogTitle>
        <form noValidate onSubmit={this.handleSave}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="presentation-title"
              label="Title"
              type="text"
              onChange={this.handleChange}
              value={this.state.presentation.title}
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
              disabled={this.state.isSaveDisabled}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

EditPresentationTitleDialog.propTypes = {
  onSave: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  currentPresentationId,
  presentations: { presentationsById }
}) => ({
  presentation: presentationsById[currentPresentationId]
});

const mapDispatchToProps = {
  hideDialog,
  savePresentation
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(EditPresentationTitleDialog);
