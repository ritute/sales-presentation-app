import { combineActions, handleActions } from 'redux-actions';

import {
  addAsset,
  reorderAsset,
  removeAsset,
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
} from '../actions/presentations';

const initialState = {
  error: null,
  loading: false,
  presentationsById: {}
};

export default handleActions(
  new Map([
    [
      addAsset, (state, action) => {
        const {
          presentationId,
          assetId,
          newAssetIndex
        } = action.payload;

        const selectedAssets = Array.from(
          state.presentationsById[presentationId].selectedAssets
        );
        selectedAssets.splice(newAssetIndex, 0, assetId);

        return {
          ...state,
          presentationsById: {
            ...state.presentationsById,
            [presentationId]: {
              ...state.presentationsById[presentationId],
              selectedAssets
            }
          }
        };
      }
    ],
    [
      reorderAsset, (state, action) => {
        const {
          presentationId,
          oldAssetIndex,
          newAssetIndex
        } = action.payload;

        const newAssets = Array.from(
          state.presentationsById[presentationId].selectedAssets
        );
        const [removedAsset] = newAssets.splice(oldAssetIndex, 1);
        newAssets.splice(newAssetIndex, 0, removedAsset);

        return {
          ...state,
          presentationsById: {
            ...state.presentationsById,
            [presentationId]: {
              ...state.presentationsById[presentationId],
              selectedAssets: newAssets
            }
          }
        };
      }
    ],
    [
      removeAsset, (state, action) => {
        const {
          presentationId,
          assetIndex
        } = action.payload;

        const selectedAssets = Array.from(
          state.presentationsById[presentationId].selectedAssets
        );
        selectedAssets.splice(assetIndex, 1);

        return {
          ...state,
          presentationsById: {
            ...state.presentationsById,
            [presentationId]: {
              ...state.presentationsById[presentationId],
              selectedAssets
            }
          }
        };
      }
    ],
    [
      [combineActions(
        fetchPresentationListBegin,
        fetchPresentationBegin,
        createPresentationBegin,
        savePresentationBegin,
        deletePresentationBegin
      )], (state, action) => ({
        ...state,
        loading: true
      })
    ],
    [
      fetchPresentationListSuccess, (state, action) => {
        const presentationsById = action.payload.reduce(
          (presentationList, presentation) => {
            presentationList[presentation.id] = presentation;
            return presentationList;
          }, {}
        );
        return {
          ...state,
          loading: false,
          presentationsById
        };
      }
    ],
    [
      fetchPresentationSuccess, (state, action) => {
        const newPresentation = {};
        newPresentation[action.payload.id] = action.payload;
        const newState = {
          ...state,
          loading: false,
          presentationsById: {...state.presentationsById, ...newPresentation }
        };
        return newState;
      }
    ],
    [
      [combineActions(
        createPresentationSuccess,
        savePresentationSuccess
      )], (state, action) => {
        const presentation = action.payload;

        return {
          ...state,
          loading: false,
          presentationsById: {
            ...state.presentationsById,
            [presentation.id]: {
              ...presentation
            }
          }
        };
      }
    ],
    [
      deletePresentationSuccess, (state, action) => {
        const id = action.payload;
        const {
          [id]: deletedPresentation,
          ...restOfPresentations
        } = state.presentationsById;

        return {
          ...state,
          loading: false,
          presentationsById: {
            ...restOfPresentations
          }
        };
      }
    ],
    [
      [combineActions(
        fetchPresentationListFailure,
        fetchPresentationFailure,
        createPresentationFailure,
        savePresentationFailure,
        deletePresentationFailure
      )], (state, action) => ({
        ...state,
        loading: false,
        error: action.payload
      })
    ]
  ]),
  initialState
);
