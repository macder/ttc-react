import { combineReducers } from 'redux-immutable';
import { List, Map } from 'immutable';
import {
  ADD_ROUTE_LIST, ADD_DIRECTION, ADD_STOP,
  REQUEST_ROUTE_LIST, RECEIVE_ROUTE_LIST,
  REQUEST_ROUTE_CONFIG, RECEIVE_ROUTE_CONFIG,
} from './actions';

/**
 * General reducer for actions that request data
 * @param {Immutable.Map} state
 * @param {Object} state
 * @return {Immutable.Map}
 */
const requestFetch = (state, action) => state
  .set('isFetching', action.payload.fetching)
  .set('error', action.payload.error);

/**
 * General reducer for resolved fetch
 * @param {Immutable.Map} state
 * @param {Object} state
 * @return {Immutable.Map}
 */
const receiveFetch = (state, action) => ((!action.error)
  ? state
  : state
    .set('isFetching', false)
    .set('error', action.payload));


const initialState = new Map({
  allIds: new List(),
  byId: new Map(),
  isFetching: false,
  error: false,
});

const routeEntityReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_ROUTE_LIST:
      return requestFetch(state, action);

    case RECEIVE_ROUTE_LIST:
      return receiveFetch(state, action);

    case ADD_ROUTE_LIST:
      return state
        .set('byId', action.payload.get('byId'))
        .set('allIds', action.payload.get('allIds'))
        .set('isFetching', false);

    case ADD_DIRECTION:
      return state
        .setIn(['byId', action.payload.routeId, 'direction'], action.payload.data.get('allIds'));

    default:
      return state;
  }
};

const directionEntityReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_ROUTE_CONFIG:
      return requestFetch(state, action);

    case RECEIVE_ROUTE_CONFIG:
      return receiveFetch(state, action);

    case ADD_DIRECTION:
      return state
        .mergeIn(['byId'], action.payload.data.get('byId'))
        .set('isFetching', false);

    default:
      return state;
  }
};

const stopEntityReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_ROUTE_CONFIG:
      return requestFetch(state, action);

    case RECEIVE_ROUTE_CONFIG:
      return receiveFetch(state, action);

    case ADD_STOP:
      return state.mergeIn(['byId'], action.payload.get('byId'));

    default:
      return state;
  }
};

const entityReducer = combineReducers({
  route: routeEntityReducer,
  direction: directionEntityReducer,
  stop: stopEntityReducer,
});


export default entityReducer;
