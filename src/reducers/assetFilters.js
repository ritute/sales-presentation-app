import { handleActions } from 'redux-actions';
import { without } from 'lodash';

import {
  excludeAssets,
  addAssetToExclude,
  removeAssetFromExclude,
  filterAssetCategory
} from '../actions/assetFilters';
import { resourceCategories } from '../utils/AssetUtils';

const initialState = {
  // list of asset IDs to exclude from library that are in current presentation
  exclude: [],
  category: resourceCategories.images,
};

export default handleActions(
  new Map([
    [
      excludeAssets, (state, action) => ({
        ...state,
        exclude: action.payload
      })
    ],
    [
      addAssetToExclude, (state, action) => ({
        ...state,
        exclude: [...state.exclude, action.payload]
      })
    ],
    [
      removeAssetFromExclude, (state, action) => ({
        ...state,
        exclude: without(state.exclude, action.payload)
      })
    ],
    [
      filterAssetCategory, (state, action) => ({
        ...state,
        category: action.payload
      })
    ]
  ]),
  initialState
);
