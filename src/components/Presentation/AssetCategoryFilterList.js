import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';
import PdfIcon from '@material-ui/icons/PictureAsPdf';

import { filterAssetCategory } from '../../actions/assetFilters';
import { resourceCategories } from '../../utils/AssetUtils';

const styles = theme => ({
  listFilter: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(3),
  },
});

const AssetCategoryFilterList = props => {
  const { assetFilters, classes } = props;
  const assetFilterCategory = assetFilters.category;

  const handleAssetCategoryFilter = (category) => {
    props.filterAssetCategory(category);
  };

  const assetCategoryItems = [
    {
      label: 'Images',
      category: resourceCategories.images,
      icon: <ImageIcon />
    },
    {
      label: 'Videos',
      category: resourceCategories.videos,
      icon: <VideocamIcon />
    },
    {
      label: 'PDFs',
      category: resourceCategories.pdfs,
      icon: <PdfIcon />
    },
  ];

  return (
    <List className={classes.listFilter}>
      {assetCategoryItems.map(item => (
        <ListItem
          button
          key={item.label}
          selected={assetFilterCategory === item.category}
          onClick={() => handleAssetCategoryFilter(item.category)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );
};

const mapStateToProps = ({ assetFilters }) => ({
  assetFilters
});

const mapDispatchToProps = {
  filterAssetCategory
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(AssetCategoryFilterList);
