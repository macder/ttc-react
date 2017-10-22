import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';
import {
  REQUEST_ROUTE_LIST, RECEIVE_ROUTE_LIST,
  REQUEST_ROUTE_CONFIG, RECEIVE_ROUTE_CONFIG
} from './actions'
import { initialEntityState } from './models';

const entityReducer = (state = initialEntityState, action = {}) => {
  switch (action.type) {
    case REQUEST_ROUTE_LIST:
      return state.setIn(['status', 'routeListFetching'], action.payload.fetching);

    case RECEIVE_ROUTE_LIST:
      return state
        .set('route', action.payload.route)
        .setIn(['status', 'routeListFetching'], action.payload.fetching);

    case REQUEST_ROUTE_CONFIG:
      return state;

    case RECEIVE_ROUTE_CONFIG:
      return state;

    default:
      return state;
  }
};

export default entityReducer
