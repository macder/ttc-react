import * as t from './actionTypes';

/**
 *
 * @return {object}
 */
export const loadRoutesFailure = e => ({
  type: t.LOAD_ROUTES_FAILURE,
  fetching: false,
  populated: false,
  error: e.message,
});

/**
 *
 * @return {object}
 */
export const loadRoutesRequest = () => ({
  type: t.LOAD_ROUTES_REQUEST,
  fetching: true,
  populated: false,
  url: 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc',
});

/**
 *
 * @param {object} payload.
 * @return {object}
 */
export const loadRoutesSuccess = payload => ({
  type: t.LOAD_ROUTES_SUCCESS,
  fetching: false,
  populated: true,
  payload,
});

/**
 *
 * @return {object}
 */
export const loadRouteConfigRequest = routeTag => ({
  type: t.LOAD_ROUTE_CONFIG_REQUEST,
  fetching: true,
  url: `http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=${routeTag}`,
});

/**
 *
 * @return {object}
 */
export const loadRouteConfigSuccess = payload => ({
  type: t.LOAD_ROUTE_CONFIG_SUCCESS,
  fetching: false,
  payload,
});

/**
 *
 * @return {object}
 */
export const loadRouteConfigFailure = e => ({
  type: t.LOAD_ROUTE_CONFIG_FAILURE,
  fetching: false,
  error: e.message,
});

/**
 *
 * @return {object}
 */
export const loadDirectionsRequest = () => ({
  type: t.LOAD_DIRECTIONS_REQUEST,
  fetching: true,
});

/**
 *
 * @param {object} route.
 * @return {object}
 */
export const selectedRoute = route => ({
  type: t.SELECTED_ROUTE,
  selected: route,
});

/**
 *
 * @param {object} route.
 * @return {object}
 */
export const selectedDirection = direction => ({
  type: t.SELECTED_DIRECTION,
  selected: direction,
});

/**
 *
 * @param {object} route.
 * @return {object}
 */
export const selectedStop = stop => ({
  type: t.SELECTED_STOP,
  selected: stop,
});

/**
 *
 * @param {string} input.
 * @return {object}
 */
export const inputRoute = input => ({
  type: t.INPUT_ROUTE,
  input,
});

/**
 *
 * @param {string} input.
 * @return {object}
 */
export const inputDirection = input => ({
  type: t.INPUT_DIRECTION,
  input,
});

/**
 *
 * @param {string} input.
 * @return {object}
 */
export const inputStop = input => ({
  type: t.INPUT_STOP,
  input,
});

/**
 *
 * @param {object} route.
 * @return {object}
 */
export const clearRoute = route => ({
  type: t.CLEAR_ROUTE,
  selected: null,
  input: null,
});

/**
 *
 * @param {object} route.
 * @return {object}
 */
export const clearDirection = direction => ({
  type: t.CLEAR_DIRECTION,
  selected: null,
  input: null,
});

/**
 *
 * @param {object} route.
 * @return {object}
 */
export const clearStop = stop => ({
  type: t.CLEAR_STOP,
  selected: null,
  input: null,
});
