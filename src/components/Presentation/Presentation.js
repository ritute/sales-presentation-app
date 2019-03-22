import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';

import {
  fetchPresentation,
  setCurrentPresentationId,
  createPresentation
} from '../../actions/presentations';
import { showDialog } from '../../actions/dialog';
import { dialogs } from '../Dialog/DialogRoot';
import PresentationAssets from './PresentationAssets';
import ErrorBoundary from '../Status/ErrorBoundary';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  backButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  editIcon: {
    marginLeft: theme.spacing(1),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  grow: {
    flexGrow: 1,
  },
  input: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginRight: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  errorBanner: {
    paddingTop: 0,
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(4),
  },
});

class Presentation extends Component {
  state = {
    toHome: false,
  };

  componentDidMount() {
    const { routeId: id } = this.props;
    this.props.setCurrentPresentationId(id);
    this.props.fetchPresentation(id);
  }

  handleBack = () => {
    this.props.setCurrentPresentationId(null);
    this.setState({ toHome: true });
  };

  handleEditTitle = (presentation) => {
    this.props.showDialog(dialogs.editPresentationTitle.type, {
      presentation,
      onSave: this.handleEditTitleSave
    });
  };

  handleEditTitleSave = () => {
    this.props.enqueueSnackbar('Changed presentation title');
  };

  handlePreview = (presentation) => {
    this.props.showDialog(dialogs.presentationPreview.type, { presentation });
  };

  render() {
    const { classes, presentations, routeId } = this.props;

    if (this.state.toHome === true) {
      return <Redirect to="/" />
    }

    const presentation = presentations.presentationsById[routeId];
    const errorExists = !presentations.loading && !isEmpty(presentations.error);

    return (
      <div className={classes.root}>
        <React.Fragment>
          <AppBar position="static" color="default">
            <Toolbar>
              <IconButton
                className={classes.backButton}
                color="inherit"
                aria-label="Back to list"
                onClick={this.handleBack}
              >
                <KeyboardArrowLeft />
              </IconButton>
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                {presentation && presentation.title}
              </Typography>
              {!errorExists && (
                <React.Fragment>
                  <IconButton
                    aria-label="Edit title"
                    className={classes.editIcon}
                    onClick={() => this.handleEditTitle(presentation)}
                  >
                    <EditIcon />
                  </IconButton>
                  <div className={classes.grow} />
                  <Button
                    color="inherit"
                    onClick={() => this.handlePreview(presentation)}
                    disabled={presentation && isEmpty(presentation.selectedAssets)}
                  >
                    <VisibilityIcon
                      className={classNames(classes.rightIcon, classes.iconSmall)}
                    />
                    Preview
                  </Button>
                </React.Fragment>
              )}
            </Toolbar>
          </AppBar>
          <ErrorBoundary classes={{ errorBanner: classes.errorBanner }}>
            <PresentationAssets />
          </ErrorBoundary>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = (
  { presentations },
  ownProps
) => ({
  presentations,
  routeId: ownProps.match.params.id
});

const mapDispatchToProps = {
  fetchPresentation,
  setCurrentPresentationId,
  createPresentation,
  showDialog,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withStyles(styles),
  withSnackbar
)(Presentation);
