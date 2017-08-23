import "regenerator-runtime/runtime";

import Immutable from 'immutable';
import { delay } from 'redux-saga'
import { all, call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects'

import * as t from './actionTypes';
import * as actions from './actions';
import {httpGet} from '../../services/httpRequest';
import {parseXML} from '../../services/parsers';

// selectors
// TODO: move to a selector file
const getRoute = state => state.searchState.routeField;

/**
 * Worker Saga: will be fired on LOAD_ROUTE_CONFIG_REQUEST actions
 * @param {object} action - redux action
 */
function* fetchRouteConfig(routeTag) {
  console.log('fetchRouteConfig');
  // const routeTag = action.payload;
  try {
    const url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=' + routeTag;
    const options = {
      trim: true,
      mergeAttrs: true,
      explicitArray: false,
    };

    const data = parseXML(yield call(httpGet, url), options).body.route;
    yield put(actions.loadRouteConfigSuccess(data));
    return true;

    // yield call(loadDirections, data.direction);

  } catch (e) {
    yield put(actions.loadRouteConfigFailure(e));
    return false;
  }
}


/**
 * Worker Saga: will be fired on LOAD_ROUTES_REQUEST actions
 * @param {object} action - redux action
 */
function* fetchRouteList(action) {
  try {
    const url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc';
    const options = {
      trim: true,
      mergeAttrs: true,
      explicitArray: false,
    };

    const data = parseXML(yield call(httpGet, url), options).body.route;

    /*const data = Immutable.fromJS(
      parseXML(yield call(httpGet, url), options).body.route
    );*/

    //console.dir(data);
    //console.dir(yield call( Immutable.fromJS, data));


    const list = data.map(function(obj) {
      return {
        id: obj.tag,
        title: obj.title,
      }
    });

    yield put(actions.loadRoutesSuccess(list));

  } catch (e) {
    yield put(actions.loadRoutesFailure(e));
  }
}

function setDirections(){
  console.log('directions');

  // yield put(actions.loadDirectionsRequest());
}

/**
 * Starts fetchRoutes on each dispatched `LOAD_ROUTES_REQUEST` action.
 * Allows concurrent fetches.
 *
 */
function* loadRouteList() {
  yield takeEvery(t.LOAD_ROUTES_REQUEST, fetchRouteList);
}

/**
 * Starts fetchRoutes on each dispatched `LOAD_ROUTES_REQUEST` action.
 * Allows concurrent fetches.
 *
 */
function* selectRoute() {
  yield takeEvery(t.SELECTED_ROUTE, test);
}

function test(){
  console.log('test - route selected');
}

/**
 * Starts fetchRouteConfig on each dispatched `LOAD_ROUTE_CONFIG_REQUEST` action.
 * Allows concurrent fetches.
 *
 */
function* loadRouteConfig() {
  while (true) {


    yield take(t.LOAD_ROUTE_CONFIG_REQUEST);
    const routeTag = yield select(getRoute);
    if ( yield call (fetchRouteConfig, routeTag.selected.id) ) {
      console.log('test');
      //setDirections();
      yield takeLatest(t.LOAD_DIRECTIONS_REQUEST, setDirections);
      // call (setDirections);
      console.log('test2');
    }
    // yield call (fetchRouteConfig, routeTag.selected.id);



  }
}

/**
 * Starts setDirections on each dispatched `LOAD_DIRECTIONS_REQUEST` action.
 * Allows concurrent fetches.
 *
 */
/*function* loadDirections() {
  yield takeEvery(t.LOAD_DIRECTIONS_REQUEST, setDirections);
}*/

export default function* rootSaga() {
  yield all ([
    loadRouteList(),
    selectRoute()
    // loadRouteConfig()
    // loadDirections()
  ])
}
