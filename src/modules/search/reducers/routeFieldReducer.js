import Immutable from 'immutable';
import * as t from '../actionTypes';

const initialState = Immutable.fromJS({
  selected: null,
  visible: false,
  input: null,
});

const routeFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECTED_ROUTE:
      return state.set('selected', action.selected)

    case t.CLEAR_ROUTE:
      return state
        .set('input', action.input)
        .set('selected', action.selected);

    case t.INPUT_ROUTE:
      return state.set('input', action.input)

    default:
      return state;
  }
};

export default (routeFieldReducer);
