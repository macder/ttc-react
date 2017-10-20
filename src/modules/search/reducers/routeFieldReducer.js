import { fromJS } from 'immutable';
import * as t from '../actionTypes';

const initialState = fromJS({
  selected: null,
});

const routeFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECTED_ROUTE:
      return state.set('selected', action.selected);

    default:
      return state;
  }
};

export default (routeFieldReducer);
