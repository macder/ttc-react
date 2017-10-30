import { combineReducers } from 'redux-immutable';
import { List, Map } from 'immutable';
import {
  ADD_ROUTE_LIST, ADD_DIRECTION, ADD_STOP, ADD_PREDICTION,
  REQUEST_ROUTE_LIST, RECEIVE_ROUTE_LIST,
  REQUEST_ROUTE_CONFIG, RECEIVE_ROUTE_CONFIG,
  REQUEST_PREDICTION, RECEIVE_PREDICTION,
} from './actions';

/**
 * General reducer for actions that request data
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map}
 */
const requestFetch = (state, action) => state
  .set('isFetching', action.payload.fetching)
  .set('error', action.payload.error);

/**
 * General reducer for resolved fetch
 * @param {Immutable.Map} state
 * @param {Object} action
 * @return {Immutable.Map}
 */
const receiveFetch = (state, action) => ((!action.error)
  ? state
    .set('error', false)
  : state
    .set('isFetching', false)
    .set('error', action.payload)
);

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

    default:
      return state;
  }
};

const concatList = (prevItems, newItems) => prevItems
  .toOrderedSet()
  .union(newItems)
  .toList();

const directionEntityReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_ROUTE_CONFIG:
      return requestFetch(state, action);

    case RECEIVE_ROUTE_CONFIG:
      return receiveFetch(state, action);

    case ADD_DIRECTION:
      const nextAllIds = concatList(state.get('allIds'), action.payload.data.get('allIds'));
      return state
        .mergeIn(['byId'], action.payload.data.get('byId'))
        .set('allIds', nextAllIds)
        .setIn(['byRouteId', action.payload.routeId], action.payload.data.get('allIds'))
        .set('isFetching', false);

    case 'search/SELECT_ROUTE':
      return state
        .set('error', false)

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
      const nextAllIds = concatList(state.get('allIds'), action.payload.get('allIds'));
      return state
        .mergeIn(['byId'], action.payload.get('byId'))
        .set('allIds', nextAllIds);

    default:
      return state;
  }
};

const clearPrediction = (state) => state
  .set('byId', new Map())
  .set('allIds', new List())
  .delete('byDirId')
  .delete('allDirIds')
  .set('isEmpty', false)
  .set('error', false);

const predictionInitialState = new Map({
  allIds: new List(),
  byId: new Map(),
  isFetching: false,
  error: false,
  isEmpty: false,
});

const predictionEntityReducer = (state = predictionInitialState, action = {}) => {
  switch (action.type) {
    case REQUEST_PREDICTION:
      return requestFetch(state, action);

    case RECEIVE_PREDICTION:
      return receiveFetch(state, action);

    case ADD_PREDICTION:
      if (action.payload) {
        const newState = state
          .set('byId', action.payload.get('byId'))
          .set('allIds', action.payload.get('allIds'))
          .set('isFetching', false);

        return (action.payload.has('byDirId'))
          ? newState
            .set('byDirId', action.payload.get('byDirId'))
            .set('allDirIds', action.payload.get('allDirIds'))
          : newState;
      }

      return state
        .set('isFetching', false)
        .set('isEmpty', true);

    case 'search/SELECT_ROUTE':
      return clearPrediction(state);

    case 'search/SELECT_DIRECTION':
      return clearPrediction(state);

    case 'search/SELECT_STOP':
      return clearPrediction(state);

    default:
      return state;
  }
};

const entityReducer = combineReducers({
  route: routeEntityReducer,
  direction: directionEntityReducer,
  stop: stopEntityReducer,
  prediction: predictionEntityReducer,
});


export default entityReducer;
