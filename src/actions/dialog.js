import { createActions } from 'redux-actions';

export const {
  showDialog,
  hideDialog
} = createActions({
  'SHOW_DIALOG': (dialogType, dialogProps) => ({ dialogType, dialogProps }),
  'HIDE_DIALOG': () => {}
});
