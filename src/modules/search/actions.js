import * as t from './actionTypes';

/**
 *
 * @return {object}
 */
export const loadRoutesFailure = e => ({
  type: t.LOAD_ROUTES_FAILURE,
  fetching: false,
  payload: null,
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
  payload: null,
  url: `http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=${routeTag}`,
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
  payload: null,
  error: e.message,
});

/**
 *
 * @param {object} route.
 * @return {object}
 */
export const selectedRoute = routeTag => ({
  type: t.SELECTED_ROUTE,
  selected: routeTag,
});

/**
 *
 * @param {object} route.
 * @return {object}
 */
export const selectedDirection = directionTag => ({
  type: t.SELECTED_DIRECTION,
  selected: directionTag,
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
