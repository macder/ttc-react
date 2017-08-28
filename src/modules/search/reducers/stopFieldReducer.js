import * as t from '../actionTypes.js';

const initialState = {
  selected: null
};

const stopFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECTED_STOP:
      return Object.assign({}, state, {
        selected: action.selected
      });

    default:
      return state
  }
};

export default (stopFieldReducer);
