import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { findKey } from 'lodash';
import PropTypes from 'prop-types';

import NewPresentationDialog from './NewPresentationDialog';
import EditPresentationTitleDialog from './EditPresentationTitleDialog';
import PreviewPresentationDialog from './PreviewPresentationDialog';
import PreviewAssetDialog from './PreviewAssetDialog';
import DeletePresentationConfirmationDialog from './DeletePresentationConfirmationDialog';

export const dialogs = {
  newPresentation: {
    type: 'NEW_PRESENTATION_DIALOG',
    component: NewPresentationDialog
  },
  editPresentationTitle: {
    type: 'EDIT_PRESENTATION_TITLE_DIALOG',
    component: EditPresentationTitleDialog
  },
  presentationPreview: {
    type: 'PRESENTATION_PREVIEW_DIALOG',
    component: PreviewPresentationDialog
  },
  assetPreview: {
    type: 'ASSET_PREVIEW_DIALOG',
    component: PreviewAssetDialog
  },
  deletePresentationConfirmation: {
    type: 'DELETE_PRESENTATION_CONFIRMATION_DIALOG',
    component: DeletePresentationConfirmationDialog
  }
};

const DialogRoot = ({ dialogType, dialogProps }) => {
  if (!dialogType) {
    return null;
  }

  const SpecificDialog =
    dialogs[findKey(dialogs, { type: dialogType })].component;
  return <SpecificDialog {...dialogProps} />;
};

DialogRoot.propTypes = {
  dialogType: PropTypes.string,
  dialogProps: PropTypes.object,
};

export default compose(
  connect(({ dialog }) => dialog)
)(DialogRoot);
