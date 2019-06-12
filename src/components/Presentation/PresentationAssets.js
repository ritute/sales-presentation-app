import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { isEmpty } from 'lodash';
import { DragDropContext } from 'react-beautiful-dnd';
import { trackPromise} from 'react-promise-tracker';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { fetchAssetsIfNeeded } from '../../actions/assets';
import { addAssetToExclude } from '../../actions/assetFilters';
import {
  addAssetToPresentation,
  reorderAssetInPresentation
} from '../../actions/presentations';
import LoadingSpinner from '../Status/LoadingSpinner';
import AssetCategoryFilterList from './AssetCategoryFilterList';
import AssetLibraryDroppable from './AssetLibraryDroppable';
import SelectedAssetsDroppable from './SelectedAssetsDroppable';

const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(4),
    marginTop: theme.spacing(1),
    height: '90vh',
    flexGrow: 1,
  },
  rootGrid: {
    height: '90vh',
  },
  assetCategoryWrapper: {
    flexGrow: 1,
  },
  assetsWrapper: {
    height: '80vh',
    flexGrow: 1,
    minHeight: 0,
    overflow: 'auto',
  },
});

const SPINNER_AREA = 'presentation-assets-area';

class PresentationAssets extends Component {
  componentDidMount() {
    trackPromise(this.props.fetchAssetsIfNeeded(), SPINNER_AREA);
  }

  onDragEnd = ({ draggableId, source, destination, type}) => {
    const {
      currentPresentationId,
      addAssetToPresentation,
      reorderAssetInPresentation,
      addAssetToExclude
    } = this.props;

    // Dropped outside list
    if (!destination) {
      return;
    }

    // Move card between lists
    if (source.droppableId !== destination.droppableId) {
      addAssetToPresentation(
        currentPresentationId,
        draggableId,
        destination.index
      );
      addAssetToExclude(draggableId);
    }

    // Move card within list
    if (
      source.index !== destination.index &&
      source.droppableId === destination.droppableId
    ) {
      reorderAssetInPresentation(
        currentPresentationId,
        source.index,
        destination.index
      );
    }
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

  render() {
    const { classes, presentations, currentPresentationId } = this.props;
    const presentation = presentations.presentationsById[currentPresentationId];

    return (
      <div className={classes.root}>
        <LoadingSpinner area={SPINNER_AREA} />
        {(this.handleErrors() || presentation) && (
          <Grid
            container
            direction="row"
            alignItems="stretch"
            spacing={3}
            className={classes.rootGrid}
          >
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Grid
                container
                item
                xs={2}
                direction="column"
                alignItems="stretch"
              >
                <Grid item>
                  <Typography className={classes.title} variant="h6" color="inherit" gutterBottom>
                    Asset Library
                  </Typography>
                </Grid>
                <Grid item className={classes.assetCategoryWrapper}>
                  <AssetCategoryFilterList />
                </Grid>
              </Grid>
              <Grid container item xs={5} direction="column">
                <Grid item>
                  <Typography className={classes.title} variant="h6" color="inherit" gutterBottom>
                    &nbsp;
                  </Typography>
                </Grid>
                <Grid container item className={classes.assetsWrapper}>
                  <AssetLibraryDroppable />
                </Grid>
              </Grid>
              <SelectedAssetsDroppable />
            </DragDropContext>
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  currentPresentationId,
  presentations,
  assets
}) => ({
  currentPresentationId,
  presentations,
  assets
});

const mapDispatchToProps = {
  fetchAssetsIfNeeded,
  addAssetToPresentation,
  reorderAssetInPresentation,
  addAssetToExclude
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(PresentationAssets);
