import Immutable from 'immutable';
import * as t from './actionTypes.js';

const initialState = Immutable.fromJS({
  fetching: false,
  visible: false,
  payload: {},
});

const updateObject = (oldObject, newValues) =>
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  Object.assign({}, oldObject, newValues);


const loadPredictionsRequest = (state, action) => updateObject(state, {
  fetching: action.fetching,
  visible: action.visible,
});

const loadPredictionsSuccess = (state, action) => updateObject(state, {
  fetching: false,
  payload: action.payload,
  visible: action.visible,
});

const loadPredictionsFailure = (state, action) => updateObject(state, {
  fetching: false,
  payload: action.payload,
  visible: action.visible,
  error: action.error,
});

const clearPredictions = (state, action) => updateObject(state, {
  fetching: false,
  payload: action.payload,
  visible: action.visible,
});

const predictionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.LOAD_PREDICTIONS_REQUEST:
      // return loadPredictionsRequest(state, action);
      return state;

    case t.LOAD_PREDICTIONS_SUCCESS:
      return state;
      // return loadPredictionsSuccess(state, action);

    case t.LOAD_PREDICTIONS_FAILURE:
      return state;
      // return loadPredictionsFailure(state, action);

    case t.CLEAR_PREDICTIONS:
      return state;
      // return clearPredictions(state, action);

    default:
      return state;
  }
};

export default (predictionsReducer);
