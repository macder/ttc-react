import * as t from './actionTypes';

/**
 *
 * @return {object}
 */
export const loadRoutesFailure = () => {
  return {
    type: t.LOAD_ROUTES_FAILURE,
    fetching: false,
    populated: false,
  }
};

/**
 *
 * @return {object}
 */
export const loadRoutesRequest = () => {
  return {
    type: t.LOAD_ROUTES_REQUEST,
    fetching: true,
    populated: false
  }
};

/**
 *
 * @param {object} payload.
 * @return {object}
 */
export const loadRoutesSuccess = (payload) => {
  return {
    type: t.LOAD_ROUTES_SUCCESS,
    fetching: false,
    populated: true,
    payload: payload
  }
};

/**
 *
 * @param {object} route.
 * @return {object}
 */
export const selectedRoute = (route) => {
  return {
    type: t.SELECTED_ROUTE,
    selected: route
  }
};

/**
 *
 * @return {object}
 */
export const loadRouteConfigRequest = () => {
  return {
    type: t.LOAD_ROUTE_CONFIG_REQUEST,
    fetching: true,
    populated: false
  }
};
