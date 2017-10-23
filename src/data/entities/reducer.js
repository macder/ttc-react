import { combineReducers } from 'redux-immutable';
import { List, Map } from 'immutable';
import {
  ADD_ROUTE_LIST, ADD_DIRECTION,
  REQUEST_ROUTE_LIST, RECEIVE_ROUTE_LIST,
  REQUEST_ROUTE_CONFIG, RECEIVE_ROUTE_CONFIG
} from './actions'

const initialState = new Map({
  allIds: new List(),
  byId: new Map(),
  isFetching: false,
  error: false,
})

const routeEntityReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_ROUTE_LIST:
      return state
        .set('isFetching', action.payload.fetching)
        .set('error', action.payload.error);

    case RECEIVE_ROUTE_LIST:
      return (!action.error)
        ? state.set('isFetching', action.payload.fetching)
        : state
          .set('isFetching', false)
          .set('error', action.payload);

    case ADD_ROUTE_LIST:
      return state
        .set('byId', action.payload.get('byId'))
        .set('allIds', action.payload.get('allIds'));

    default:
      return state;
  }
};

const directionEntityReducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case REQUEST_ROUTE_CONFIG:
      return state
        .set('isFetching', action.payload.fetching)
        .set('error', action.payload.error);

    case RECEIVE_ROUTE_CONFIG:
      return (!action.error)
        ? state.set('isFetching', action.payload.fetching)
        : state
          .set('isFetching', false)
          .set('error', action.payload);

    case ADD_DIRECTION:
      return state.mergeIn(['byId'], action.payload.get('byId'));

    default:
      return state;
  }
}

const entityReducer = combineReducers({
  route: routeEntityReducer,
  direction: directionEntityReducer,
});



export default entityReducer
