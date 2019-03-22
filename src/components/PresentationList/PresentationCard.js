import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Truncate from 'react-truncate';

import ResponsiveThumbnail from '../Thumbnail/ResponsiveThumbnail';

const styles = theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '&:hover': {
      boxShadow: theme.shadows[8],
    },
  },
  cardMedia: {
    position: 'relative',
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});

const PresentationCard = props => {
  const {
    classes,
    presentation,
    children,
    assets,
    dispatch,
    ...other
  } = props;

  const getThumbnail = (presentation) => {
    const { selectedAssets } = presentation;
    const { assetsById } = assets;

    if (!isEmpty(selectedAssets) && !isEmpty(assetsById)) {
      const firstAsset = assetsById[selectedAssets[0]];
      return <ResponsiveThumbnail asset={firstAsset} />;
    } else {
      return <ResponsiveThumbnail />;
    }
  };

  return (
    <Card
      className={classes.card}
      {...other}
    >
      <div className={classes.cardMedia}>
        {getThumbnail(presentation)}
      </div>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" noWrap>
          <Truncate>{presentation.title}</Truncate>
        </Typography>
      </CardContent>
      {children}
    </Card>
  );
};

PresentationCard.propTypes = {
  presentation: PropTypes.object.isRequired,
};

const mapStateToProps = ({ assets }) => ({ assets });

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(PresentationCard);
