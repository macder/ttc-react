import Immutable from 'immutable';
import * as t from './actionTypes';

const initialState = Immutable.fromJS({
  fetching: false,
  payload: null,
  error: null,
});

const predictionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.LOAD_PREDICTIONS_REQUEST:
      return state
        .set('fetching', action.fetching);

    case t.LOAD_PREDICTIONS_SUCCESS:
      return state
        .set('payload', action.payload)
        .set('fetching', action.fetching);

    case t.LOAD_PREDICTIONS_FAILURE:
      return state
        .set('payload', action.payload)
        .set('fetching', action.fetching)
        .set('error', action.error);

    case t.CLEAR_PREDICTIONS:
      return state
        .set('payload', action.payload)
        .set('error', action.error);

    case 'search/SELECTED_STOP':
      return state
        .set('payload', null);

    default:
      return state;
  }
};

export default (predictionsReducer);
