import { differenceWith } from 'lodash';

import { resourceTypes, resourceCategories } from '../utils/AssetUtils';

// getVisibleAssets
// Filters through currently-selected category and excludes those assets
// present in current presentation
export default (assets, { exclude, category }) => {
  const resourceType =
    category === resourceCategories.images
      ? resourceTypes.image
      : category === resourceCategories.videos
      ? resourceTypes.video
      : resourceTypes.pdf;

  return differenceWith(
    assets,
    exclude,
    ({ public_id }, id) => public_id === id
  ).filter(asset => asset.resource_type === resourceType);
};
