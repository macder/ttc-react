import Immutable from 'immutable';
import * as t from './actionTypes.js';

const initialState = Immutable.fromJS({
  fetching: false,
  visible: false,
  payload: null,
});

const predictionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.LOAD_PREDICTIONS_REQUEST:
      console.log('LOAD_PREDICTIONS_REQUEST');
      return state
        .set('fetching', action.fetching);

    case t.LOAD_PREDICTIONS_SUCCESS:
      console.log('LOAD_PREDICTIONS_SUCCESS');
      return state
        .set('payload', action.payload)
        .set('fetching', action.fetching);

    case t.LOAD_PREDICTIONS_FAILURE:
      return state;

    case 'search/SELECTED_STOP':
      return state
        .set('visible', true);

    case t.CLEAR_PREDICTIONS:
      return state
        .set('payload', action.payload)
        .set('visible', action.visible);

    default:
      return state;
  }
};

export default (predictionsReducer);
