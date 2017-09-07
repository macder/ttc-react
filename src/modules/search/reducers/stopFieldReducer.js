import * as t from '../actionTypes.js';

const initialState = {
  selected: null,
  visible: false,
  input: null
};

const updateObject = (oldObject, newValues) => {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues);
}

const selectedDirection = (state, action) => {
  return updateObject(state, {
    visible: true,
  });
}

const selectedStop = (state, action) => {
  return updateObject(state, {
    selected: action.selected
  });
}

const clearRoute = (state, action) => {
  return updateObject(state, {
    selected: action.selected,
    input: action.input,
    visible: false,
  });
}

const clearDirection = (state, action) => {
  return updateObject(state, {
    selected: null,
    input: null,
    visible: false,
  });
}

const clearStop = (state, action) => {
  return updateObject(state, {
    selected: action.selected,
    input: action.input,
  });
}

const inputStop = (state, action) => {
  return updateObject(state, {
    input: action.input
  });
}

const stopFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECTED_DIRECTION:
      return selectedDirection(state, action);

    case t.SELECTED_STOP:
      return selectedStop(state, action);

    case t.CLEAR_ROUTE:
      return clearRoute(state, action);

    case t.CLEAR_DIRECTION:
      return clearDirection(state, action);

    case t.CLEAR_STOP:
      return clearStop(state, action);

    case t.INPUT_STOP:
      return inputStop(state, action);

    default:
      return state
  }
};

export default (stopFieldReducer);
