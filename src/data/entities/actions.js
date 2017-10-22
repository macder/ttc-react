export const REQUEST_ROUTE_LIST = 'REQUEST_ROUTE_LIST';
export const RECEIVE_ROUTE_LIST = 'RECEIVE_ROUTE_LIST';
export const REQUEST_ROUTE_CONFIG = 'REQUEST_ROUTE_CONFIG';
export const RECEIVE_ROUTE_CONFIG = 'RECEIVE_ROUTE_CONFIG';

export const requestRouteList = () => ({
  type: REQUEST_ROUTE_LIST,
  meta: {
    url: 'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=ttc'
  }
});

export const requestRouteConfig = routeId => ({
  type: REQUEST_ROUTE_CONFIG,
  meta: {
    url: `http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=${routeId}&terse`
  }
});

export const receiveRouteList = (payload, error = false) => ({
  type: RECEIVE_ROUTE_LIST,
  payload,
  error,
});
