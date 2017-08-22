import * as t from './actionTypes.js';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({

  test: 'wordfd',

  data: {
    routeList: {
      fetching: false,
      payload: []
    },

    routeConfig: {
      fetching: false,
      payload: null
    },
  },
});

const searchReducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case t.ACTION_TEST:
      // console.log(action.test, state.get('test'));
      const test = state.setIn(['prop1'], Immutable.fromJS({}));
      // console.log(test, state);
      return test;

    /*case t.LOAD_ROUTES_FAILURE:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          routeList: Object.assign({}, state.data.routeList, {
            fetching: action.fetching,
            error: action.error
          }),
        }),
        routeField: Object.assign({}, state.routeField, {
          populated: action.populated,
        }),
      });*/

    case t.LOAD_ROUTES_REQUEST:
      console.log('case t.LOAD_ROUTES_REQUEST', action.fetching);
      const nextState = state.setIn(['data', 'routeList', 'fetching'], action.fetching);
      return nextState;
      /*return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          routeList: Object.assign({}, state.data.routeList, {
            fetching: action.fetching,
          }),
        }),
      });*/

    /*case t.LOAD_ROUTES_SUCCESS:
      return Object.assign({}, state, {
        data: Object.assign({}, state.data, {
          routeList: Object.assign({}, state.data.routeList, {
            fetching: action.fetching,
            payload: action.payload
          }),
        }),
        fields: Object.assign({}, state.fields, {
          route: Object.assign({}, state.fields.route, {
            populated: action.populated,
          }),
        }),
      });*/

    /*case t.SELECTED_ROUTE:
      return Object.assign({}, state, {
        fields: Object.assign({}, state.fields, {
          route: Object.assign({}, state.fields.route, {
            selected: action.selected,
          }),
        }),
      });

    case t.LOAD_ROUTE_CONFIG_REQUEST:
      console.log('LOAD_ROUTE_CONFIG_REQUEST')
      return Object.assign({}, state, {
        routeConfig: Object.assign({}, state.routeConfig, {
          fetching: action.fetching,
        }),
      });

    case t.LOAD_ROUTE_CONFIG_SUCCESS:
      console.log('LOAD_ROUTE_CONFIG_SUCCESS')
      return Object.assign({}, state, {
        routeConfig: Object.assign({}, state.routeConfig, {
          fetching: action.fetching,
          data: action.payload
        }),
      });

    case t.LOAD_ROUTE_CONFIG_FAILURE:
      return Object.assign({}, state, {
        routeConfig: Object.assign({}, state.routeConfig, {
          fetching: action.fetching,
          error: action.error
        }),
      });

    case t.LOAD_DIRECTIONS_REQUEST:
      console.log('LOAD_DIRECTIONS_REQUEST')
      return Object.assign({}, state, {
        directionField: Object.assign({}, state.directionField, {
          fetching: action.fetching,
        }),
      });*/

    default:
      return state
  }
};

export default (searchReducer);
