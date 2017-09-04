import * as t from './actionTypes.js';

const initialState = {
  fetching: false,
  visible: false,
  payload: null,
};

const predictionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case t.LOAD_PREDICTIONS_REQUEST:
      return Object.assign({}, state, {
        fetching: true,
      });

    case t.LOAD_PREDICTIONS_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        payload: action.payload,
        visible: action.visible,
      });

    default:
      return state
  }
};

export default (predictionsReducer);
