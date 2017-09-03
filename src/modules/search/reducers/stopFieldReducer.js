import * as t from '../actionTypes.js';

const initialState = {
  selected: null,
  visible: false,
  input: null
};

const stopFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECTED_STOP:
      return Object.assign({}, state, {
        selected: action.selected
      });

    case t.CLEAR_ROUTE:
      return Object.assign({}, state, {
        selected: action.selected,
        input: action.input,
      });

    case t.CLEAR_DIRECTION:
      return Object.assign({}, state, {
        selected: action.selected,
        input: action.input,
      });

    case t.CLEAR_STOP:
      return Object.assign({}, state, {
        selected: action.selected,
        input: action.input,
      });

    case t.INPUT_STOP:
      return Object.assign({}, state, {
        input: action.input
      });

    default:
      return state
  }
};

export default (stopFieldReducer);
