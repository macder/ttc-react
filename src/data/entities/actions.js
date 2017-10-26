export const ADD_PREDICTION = 'ADD_PREDICTION';
export const ADD_ROUTE_LIST = 'ADD_ROUTE_LIST';
export const ADD_DIRECTION = 'ADD_DIRECTION';
export const ADD_STOP = 'ADD_STOP';
export const REQUEST_PREDICTION = 'REQUEST_PREDICTION';
export const REQUEST_ROUTE_LIST = 'REQUEST_ROUTE_LIST';
export const REQUEST_ROUTE_CONFIG = 'REQUEST_ROUTE_CONFIG';
export const RECEIVE_PREDICTION = 'RECEIVE_PREDICTION';
export const RECEIVE_ROUTE_LIST = 'RECEIVE_ROUTE_LIST';
export const RECEIVE_ROUTE_CONFIG = 'RECEIVE_ROUTE_CONFIG';

export const requestPrediction = (routeId, stopId) => ({
  type: REQUEST_PREDICTION,
  payload: {
    fetching: true,
    error: false,
  },
  meta: {
    url: `http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=ttc&r=${routeId}&s=${stopId}`,
    // url: '/data/prediction_2dirs_multi.json',
    // url: '/data/prediction_1dir_single.json',
    // url: '/data/prediction_2dirs_1multi_1single.json',
    // url: '/data/prediction_1dir_multi.json',
    // url: '/data/prediction_nonr.json',
  },
});

export const requestRouteList = () => ({
  type: REQUEST_ROUTE_LIST,
  payload: {
    fetching: true,
    error: false,
  },
  meta: {
    url: 'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=ttc',
  },
});

export const requestRouteConfig = routeId => ({
  type: REQUEST_ROUTE_CONFIG,
  payload: {
    fetching: true,
    error: false,
  },
  meta: {
    routeId,
    url: `http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=${routeId}&terse&verbose`,
  },
});

export const receivePrediction = (payload, error = false) => ({
  type: RECEIVE_PREDICTION,
  payload,
  error,
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

export const addPrediction = payload => ({
  type: ADD_PREDICTION,
  payload,
});

export const addRouteList = payload => ({
  type: ADD_ROUTE_LIST,
  payload,
});

export const addDirection = (data, routeId) => ({
  type: ADD_DIRECTION,
  payload: {
    data,
    routeId,
  },
});

export const addStop = payload => ({
  type: ADD_STOP,
  payload,
});
