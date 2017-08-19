import * as t from './actionTypes';

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
