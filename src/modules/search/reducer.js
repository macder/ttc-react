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
};

const searchReducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case t.LOAD_ROUTES_REQUEST:
      return Object.assign({}, state, {
        fetchingRoutes: action.fetch,
        loadedRoutes: action.populated
      });

    case t.LOAD_ROUTES_SUCCESS:
      return Object.assign({}, state, {
        fetchingRoutes: action.fetch,
        loadedRoutes: action.populated
      });

    case t.SELECTED_ROUTE:
      return Object.assign({}, state, {
        selectedRoute: action.selected
      });

    default:
      return state
  }
};

export default (searchReducer);
