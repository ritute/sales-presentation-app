import { handleAction } from 'redux-actions';

import { setCurrentPresentationId } from '../actions/presentations';

export default handleAction(
  setCurrentPresentationId,
  (state, action) => action.payload,
  null
);
