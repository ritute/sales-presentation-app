import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import ErrorBanner from './ErrorBanner';

const styles = theme => ({
  errorBanner: {}
});

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: ''
  };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, errorMessage: error.message });
  }

  render() {
    const { classes } = this.props;
    if (this.state.hasError) {
      return (
        <ErrorBanner
          message={this.state.errorMessage}
          classes={{ paper: classes.errorBanner }}
        />
      );
    }
    return this.props.children;
  }
}

export default withStyles(styles)(ErrorBoundary);
