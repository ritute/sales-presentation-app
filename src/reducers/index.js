import { combineReducers } from 'redux';

import assets from './assets';
import presentations from './presentations';
import assetFilters from './assetFilters';
import currentPresentationId from './currentPresentationId';
import dialog from './dialog';

export default combineReducers({
  presentations,
  currentPresentationId,
  assets,
  assetFilters,
  dialog,
});
