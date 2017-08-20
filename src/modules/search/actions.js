import * as t from './actionTypes';

export const loadRoutesFailure = () => {
  return {
    type: t.LOAD_ROUTES_FAILURE,
    fetching: false,
    populated: false,
  }
};

export const loadRoutesRequest = () => {
  return {
    type: t.LOAD_ROUTES_REQUEST,
    fetch: true,
    populated: false
  }
};

export const loadRoutesSuccess = () => {
  return {
    type: t.LOAD_ROUTES_SUCCESS,
    fetch: false,
    populated: true
  }
};


export const selectedRoute = (route) => {
  return {
    type: t.SELECTED_ROUTE,
    selected: route
  }
};
