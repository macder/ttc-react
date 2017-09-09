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


const selectedDirection = (state, action) => updateObject(state, {
  selected: action.selected,
});

const selectedRoute = state => updateObject(state, {
  selected: null,
  visible: true,
  input: null,
});

const clearRoute = (state, action) => updateObject(state, {
  selected: action.selected,
  input: action.input,
  visible: false,
});

const clearDirection = (state, action) => updateObject(state, {
  selected: action.selected,
  input: action.input,
});

const inputDirection = (state, action) => updateObject(state, {
  input: action.input,
});

const directionFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECTED_DIRECTION:
      return selectedDirection(state, action);

    case t.SELECTED_ROUTE:
      return selectedRoute(state);

    case t.CLEAR_ROUTE:
      return clearRoute(state, action);

    case t.CLEAR_DIRECTION:
      return clearDirection(state, action);

    case t.INPUT_DIRECTION:
      return inputDirection(state, action);

    default:
      return state;
  }
};

export default (directionFieldReducer);
