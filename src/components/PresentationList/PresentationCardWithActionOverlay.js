import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PlayIcon from '@material-ui/icons/PlayArrow';

import { withHover } from '../../hoc/hoverable-hoc';
import PresentationCard from './PresentationCard';

const styles = theme => ({
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlayContainer: {
    height: '100%',
  },
  cardActionButton: {
    border: '1px solid white',
    borderRadius: '50%',
    width: '2em',
    height: '2em',
    '&:hover': {
      backgroundColor: 'white',
      transition: 'background-color 0.5s ease',
      '& svg': {
        color: 'black'
      }
    }
  },
  cardActionIcon: {
    color: 'white',
  },
  cardActionLabel: {
    color: 'white',
    cursor: 'pointer',
    verticalAlign: 'middle',
    paddingLeft: theme.spacing(1),
  },
});

const PresentationCardWithActionOverlay = props => {
  const { presentation, index, classes } = props;
  const cardActions = [
    {
      id: 'play',
      label: 'Play',
      icon: <PlayIcon className={classes.cardActionIcon} />,
      onClick: props.onPlay,
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: <EditIcon className={classes.cardActionIcon} />,
      onClick: props.onEdit,
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <DeleteIcon className={classes.cardActionIcon} />,
      onClick: props.onDelete,
    },
  ];

  return (
    <PresentationCard presentation={presentation}>
      <div
        className={classes.overlay}
        style={{ display: props.isHovered ? 'block' : 'none' }}
      >
        <Grid
          container
          className={classes.overlayContainer}
          direction="column"
          justify="center"
          alignContent="center"
          spacing={1}
        >
          {cardActions.map((action, i) => {
            const id = `${action.id}${index}-${i}`;
            return (
              <Grid item key={id}>
                <IconButton
                  className={classes.cardActionButton}
                  onClick={() => action.onClick(presentation.id)}
                  id={id}
                >
                  {action.icon}
                </IconButton>
                <Typography
                  variant="h5"
                  component="label"
                  htmlFor={id}
                  className={classes.cardActionLabel}
                  display="inline"
                >
                  {action.label}
                </Typography>
              </Grid>);
            })}
        </Grid>
      </div>
    </PresentationCard>
  );
};

PresentationCardWithActionOverlay.propTypes = {
  presentation: PropTypes.object,
  index: PropTypes.number,
  onPlay: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default compose(
  withStyles(styles),
  withHover
)(PresentationCardWithActionOverlay);
