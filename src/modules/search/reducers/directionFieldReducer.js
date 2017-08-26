import * as t from '../actionTypes.js';

const initialState = {
  selected: null
};

const directionFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECTED_DIRECTION:
      return Object.assign({}, state, {
        selected: action.selected
      });

    default:
      return state
  }
};

export default (directionFieldReducer);
