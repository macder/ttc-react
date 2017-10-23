import { isFSA } from 'flux-standard-action';

export const REQUEST_ROUTE_LIST = 'REQUEST_ROUTE_LIST';
export const RECEIVE_ROUTE_LIST = 'RECEIVE_ROUTE_LIST';
export const ADD_ROUTE_LIST = 'ADD_ROUTE_LIST';
export const ADD_DIRECTION = 'ADD_DIRECTION';
export const REQUEST_ROUTE_CONFIG = 'REQUEST_ROUTE_CONFIG';
export const RECEIVE_ROUTE_CONFIG = 'RECEIVE_ROUTE_CONFIG';

// FSA compliant - https://github.com/acdlite/flux-standard-action

export const requestRouteList = () => ({
  type: REQUEST_ROUTE_LIST,
  payload: {
    fetching: true,
    error: false,
  },
  meta: {
    url: 'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=ttc'
  }
});

export const requestRouteConfig = routeId => ({
  type: REQUEST_ROUTE_CONFIG,
  payload: {
    fetching: true,
    error: false,
  },
  meta: {
    routeId,
    url: `http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=${routeId}&terse`
  },
});

export const receiveRouteList = (payload, error = false) => ({
  type: RECEIVE_ROUTE_LIST,
  payload,
  error,
});

export const receiveRouteConfig = (payload, error = false) => ({
  type: RECEIVE_ROUTE_CONFIG,
  payload,
  error,
});

export const addRouteList = (payload) => ({
  type: ADD_ROUTE_LIST,
  payload,
});

export const addDirection = (data, routeId) => ({
  type: ADD_DIRECTION,
  payload: {
    data,
    routeId,
  }
});

/*console.log('requestRouteList is FSA', isFSA(requestRouteList()));
console.log('requestRouteConfig is FSA', isFSA(requestRouteConfig()));
console.log('receiveRouteList is FSA', isFSA(receiveRouteList()));
console.log('receiveRouteConfig is FSA', isFSA(receiveRouteConfig()));*/
