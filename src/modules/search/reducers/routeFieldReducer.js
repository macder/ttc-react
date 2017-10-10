import Immutable from 'immutable';
import * as t from '../actionTypes';

const initialState = Immutable.fromJS({
  selected: null,
  // visible: false,
});

const routeFieldReducer = (state = initialState, action = {}) => {
  switch (action.type) {

    /*case t.LOAD_ROUTES_REQUEST:
      return state
        .set('visible', true);*/

    case t.SELECTED_ROUTE:
      return state.set('selected', action.selected)

    case t.CLEAR_ROUTE:
      return state
        .set('selected', action.selected);

    default:
      return state;
  }
};

export default (routeFieldReducer);
