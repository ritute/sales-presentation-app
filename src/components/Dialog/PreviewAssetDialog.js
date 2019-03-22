import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ContainerDimensions from 'react-container-dimensions';

import { hideDialog } from '../../actions/dialog';
import DialogTitleWithClose from './DialogTitleWithClose';
import AssetPreview from '../Asset/AssetPreview';

const styles = theme => ({
  dialogPaper: {
    minHeight: '90vh',
  },
  dialogContent: {
    display: 'flex',
  },
  asset: {
    flex: 1,
    textAlign: 'center',
    overflowY: 'hidden',
  },
});

const PreviewAssetDialog = props => {
  const { classes, asset, assets, hideDialog } = props;

  return (
    <Dialog
      onClose={hideDialog}
      fullWidth={true}
      maxWidth="xl"
      classes={{ paper: classes.dialogPaper }}
      open={true}
    >
      <DialogTitleWithClose onClose={hideDialog} />
      <DialogContent className={classes.dialogContent}>
        <ContainerDimensions>
          {dimensions => (
            <div className={classes.asset}>
              <AssetPreview asset={assets[asset.public_id]} dimensions={dimensions} />
            </div>
          )}
        </ContainerDimensions>
      </DialogContent>
    </Dialog>
  );
};

PreviewAssetDialog.propTypes = {
  asset: PropTypes.object.isRequired,
};

const mapStateToProps = ({ assets: { assetsById } }) => ({
  assets: assetsById
});

const mapDispatchToProps = {
  hideDialog
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(PreviewAssetDialog);
