import Immutable from 'immutable';
import * as t from '../actionTypes';

const initialState = Immutable.fromJS({
  selected: null,
  visible: false,
});

const stopFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECTED_DIRECTION:
      return state
        .set('visible', true);

    case t.SELECTED_STOP:
      return state
        .set('selected', action.selected);

    case t.CLEAR_ROUTE:
      return state
        .set('visible', false)
        .set('selected', null);

    case t.CLEAR_DIRECTION:
      return state
        .set('visible', false)
        .set('selected', null);

    case t.CLEAR_STOP:
      return state
        .set('selected', null);

    default:
      return state;
  }
};

export default (stopFieldReducer);
