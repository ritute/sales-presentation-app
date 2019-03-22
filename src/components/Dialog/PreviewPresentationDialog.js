import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import ContainerDimensions from 'react-container-dimensions';

import { hideDialog } from '../../actions/dialog';
import DialogTitleWithClose from './DialogTitleWithClose';
import AssetPreview from '../Asset/AssetPreview';

const styles = theme => ({
  dialogPaper: {
    minHeight: '90vh',
  },
  dialogActions: {
    margin: 0,
  },
  mobileStepper: {
    flexGrow: 1,
  },
  dialogContent: {
    display: 'flex',
  },
  swipeableViews: {
    flex: 1,
    textAlign: 'center',
    overflowY: 'hidden',
  },
});

class PreviewPresentationDialog extends Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      ...prevState,
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      ...prevState,
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState(prevState => ({
      ...prevState,
      activeStep
    }));
  };

  render() {
    const {
      classes,
      theme,
      assets,
      presentation,
      fullScreen,
      hideDialog
    } = this.props;
    const { activeStep } = this.state;
    const maxSteps = presentation.selectedAssets.length;

    return (
      <Dialog
        onClose={hideDialog}
        fullWidth={true}
        maxWidth="xl"
        classes={{ paper: classes.dialogPaper }}
        open={true}
        fullScreen={Boolean(fullScreen)}
      >
        <DialogTitleWithClose onClose={hideDialog} />
        <DialogContent className={classes.dialogContent}>
          <ContainerDimensions>
            { dimensions => (
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={this.handleStepChange}
                enableMouseEvents
                className={classes.swipeableViews}
              >
                {presentation.selectedAssets.map((assetId, index) => (
                  <div key={assetId}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <AssetPreview asset={assets[assetId]} dimensions={dimensions} />
                    ) : null}
                  </div>
                ))}
              </SwipeableViews>
            )}
          </ContainerDimensions>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            className={classes.mobileStepper}
            nextButton={
              <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
              </Button>
            }
          />
        </DialogActions>
      </Dialog>
    );
  }
}

PreviewPresentationDialog.propTypes = {
  presentation: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool,
};

const mapStateToProps = ({
  assets: { assetsById }
}) => ({
  assets: assetsById
});

const mapDispatchToProps = {
  hideDialog
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(PreviewPresentationDialog);
