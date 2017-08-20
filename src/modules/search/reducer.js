import * as t from './actionTypes.js';

const initialState = {

  data: {
    routeList: [],
    routeConfig: [],
  },

  route: {
    fetching: false,
    populated: false,
    selected: null
  },

  direction: {
    fetching: false,
    populated: false,
    selected: null
  },

  stops: {
    fetching: false,
    populated: false,
    selected: null
  },
};

const searchReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case t.LOAD_ROUTES_FAILURE:
      return Object.assign({}, state, {
        route: Object.assign({}, state.route, {
          fetching: action.fetching,
          populated: action.populated,
        }),
      });

    case t.LOAD_ROUTES_REQUEST:
      return Object.assign({}, state, {
        route: Object.assign({}, state.route, {
          fetching: action.fetching,
          populated: action.populated,
        }),
      });

    case t.LOAD_ROUTES_SUCCESS:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          routeList: action.payload
        }),
        route: Object.assign({}, state.route, {
          fetching: action.fetching,
          populated: action.populated,
        }),
      });

    case t.SELECTED_ROUTE:
      return Object.assign({}, state, {
        route: Object.assign({}, state.route, {
          selected: action.selected,
        }),
      });

    default:
      return state
  }
};

export default (searchReducer);
