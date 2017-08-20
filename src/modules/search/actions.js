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
    fetching: true,
    populated: false
  }
};

export const loadRoutesSuccess = (payload) => {
  return {
    type: t.LOAD_ROUTES_SUCCESS,
    fetching: false,
    populated: true,
    payload: payload
  }
};

export const selectedRoute = (route) => {
  return {
    type: t.SELECTED_ROUTE,
    selected: route
  }
};
