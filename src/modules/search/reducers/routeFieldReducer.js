import * as t from '../actionTypes.js';

const initialState = {
  selected: null,
  visible: false,
  input: null
  // hasData: false,
};

const routeFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECTED_ROUTE:
      return Object.assign({}, state, {
        selected: action.selected
      });

    case t.CLEAR_ROUTE:
      return Object.assign({}, state, {
        selected: action.selected,
        input: action.input
      });

    case t.INPUT_ROUTE:
      return Object.assign({}, state, {
        input: action.input
      });

    default:
      return state
  }
};

export default (routeFieldReducer);
