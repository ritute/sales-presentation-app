import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

const styles = {
  spinner: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const LoadingSpinner = ({ area, classes}) => {
  const { promiseInProgress } = usePromiseTracker({ area });

  return (
    <Fade
      in={promiseInProgress}
      style={{ transitionDelay: promiseInProgress ? '100ms' : '0ms' }}
      unmountOnExit
    >
      <div className={classes.spinner}>
        <CircularProgress style={{ width: 100, height: 100 }} />
      </div>
    </Fade>
  );
};

LoadingSpinner.propTypes = {
  area: PropTypes.string,
};

export default withStyles(styles)(LoadingSpinner);
