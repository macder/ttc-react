import * as t from '../actionTypes';

const initialState = {
  selected: null,
  visible: false,
  input: null,
};

const updateObject = (oldObject, newValues) =>
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  Object.assign({}, oldObject, newValues);


const selectedDirection = state => updateObject(state, {
  visible: true,
});

const selectedStop = (state, action) => updateObject(state, {
  selected: action.selected,
});

const clearRoute = (state, action) => updateObject(state, {
  selected: action.selected,
  input: action.input,
  visible: false,
});

const clearDirection = state => updateObject(state, {
  selected: null,
  input: null,
  visible: false,
});

const clearStop = (state, action) => updateObject(state, {
  selected: action.selected,
  input: action.input,
});

const inputStop = (state, action) => updateObject(state, {
  input: action.input,
});

const stopFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECTED_DIRECTION:
      return selectedDirection(state);

    case t.SELECTED_STOP:
      return selectedStop(state, action);

    case t.CLEAR_ROUTE:
      return clearRoute(state, action);

    case t.CLEAR_DIRECTION:
      return clearDirection(state);

    case t.CLEAR_STOP:
      return clearStop(state, action);

    case t.INPUT_STOP:
      return inputStop(state, action);

    default:
      return state;
  }
};

export default (stopFieldReducer);
