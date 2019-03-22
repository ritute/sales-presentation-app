import { handleActions } from 'redux-actions';

import { showDialog, hideDialog } from '../actions/dialog';

const initialState = {
  dialogType: null,
  dialogProps: {},
};

export default handleActions(
  new Map([
    [
      showDialog, (state, action) => ({
        dialogType: action.payload.dialogType,
        dialogProps: action.payload.dialogProps,
      })
    ],
    [
      hideDialog, (state, action) => initialState
    ]
  ]),
  initialState
);
