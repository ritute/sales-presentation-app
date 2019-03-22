import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { isEmpty } from 'lodash';
import { Droppable } from 'react-beautiful-dnd';
import Grid from '@material-ui/core/Grid';
import RootRef from '@material-ui/core/RootRef';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

import DraggableAsset from '../Asset/DraggableAsset';
import EmptyState from '../Status/EmptyState';

const styles = theme => ({
  selectedAssets: {
    backgroundColor: theme.palette.grey[200],
  },
  assets: {
    paddingRight: theme.spacing(2),
  },
  assetsWrapper: {
    height: '80vh',
    flexGrow: 1,
    minHeight: 0,
    overflow: 'auto',
  },
  slideNumber: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    height: 120,
    color: theme.palette.grey[700],
  },
  slideAsset: {
    minWidth: 400,
    width: 400,
  },
  emptyStateAvatar: {
    backgroundColor: '#fff',
  },
});

const getListStyle = (isDraggingOver, theme) => ({
  padding: theme.spacing(2),
  backgroundColor: isDraggingOver ? theme.palette.grey[300] : '',
  transition: 'background-color 0.5s ease',
});

const SelectedAssetsDroppable = props => {
  const {
    presentation,
    currentPresentationId,
    assets,
    classes,
    theme
  } = props;

  const { selectedAssets } = presentation;
  const isEmptyPresentation = isEmpty(selectedAssets);

  return (
    <Droppable droppableId="selected-assets">
      {(provided, snapshot) => (
        <Grid
          container
          item
          xs={5}
          direction="column"
          className={classes.selectedAssets}
          style={getListStyle(snapshot.isDraggingOver, theme)}
        >
          <Grid container item className={classes.assetsWrapper}>
            <RootRef rootRef={provided.innerRef}>
              <Grid
                container
                direction="column"
                className={classes.assets}
                wrap="nowrap"
              >
                {selectedAssets.map((assetId, index) => (
                  <Grid container item key={assetId} spacing={2} wrap="nowrap">
                    <Grid item className={classes.slideNumber}>
                      <Typography variant="h6" color="inherit">
                        {index + 1}
                      </Typography>
                    </Grid>
                    <Grid item xs className={classes.slideAsset}>
                      <DraggableAsset
                        key={assetId}
                        index={index}
                        asset={assets[assetId]}
                        presentationId={currentPresentationId}
                      />
                    </Grid>
                  </Grid>
                ))}
                <Fade
                  in={isEmptyPresentation && !snapshot.isDraggingOver}
                  unmountOnExit
                >
                  <EmptyState
                    title="Empty Presentation"
                    subtitle={<span>Drag and drop an asset from the <br/>library here.</span>}
                    classes={{ avatar: classes.emptyStateAvatar }}
                  />
                </Fade>
                {/* NOTE: No support for custom placeholder yet */}
                {/* https://github.com/atlassian/react-beautiful-dnd/issues/518 */}
                {provided.placeholder}
              </Grid>
            </RootRef>
          </Grid>
        </Grid>
      )}
    </Droppable>
  );
};

const mapStateToProps = ({
  presentations: { presentationsById },
  assets: { assetsById },
  currentPresentationId
}) => ({
  presentation: presentationsById[currentPresentationId],
  assets: assetsById,
  currentPresentationId,
});

export default compose(
  connect(mapStateToProps,),
  withStyles(styles, { withTheme: true })
)(SelectedAssetsDroppable);
