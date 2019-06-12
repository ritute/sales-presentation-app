import { isEmpty } from 'lodash';
import { createActions } from 'redux-actions';
import axios from 'axios';

import Config from '../config/config';
import { resourceTypes } from '../utils/AssetUtils';

export const {
  fetchAssetsBegin,
  fetchAssetsSuccess,
  fetchAssetsFailure
} = createActions({
  'FETCH_ASSETS_BEGIN': () => {},
  'FETCH_ASSETS_SUCCESS': assets => assets,
  'FETCH_ASSETS_FAILURE': error => error
});

// Fetch all images, videos, PDF assets
// PDFs are uploaded to Cloudinary as image types
// https://cloudinary.com/documentation/image_transformations#delivering_content_from_pdf_files
const fetchAssets = () => {
  // Cloudinary JSON response is cached at CDN for an hour
  const URL_PREFIX = `https://res.cloudinary.com/${Config.cloudName}`;
  const URL_SUFFIX = `list/${Config.tag}.json`;
  const IMAGE_LIST_URL = `${URL_PREFIX}/image/${URL_SUFFIX}`;
  const VIDEO_LIST_URL = `${URL_PREFIX}/video/${URL_SUFFIX}`;

  const ERROR_MESSAGE = 'Unable to load assets.';

  return dispatch => {
    dispatch(fetchAssetsBegin());
    return axios
      .all([axios.get(IMAGE_LIST_URL), axios.get(VIDEO_LIST_URL)])
      .then(
        axios.spread((imageListRes, videoListRes) => {
          const images = imageListRes.data.resources;
          const videos = videoListRes.data.resources;
          // Set asset resource types for categorization
          images.map(
            resource =>
              (resource.resource_type =
                resource.format === resourceTypes.pdf
                  ? resourceTypes.pdf
                  : resourceTypes.image)
          );
          videos.map(resource => (resource.resource_type = resourceTypes.video));

          return dispatch(fetchAssetsSuccess(images.concat(videos)));
        })
      )
      .catch(error => dispatch(fetchAssetsFailure(ERROR_MESSAGE)));
  };
}

const shouldFetchAssets = (state) => {
  const assets = state.assets;
  return !assets.loading && isEmpty(assets.assetsById);
};

export const fetchAssetsIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchAssets(getState())) {
      return dispatch(fetchAssets());
    } else {
      return Promise.resolve();
    }
  };
};
