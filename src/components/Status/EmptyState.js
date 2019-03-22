import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const emptyFolder = require('../../images/empty-folder.png');

const styles = theme => ({
  gridContainer: {
    height: '100%',
    [theme.breakpoints.only('xs')]: {
      height: 'auto',
    },
  },
  avatar: {
    padding: 50,
    width: 200,
    height: 200,
    backgroundColor: theme.palette.grey[200],
    '& > img': {
      opacity: 0.5,
    },
  },
});

const EmptyState = ({ title, subtitle, classes }) => (
  <Grid
    container
    item
    direction="column"
    alignItems="center"
    justify="center"
    spacing={3}
    className={classes.gridContainer}
  >
    <Grid item>
      <Avatar alt="Empty State" src={emptyFolder} className={classes.avatar} />
    </Grid>
    <Grid item>
      <Typography component="h6" variant="h6" align="center" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" align="center">
        {subtitle}
      </Typography>
    </Grid>
  </Grid>
);

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  // Allow subtitle to include some html - node (e.g. <br /> to break to two lines)
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

export default withStyles(styles)(EmptyState);
