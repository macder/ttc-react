import Immutable from 'immutable';
import * as t from '../actionTypes';

const initialState = Immutable.fromJS({
  routeList: {
    fetching: false,
    payload: null,
  },
  routeConfig: {
    fetching: false,
    payload: null,
  },
});

const dataReducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case t.LOAD_ROUTES_REQUEST:
      return state.setIn(['routeList','fetching'], action.fetching);

    case t.LOAD_ROUTES_SUCCESS:
      return state
        .setIn(['routeList','fetching'], action.fetching)
        .setIn(['routeList','payload'], action.payload);

    case t.LOAD_ROUTES_FAILURE:
      return state
        .setIn(['routeList','fetching'], action.fetching)
        .setIn(['routeList','payload'], action.payload)
        .setIn(['routeList','error'], action.error);

    case t.LOAD_ROUTE_CONFIG_REQUEST:
      return state
        .setIn(['routeConfig','fetching'], action.fetching)
        .setIn(['routeConfig','payload'], action.payload);

    case t.LOAD_ROUTE_CONFIG_SUCCESS:
      return state
        .setIn(['routeConfig','fetching'], action.fetching)
        .setIn(['routeConfig','payload'], action.payload);

    case t.LOAD_ROUTE_CONFIG_FAILURE:
      return state
        .setIn(['routeConfig','fetching'], action.fetching)
        .setIn(['routeConfig','error'], action.error)
        .setIn(['routeConfig','payload'], action.payload);

    default:
      return state;
  }
};

export default (dataReducer);
