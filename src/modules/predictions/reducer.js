import * as t from './actionTypes.js';

const initialState = {
  fetching: false,
  visible: false,
  payload: null,
};

const updateObject = (oldObject, newValues) => {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues);
}

const loadPredictionsRequest = (state, action) => {
  return updateObject(state, {
    fetching: action.fetching,
    visible: action.visible,
  });
}

const loadPredictionsSuccess = (state, action) => {
  return updateObject(state, {
    fetching: false,
    payload: action.payload,
    visible: action.visible,
  });
}

const loadPredictionsFailure = (state, action) => {
  return updateObject(state, {
    fetching: false,
    payload: action.payload,
    visible: action.visible,
    error: action.error
  });
}

const clearPredictions = (state, action) => {
  return updateObject(state, {
    fetching: false,
    payload: action.payload,
    visible: action.visible,
  });
}

const predictionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.LOAD_PREDICTIONS_REQUEST:
      return loadPredictionsRequest(state, action);

    case t.LOAD_PREDICTIONS_SUCCESS:
      return loadPredictionsSuccess(state, action);

    case t.LOAD_PREDICTIONS_FAILURE:
      return loadPredictionsFailure(state, action);

    case t.CLEAR_PREDICTIONS:
      return clearPredictions(state, action);

    default:
      return state
  }
};

export default (predictionsReducer);
