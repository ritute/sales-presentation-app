import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const styles = theme => ({
  paper: {
    paddingTop: theme.spacing(5),
  },
});

const ErrorBanner = ({ message, classes }) => {
  const onRetry = () => {
    window.location.reload();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper elevation={0} className={classes.paper}>
        <Box pb={1}>
          <Grid container spacing={2} alignItems="center" wrap="nowrap">
            <Grid item>
              <Box bgcolor="primary.main" clone>
                <Avatar>
                  <ErrorIcon />
                </Avatar>
              </Box>
            </Grid>
            <Grid item>
              <Typography>
                {message}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="flex-end" spacing={1}>
            <Grid item>
              <Button color="primary" onClick={onRetry}>Retry</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Divider />
    </React.Fragment>
  );
};

ErrorBanner.propTypes = {
  message: PropTypes.string,
};

ErrorBanner.defaultProps = {
  message: 'There was an issue with the service. Please retry.',
};

export default withStyles(styles)(ErrorBanner);
