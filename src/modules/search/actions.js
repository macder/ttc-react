import * as t from './actionTypes';

/**
 *
 * @return {object}
 */
export const loadRoutesFailure = (e) => {
  return {
    type: t.LOAD_ROUTES_FAILURE,
    fetching: false,
    populated: false,
    error: e.message
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
    populated: false,
    url: 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc'
  };
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
 * @return {object}
 */
export const loadRouteConfigRequest = (routeTag) => {
  return {
    type: t.LOAD_ROUTE_CONFIG_REQUEST,
    fetching: true,
    url: 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=' + routeTag
  }
};

/**
 *
 * @return {object}
 */
export const loadRouteConfigSuccess = (payload) => {
  return {
    type: t.LOAD_ROUTE_CONFIG_SUCCESS,
    fetching: false,
    payload: payload
  }
};

/**
 *
 * @return {object}
 */
export const loadRouteConfigFailure = (e) => {
  return {
    type: t.LOAD_ROUTE_CONFIG_FAILURE,
    fetching: false,
    error: e.message
  }
};

/**
 *
 * @return {object}
 */
export const loadDirectionsRequest = () => {
  return {
    type: t.LOAD_DIRECTIONS_REQUEST,
    fetching: true,
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
 * @param {object} route.
 * @return {object}
 */
export const selectedDirection = (direction) => {
  return {
    type: t.SELECTED_DIRECTION,
    selected: direction
  }
};

/**
 *
 * @param {object} route.
 * @return {object}
 */
export const selectedStop = (stop) => {
  return {
    type: t.SELECTED_STOP,
    selected: stop
  }
};

/**
 *
 * @param {object} route.
 * @return {object}
 */
export const clearRoute = (route) => {
  return {
    type: t.CLEAR_ROUTE,
    selected: null
  }
};
