import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Image, Transformation, Video } from 'cloudinary-react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Truncate from 'react-truncate';

import { showDialog } from '../../actions/dialog';
import { dialogs } from '../Dialog/DialogRoot';
import { removeAssetFromPresentation } from '../../actions/presentations';
import {
  resourceTypes,
  getResourceTypeForThumbnail,
  getAssetTitle,
  getAssetDescription
} from '../../utils/AssetUtils';
import DraggableAssetMenu from './DraggableAssetMenu';

const styles = theme => ({
  card: {
    height: 120,
  },
});

const getItemStyle = (isDragging, draggableStyle, theme) => ({
  userSelect: 'none',
  marginBottom: theme.spacing(2),
  ...draggableStyle
});

class DraggableAsset extends Component {
  state = {
    anchorEl: null,
  };

  handleClickAsset = () => {
    this.props.showDialog(dialogs.assetPreview.type, { asset: this.props.asset });
  };

  handleClickMoreOptions = (event) => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  };

  clearAnchor = () => {
    this.setState({ anchorEl: null });
  };

  handleRemove = () => {
    const { presentationId, asset, index } = this.props;
    this.props.removeAssetFromPresentation(presentationId, asset.public_id, index);
  };

  getThumbnail = (asset) => {
    const resourceType = this.props.asset.resource_type;
    const urlResourceType = getResourceTypeForThumbnail(resourceType);

    switch (urlResourceType) {
      case resourceTypes.video:
        return (
          <Video
            publicId={`${asset.public_id}.jpg`}
            width="120"
            height="120"
            crop="fill"
            quality="auto"
            fetchFormat="auto"
            resourceType="video">
            <Transformation startOffset="0" />
          </Video>
        );
      default:
        return (
          <Image
            publicId={`${asset.public_id}.jpg`}
            width="120"
            height="120"
            crop="fill"
            quality="auto"
            fetchFormat="auto">
          </Image>
        );
    }
  };

  render() {
    const { classes, theme, asset, index, readOnly } = this.props;
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        {asset && (
          <Draggable
            key={asset.public_id}
            draggableId={asset.public_id}
            index={index}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style,
                  theme
                )}
              >
                <Card className={classes.card} onClick={this.handleClickAsset}>
                  <Grid container wrap="nowrap">
                    <Grid item>
                      {this.getThumbnail(asset)}
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <CardContent>
                        <Typography noWrap component="h6" variant="h6">
                          {getAssetTitle(asset)}
                        </Typography>
                        <Typography noWrap variant="subtitle1" color="textSecondary">
                          <Truncate lines={2}>
                            {getAssetDescription(asset)}
                          </Truncate>
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid item>
                      <IconButton
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClickMoreOptions}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <DraggableAssetMenu
                        anchorEl={anchorEl}
                        readOnly={readOnly}
                        clearAnchor={this.clearAnchor}
                        handlePreview={this.handleClickAsset}
                        handleRemove={this.handleRemove}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </div>
            )}
          </Draggable>
        )}
      </React.Fragment>
    );
  }
}

DraggableAsset.propTypes = {
  presentationId: PropTypes.string.isRequired,
  asset: PropTypes.object,
  readOnly: PropTypes.bool,
};

const mapDispatchToProps = {
  showDialog,
  removeAssetFromPresentation
};

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(DraggableAsset);
