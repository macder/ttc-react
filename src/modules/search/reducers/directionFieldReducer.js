import Immutable from 'immutable';
import * as t from '../actionTypes';

const initialState = Immutable.fromJS({
  selected: null,
  visible: false,
  // input: null,
});

const directionFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case t.CLEAR_ROUTE:
      return state
        .set('visible', false)
        .set('selected', null);

    case t.SELECTED_ROUTE:
      return state
        .set('visible', true);

    case t.SELECTED_DIRECTION:
      return state
        .set('selected', action.selected);

    case t.CLEAR_DIRECTION:
      return state
        .set('selected', action.selected);

    default:
      return state;
  }
};

export default (directionFieldReducer);
