import { fromJS } from 'immutable';
import * as t from '../actionTypes';

const initialState = fromJS({
  selected: null,
});

const stopFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECTED_DIRECTION:
      return state.set('selected', null);

    case t.SELECTED_ROUTE:
      return state.set('selected', null);

    case t.SELECTED_STOP:
      return state.set('selected', action.selected);

    default:
      return state;
  }
};

export default (stopFieldReducer);
