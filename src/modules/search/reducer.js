import * as t from './actionTypes.js';

const initialState = {

  routeList: {
    fetching: false,
    data: []
  },

  routeConfig: {
    fetching: false,
    data: []
  },

  routeField: {
    populated: false,
    selected: null
  },

  directionField: {
    populated: false,
    selected: null
  },

  stopField: {
    populated: false,
    selected: null
  },


};
const searchReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.LOAD_ROUTES_FAILURE:
      return Object.assign({}, state, {
        routeList: Object.assign({}, state.routeList, {
          fetching: action.fetching,
          error: action.error
        }),
        routeField: Object.assign({}, state.routeField, {
          populated: action.populated,
        }),
      });

    case t.LOAD_ROUTES_REQUEST:
      return Object.assign({}, state, {
        routeList: Object.assign({}, state.routeList, {
          fetching: action.fetching,
        }),
      });

    case t.LOAD_ROUTES_SUCCESS:
      return Object.assign({}, state, {
        routeList: Object.assign({}, state.routeList, {
          fetching: action.fetching,
          data: action.payload
        }),
        routeField: Object.assign({}, state.routeField, {
          populated: action.populated,
        }),
      });

    case t.SELECTED_ROUTE:
      return Object.assign({}, state, {
        routeField: Object.assign({}, state.routeField, {
          selected: action.selected,
        }),
      });

    case t.LOAD_ROUTE_CONFIG_REQUEST:
      return Object.assign({}, state, {
        routeConfig: Object.assign({}, state.routeConfig, {
          fetching: action.fetching,
        }),
      });

    case t.LOAD_ROUTE_CONFIG_SUCCESS:
      return Object.assign({}, state, {
        routeConfig: Object.assign({}, state.routeConfig, {
          fetching: action.fetching,
          data: action.payload
        }),
      });

    default:
      return state
  }
};

export default (searchReducer);
