import * as t from '../actionTypes.js';

const initialState = {
  selected: null
};

const routeFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECTED_ROUTE:
      return Object.assign({}, state, {
        selected: action.selected
      });

    case t.CLEAR_ROUTE:
      return Object.assign({}, state, {
        selected: action.selected
      });

    default:
      return state
  }
};

export default (routeFieldReducer);
