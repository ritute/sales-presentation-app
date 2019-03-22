import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { trackPromise} from 'react-promise-tracker';
import { isEmpty } from 'lodash';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';
import PdfIcon from '@material-ui/icons/PictureAsPdf';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Truncate from 'react-truncate';

import { fetchAssets } from '../../actions/assets';
import { excludeAssets, filterAssetCategory } from '../../actions/assetFilters';
import getVisibleAssets from '../../selectors/assets';
import {
  resourceCategories,
  getAssetTitle,
  getAssetDescription
} from '../../utils/AssetUtils';
import LoadingSpinner from '../Status/LoadingSpinner';
import ResponsiveThumbnail from '../Thumbnail/ResponsiveThumbnail';
import EmptyState from '../Status/EmptyState';

const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    height: '100%',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  cardMedia: {
    position: 'relative',
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});

const SPINNER_AREA = 'asset-library-area';

class AssetLibrary extends Component {
  state = {
    value: resourceCategories.images,
  };

  componentDidMount() {
    trackPromise(this.props.fetchAssets(), SPINNER_AREA);
    this.props.excludeAssets([]);
    this.props.filterAssetCategory(resourceCategories.images);
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.filterAssetCategory(value);
  };

  renderTabs = () => (
    <Tabs
      value={this.state.value}
      onChange={this.handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab
        icon={<ImageIcon />}
        label="Images"
        value={resourceCategories.images}
      />
      <Tab
        icon={<VideocamIcon />}
        label="Videos"
        value={resourceCategories.videos}
      />
      <Tab
        icon={<PdfIcon />}
        label="PDFs"
        value={resourceCategories.pdfs}
      />
    </Tabs>
  );

  handleErrors() {
    const { assets } = this.props;
    if (!assets.loading && !isEmpty(assets.error)) {
      throw new Error(assets.error);
    }
    return false;
  }

  renderAssetList() {
    const { classes, libraryAssets } = this.props;

    return libraryAssets.map((asset, index) => {
      const title = getAssetTitle(asset);
      const description = getAssetDescription(asset);

      return (
        <Grid item key={asset.public_id} xs={12} sm={6} md={4} lg={3}>
          <Card className={classes.card}>
            <Grid container wrap="nowrap" direction="column">
              <Grid item className={classes.cardMedia}>
                <ResponsiveThumbnail asset={asset} />
              </Grid>
              <Grid item xs zeroMinWidth>
                <CardContent className={classes.cardContent}>
                  <Typography noWrap component="h6" variant="h6">
                    {title}
                  </Typography>
                  <Typography noWrap variant="subtitle1" color="textSecondary">
                    <Truncate lines={1}>
                      {description}
                    </Truncate>
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      );
    });
  }

  renderEmptyState() {
    const { classes, assets, libraryAssets } = this.props;
    if (!assets.loading && isEmpty(libraryAssets)) {
      return (
        <EmptyState
          title="Empty Category"
          subtitle={<span>No assets are in this library <br />category.</span>}
          classes={{ avatar: classes.emptyStateAvatar }}
        />
      );
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.cardGrid}>
        {this.handleErrors() || (
          <React.Fragment>
            <Grid container direction="column" alignItems="center" spacing={3}>
              <Grid item>
                {this.renderTabs()}
              </Grid>
              <Grid container item spacing={3}>
                {this.renderAssetList()}
              </Grid>
            </Grid>
            {this.renderEmptyState()}
          </React.Fragment>
        )}
        <LoadingSpinner area={SPINNER_AREA} />
      </div>
    );
  }
}

const mapStateToProps = ({ assets, assetFilters }) => ({
  assets,
  libraryAssets: getVisibleAssets(Object.values(assets.assetsById), assetFilters),
  assetFilters
});

const mapDispatchToProps = {
  fetchAssets,
  excludeAssets,
  filterAssetCategory
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(AssetLibrary);
