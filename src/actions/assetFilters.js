import { createActions } from 'redux-actions';

export const {
  excludeAssets,
  addAssetToExclude,
  removeAssetFromExclude,
  filterAssetCategory
} = createActions({
  'EXCLUDE_ASSETS': assetsToExclude => assetsToExclude,
  'ADD_ASSET_TO_EXCLUDE': asset => asset,
  'REMOVE_ASSET_FROM_EXCLUDE': asset => asset,
  'FILTER_ASSET_CATEGORY': category => category
});
