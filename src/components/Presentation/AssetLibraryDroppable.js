import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import Grid from '@material-ui/core/Grid';
import RootRef from '@material-ui/core/RootRef';
import Typography from '@material-ui/core/Typography';

import { excludeAssets } from '../../actions/assetFilters';
import getVisibleAssets from '../../selectors/assets';
import DraggableAsset from '../Asset/DraggableAsset';
import EmptyState from '../Status/EmptyState';

const styles = theme => ({
  assets: {
    paddingRight: theme.spacing(2),
  },
  assetWrapper: {
    minWidth: 400,
    width: 400,
  },
  assetSpacing: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    height: 120,
  },
});

class AssetLibraryDroppable extends Component {
  componentDidMount() {
    const {
      presentations,
      currentPresentationId: id,
      excludeAssets
    } = this.props;

    if (!isEmpty(presentations) && id !== null) {
      const presentation = presentations[id];
      excludeAssets(presentation.selectedAssets);
    }
  }

  render() {
    const {
      libraryAssets,
      currentPresentationId,
      classes,
    } = this.props;

    return (
      <Droppable droppableId="asset-library" isDropDisabled={true}>
        {(provided, snapshot) => (
          <RootRef rootRef={provided.innerRef}>
            <Grid container direction="column" className={classes.assets} wrap="nowrap">
              {libraryAssets.map((asset, index) => (
                <Grid container item key={asset.public_id} spacing={2} wrap="nowrap">
                  <Grid item xs className={classes.assetWrapper}>
                    <DraggableAsset
                      key={asset.public_id}
                      index={index}
                      asset={asset}
                      presentationId={currentPresentationId}
                      readOnly={true}
                    />
                  </Grid>
                  <Grid item className={classes.assetSpacing}>
                    <Typography variant="h6" color="inherit">
                      &nbsp;
                    </Typography>
                  </Grid>
                </Grid>
              ))}
              {isEmpty(libraryAssets) && (
                <EmptyState
                  title="Empty Category"
                  subtitle={<span>No assets are in this library <br />category.</span>}
                  classes={{ avatar: classes.emptyStateAvatar }}
                />
              )}
              {provided.placeholder}
            </Grid>
          </RootRef>
        )}
      </Droppable>
    );
  }
}

const mapStateToProps = ({
  presentations: { presentationsById },
  assets: { assetsById },
  assetFilters,
  currentPresentationId
}) => ({
  presentations: presentationsById,
  libraryAssets: getVisibleAssets(Object.values(assetsById), assetFilters),
  currentPresentationId
});

const mapDispatchToProps = {
  excludeAssets
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(AssetLibraryDroppable);
