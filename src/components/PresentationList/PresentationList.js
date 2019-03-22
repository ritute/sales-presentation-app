import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { trackPromise} from 'react-promise-tracker';
import { withSnackbar } from 'notistack';
import { isEmpty } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import {
  fetchPresentationList,
  setCurrentPresentationId,
  deletePresentation
} from '../../actions/presentations';
import { fetchAssets } from '../../actions/assets';
import { showDialog } from '../../actions/dialog';
import { dialogs } from '../Dialog/DialogRoot';
import PresentationCardWithActionOverlay from './PresentationCardWithActionOverlay';
import LoadingSpinner from '../Status/LoadingSpinner';
import EmptyState from '../Status/EmptyState';

const styles = theme => ({
  cardGrid: {
    padding: `${theme.spacing(8)}px 0`,
    height: '100%',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    transition: 'transform .2s',
    '&:hover': {
      transform: 'scale(1.1)',
    }
  },
});

const SPINNER_AREA = 'presentation-list-area';

class PresentationList extends Component {
  state = {
    toPresentation: false,
  };

  componentDidMount() {
    trackPromise(this.props.fetchPresentationList(), SPINNER_AREA);
    trackPromise(this.props.fetchAssets(), SPINNER_AREA);
  }

  handleAdd = () => {
    this.props.showDialog(dialogs.newPresentation.type, {
      onCreate: this.onCreatePresentation
    });
  };

  onCreatePresentation = () => {
    const { presentations: { error } } = this.props;
    if (isEmpty(error)) {
      this.setState(Object.assign({}, this.state, { toPresentation: true }));
    }
  };

  onPlay = (id) => {
    const { presentations: { presentationsById } } = this.props;
    this.props.showDialog(
      dialogs.presentationPreview.type,
      { presentation: presentationsById[id], fullScreen: true }
    );
  };

  onEdit = (id) => {
    this.props.setCurrentPresentationId(id);
    this.setState(Object.assign({}, this.state, { toPresentation: true }));
  };

  onDelete = (id) => {
    this.props.showDialog(dialogs.deletePresentationConfirmation.type, {
      id,
      onDeleteConfirm: this.onDeleteConfirm
    });
  };

  onDeleteConfirm = (id) => {
    const { presentations: { error } } = this.props;
    if (isEmpty(error)) {
      this.props.enqueueSnackbar('Deleted presentation');
    }
  };

  handleEmptyState() {
    const { presentations } = this.props;
    if (!presentations.loading && isEmpty(presentations.presentationsById)) {
      return (
        <EmptyState
          title="Empty Presentations"
          subtitle={<span>Create a presentation and it will <br />show up here.</span>}
        />
      );
    }
    return false;
  }

  handleErrors() {
    const { presentations, assets } = this.props;
    if (!presentations.loading && !isEmpty(presentations.error)) {
      throw new Error(presentations.error);
    }
    if (!assets.loading && !isEmpty(assets.error)) {
      throw new Error(assets.error);
    }
    return false;
  }

  renderPresentationList() {
    const { presentations: { presentationsById } } = this.props;
    return (
      <Grid container spacing={3}>
        {this.handleErrors() || this.handleEmptyState() || (
          Object.values(presentationsById).map((presentation, index) => (
            <Grid item key={presentation.id} xs={12} sm={6} md={4} lg={3}>
              <PresentationCardWithActionOverlay
                presentation={presentation}
                index={index}
                onPlay={this.onPlay}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
              />
            </Grid>
          )
        ))}
      </Grid>
    );
  }

  render() {
    const { classes, currentPresentationId } = this.props;

    if (this.state.toPresentation) {
      return <Redirect to={`/presentations/${currentPresentationId}`} />
    }

    return (
      <React.Fragment>
        <div className={classes.cardGrid}>
          {this.renderPresentationList()}
          <LoadingSpinner area={SPINNER_AREA} />
        </div>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={this.handleAdd}
        >
          <AddIcon />
        </Fab>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  presentations,
  assets,
  currentPresentationId
}) => ({
  presentations,
  assets,
  currentPresentationId
});

const mapDispatchToProps = {
  fetchPresentationList,
  fetchAssets,
  setCurrentPresentationId,
  showDialog,
  deletePresentation
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withSnackbar
)(PresentationList);
