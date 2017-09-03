import * as t from '../actionTypes.js';

const initialState = {
  selected: null,
  visible: false,
  input: null
};

const directionFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECTED_DIRECTION:
      return Object.assign({}, state, {
        selected: action.selected
      });

    case t.SELECTED_ROUTE:
      return Object.assign({}, state, {
        visible: true,
      });

    case t.CLEAR_ROUTE:
      return Object.assign({}, state, {
        selected: action.selected,
        input: action.input,
        visible: false,
      });

    case t.CLEAR_DIRECTION:
      return Object.assign({}, state, {
        selected: action.selected,
        input: action.input,
      });

    case t.INPUT_DIRECTION:
      return Object.assign({}, state, {
        input: action.input
      });

    default:
      return state
  }
};

export default (directionFieldReducer);