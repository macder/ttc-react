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
  url: 'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=ttc',
});

/**
 *
 * @param {object} payload.
 * @return {object}
 */
export const loadRoutesSuccess = payload => ({
  type: t.LOAD_ROUTES_SUCCESS,
  fetching: false,
  payload,
});

/**
 *
 * @return {object}
 */
export const loadRouteConfigRequest = routeTag => ({
  type: t.LOAD_ROUTE_CONFIG_REQUEST,
  fetching: true,
  url: `http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=${routeTag}`,
  // url: '/data/routeConfig.json'
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
  selected: route.tag,
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
 * @return {object}
 */
export const clearRoute = () => ({
  type: t.CLEAR_ROUTE,
  selected: null,
  input: null,
});

/**
 *
 * @return {object}
 */
export const clearDirection = () => ({
  type: t.CLEAR_DIRECTION,
  selected: null,
  input: null,
});

/**
 *
 * @return {object}
 */
export const clearStop = () => ({
  type: t.CLEAR_STOP,
  selected: null,
  input: null,
});
