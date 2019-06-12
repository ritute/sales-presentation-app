import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: 0,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[700],
  },
});

const DialogTitleWithClose = ({ children, classes, onClose }) => (
  <MuiDialogTitle disableTypography className={classes.root}>
    {children
      ? <Typography variant="h6">{children}</Typography>
      : <Typography variant="h6">&nbsp;</Typography>
    }
    {onClose ? (
      <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    ) : null}
  </MuiDialogTitle>
);

DialogTitleWithClose.propTypes = {
  onClose: PropTypes.func,
};

export default withStyles(styles)(DialogTitleWithClose);
