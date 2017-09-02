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

    case t.CLEAR_ROUTE:
      // console.log('direction reducer');
      // return state;
      return Object.assign({}, state, {
        selected: null,
        input: '',
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
