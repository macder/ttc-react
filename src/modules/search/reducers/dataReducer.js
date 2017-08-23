import * as t from '../actionTypes.js';

const initialState = {

  routeList: {
    fetching: false,
    payload: []
  },

  routeConfig: {
    fetching: false,
    payload: null
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

    default:
      return state
  }
};

export default (dataReducer);
