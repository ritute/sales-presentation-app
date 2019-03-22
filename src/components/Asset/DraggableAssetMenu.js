import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VisibilityIcon from '@material-ui/icons/Visibility';

const styles = theme => ({
  placeholder: {
    display: 'none',
  },
});

const DraggableAssetMenu = props => {
  const { classes, anchorEl, readOnly } = props;

  const handleClose = (event) => {
    event.stopPropagation();
    props.clearAnchor();
  };

  const handlePreview = (event) => {
    event.stopPropagation();
    props.handlePreview();
  };

  const handleRemove = (event) => {
    event.stopPropagation();
    props.handleRemove();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem key="placeholder" className={classes.placeholder} />
      <MenuItem onClick={handlePreview}>
        <ListItemIcon>
          <VisibilityIcon />
        </ListItemIcon>
        <ListItemText primary="Preview" />
      </MenuItem>
      {
        !Boolean(readOnly) ? (
          <MenuItem onClick={handleRemove}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Remove" />
          </MenuItem>
        ) : null
      }
    </Menu>
  );
};

DraggableAssetMenu.propTypes = {
  anchorEl: PropTypes.object,
  readOnly: PropTypes.bool,
  clearAnchor: PropTypes.func.isRequired,
  handlePreview: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default withStyles(styles)(DraggableAssetMenu);
