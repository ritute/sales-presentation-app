import { createActions } from 'redux-actions';

import api from '../services/api';
import { removeAssetFromExclude } from './assetFilters';

export const {
  addAsset,
  reorderAsset,
  removeAsset,
  setCurrentPresentationId,
  fetchPresentationListBegin,
  fetchPresentationListSuccess,
  fetchPresentationListFailure,
  fetchPresentationBegin,
  fetchPresentationSuccess,
  fetchPresentationFailure,
  createPresentationBegin,
  createPresentationSuccess,
  createPresentationFailure,
  savePresentationBegin,
  savePresentationSuccess,
  savePresentationFailure,
  deletePresentationBegin,
  deletePresentationSuccess,
  deletePresentationFailure
} = createActions({
  'ADD_ASSET': (presentationId, assetId, newAssetIndex) => ({
    presentationId,
    assetId,
    newAssetIndex
  }),
  'REORDER_ASSET': (presentationId, oldAssetIndex, newAssetIndex) => ({
    presentationId,
    oldAssetIndex,
    newAssetIndex
  }),
  'REMOVE_ASSET': (presentationId, assetIndex) => ({
    presentationId,
    assetIndex
  }),
  'SET_CURRENT_PRESENTATION_ID': presentationId => presentationId,
  'FETCH_PRESENTATION_LIST_BEGIN': () => {},
  'FETCH_PRESENTATION_LIST_SUCCESS': presentationList => presentationList,
  'FETCH_PRESENTATION_LIST_FAILURE': error => error,
  'FETCH_PRESENTATION_BEGIN': () => {},
  'FETCH_PRESENTATION_SUCCESS': presentation => presentation,
  'FETCH_PRESENTATION_FAILURE': error => error,
  'CREATE_PRESENTATION_BEGIN': () => {},
  'CREATE_PRESENTATION_SUCCESS': presentation => presentation,
  'CREATE_PRESENTATION_FAILURE': error => error,
  'SAVE_PRESENTATION_BEGIN': () => {},
  'SAVE_PRESENTATION_SUCCESS': presentation => presentation,
  'SAVE_PRESENTATION_FAILURE': error => error,
  'DELETE_PRESENTATION_BEGIN': () => {},
  'DELETE_PRESENTATION_SUCCESS': id => id,
  'DELETE_PRESENTATION_FAILURE': error => error
});

const savePresentationState = (dispatch, getState, presentationId) => {
  const presentation = getState().presentations.presentationsById[
    presentationId
  ];
  dispatch(savePresentation(presentation));
};

export const addAssetToPresentation = (
  presentationId,
  assetId,
  newAssetIndex
) => {
  return (dispatch, getState) => {
    dispatch(addAsset(presentationId, assetId, newAssetIndex));
    savePresentationState(dispatch, getState, presentationId);
  };
};

export const reorderAssetInPresentation = (
  presentationId,
  oldAssetIndex,
  newAssetIndex
) => {
  return (dispatch, getState) => {
    dispatch(reorderAsset(presentationId, oldAssetIndex, newAssetIndex));
    savePresentationState(dispatch, getState, presentationId);
  };
};

export const removeAssetFromPresentation = (
  presentationId,
  assetId,
  assetIndex
) => {
  return (dispatch, getState) => {
    dispatch(removeAsset(presentationId, assetIndex));
    dispatch(removeAssetFromExclude(assetId));
    savePresentationState(dispatch, getState, presentationId);
  };
};

export const fetchPresentationList = () => {
  const ERROR_MESSAGE = 'Unable to load presentations.';
  return dispatch => {
    dispatch(fetchPresentationListBegin());
    return api.presentations.getAll()
      .then(res => dispatch(fetchPresentationListSuccess(res.data)))
      .catch(error => dispatch(fetchPresentationListFailure(ERROR_MESSAGE)));
  };
};

export const fetchPresentation = (id) => {
  const ERROR_MESSAGE = 'Unable to load presentation.';
  return dispatch => {
    dispatch(fetchPresentationBegin());
    return api.presentations.getOne(id)
      .then(res => dispatch(fetchPresentationSuccess(res.data)))
      .catch(error => dispatch(fetchPresentationFailure(ERROR_MESSAGE)))
  };
};

export const createPresentation = (title) => {
  const newPresentation = {
    title,
    selectedAssets: []
  };
  const ERROR_MESSAGE = 'Unable to create presentation.';
  return dispatch => {
    dispatch(createPresentationBegin());
    return api.presentations.create(newPresentation)
      .then(({ data }) => {
        dispatch(createPresentationSuccess(data));
        dispatch(setCurrentPresentationId(data.id));
      })
      .catch(error => dispatch(createPresentationFailure(ERROR_MESSAGE)));
  };
};

export const savePresentation = (presentation) => {
  const ERROR_MESSAGE = 'Unable to save presentation.';
  return dispatch => {
    dispatch(savePresentationBegin());
    return api.presentations.update(presentation.id, presentation)
      .then(res => dispatch(savePresentationSuccess(res.data)))
      .catch(error => dispatch(savePresentationFailure(ERROR_MESSAGE)));
  };
};

export const deletePresentation = (id) => {
  const ERROR_MESSAGE = 'Unable to delete presentation.';
  return dispatch => {
    dispatch(deletePresentationBegin());
    return api.presentations.delete(id)
      .then(dispatch(deletePresentationSuccess(id)))
      .catch(error => dispatch(deletePresentationFailure(ERROR_MESSAGE)));
  };
};
