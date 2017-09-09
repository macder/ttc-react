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


const selectedRoute = (state, action) => updateObject(state, {
  selected: action.selected,
});

const clearRoute = (state, action) => updateObject(state, {
  selected: action.selected,
  input: action.input,
});

const inputRoute = (state, action) => updateObject(state, {
  input: action.input,
});


const routeFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.SELECTED_ROUTE:
      return selectedRoute(state, action);

    case t.CLEAR_ROUTE:
      return clearRoute(state, action);

    case t.INPUT_ROUTE:
      return inputRoute(state, action);

    default:
      return state;
  }
};

export default (routeFieldReducer);
