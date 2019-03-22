import { handleActions } from 'redux-actions';

import {
  fetchAssetsBegin,
  fetchAssetsSuccess,
  fetchAssetsFailure
} from '../actions/assets';

const initialState = {
  error: null,
  loading: false,
  assetsById: {}
};

export default handleActions(
  new Map([
    [
      fetchAssetsBegin, (state, action) => ({
        ...state,
        loading: true
      })
    ],
    [
      fetchAssetsSuccess, (state, action) => ({
        ...state,
        loading: false,
        assetsById: action.payload.reduce((assets, asset) => {
          assets[asset.public_id] = asset;
          return assets;
        }, {})
      })
    ],
    [
      fetchAssetsFailure, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      })
    ]
  ]),
  initialState
);
