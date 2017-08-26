import * as t from '../actionTypes.js';

const initialState = {

  routeList: {
    fetching: false,
    payload: []
  },

  routeConfig: {
    fetching: false,
    payload: {}
  },
};

const dataReducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case t.LOAD_ROUTES_FAILURE:
      return Object.assign({}, state, {
        routeList: Object.assign({}, state.routeList, {
          fetching: action.fetching,
          populated: action.populated,
          error: action.error
        }),
      });

    case t.LOAD_ROUTES_REQUEST:
      return Object.assign({}, state, {
        routeList: Object.assign({}, state.routeList, {
          fetching: action.fetching,
          populated: action.populated
        }),
      });


    case t.LOAD_ROUTES_SUCCESS:
      return Object.assign({}, state, {
        routeList: Object.assign({}, state.routeList, {
          fetching: action.fetching,
          payload: action.payload,
          populated: action.populated
        }),
      });

    case t.LOAD_ROUTE_CONFIG_REQUEST:
      return Object.assign({}, state, {
        routeConfig: Object.assign({}, state.routeConfig, {
          fetching: action.fetching,
          payload: null
        }),
      });

    case t.LOAD_ROUTE_CONFIG_SUCCESS:
      return Object.assign({}, state, {
        routeConfig: Object.assign({}, state.routeConfig, {
          fetching: action.fetching,
          payload: action.payload,
        }),
      });

    default:
      return state
  }
};

export default (dataReducer);
