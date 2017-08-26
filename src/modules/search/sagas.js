import "regenerator-runtime/runtime";

import Immutable from 'immutable';
import { delay } from 'redux-saga'
import { all, call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects'

import * as t from './actionTypes';
import * as actions from './actions';
import {httpGet} from '../../services/httpRequest';
import {parseXML} from '../../services/parsers';


/**
 * Worker Saga: will be fired on LOAD_ROUTE_CONFIG_REQUEST actions
 * @param {object} action - redux action
 */
function* fetchRouteConfig(action) {
  const routeTag = action.payload;
  try {
    const url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=' + routeTag;
    const options = {
      trim: true,
      mergeAttrs: true,
      explicitArray: false,
    };

    const data = parseXML(yield call(httpGet, url), options).body.route;
    yield put(actions.loadRouteConfigSuccess(data));

  } catch (e) {
    yield put(actions.loadRouteConfigFailure(e));
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

/**
 * Starts fetchRoutes on each dispatched `LOAD_ROUTES_REQUEST` action.
 * Allows concurrent fetches.
 *
 */
function* loadRouteList() {
  yield takeEvery(t.LOAD_ROUTES_REQUEST, fetchRouteList);
}

/**
 * Starts fetchRouteConfig on each dispatched `LOAD_ROUTE_CONFIG_REQUEST` action.
 * Allows concurrent fetches.
 *
 */
function* loadRouteConfig() {
  yield takeEvery(t.LOAD_ROUTE_CONFIG_REQUEST, fetchRouteConfig);
}

export default function* rootSaga() {
  yield all ([
    loadRouteList(),
    loadRouteConfig()
  ])
}
