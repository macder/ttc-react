import "regenerator-runtime/runtime";

import { all, call, put, takeEvery } from 'redux-saga/effects'

import * as t from './actionTypes';
import * as actions from './actions';
import {httpGet} from '../../services/httpRequest';
import {parseXML} from '../../services/parsers';

/**
 * Worker Saga: will be fired on
 *  LOAD_ROUTES_REQUEST and LOAD_ROUTE_CONFIG_REQUEST actions
 * @param {object} args
 * @param {object} action - redux action
 */
function* fetch(args, action){
  try {
    const options = {
      trim: true,
      mergeAttrs: true,
      explicitArray: false,
    };

    const data = parseXML(yield call(httpGet, action.url), options).body.route;

    yield put(actions[args.success](data));

  } catch (e) {
    yield put(actions[args.fail](e));
  }
}

/**
 * Starts fetch on each dispatched `LOAD_ROUTES_REQUEST` action.
 * Allows concurrent fetches.
 *
 */
function* loadRouteList() {
  const args = {
    success: 'loadRoutesSuccess',
    fail: 'loadRoutesFailure',
  };
  yield takeEvery(t.LOAD_ROUTES_REQUEST, fetch, args);
}

/**
 * Starts fetch on each dispatched `LOAD_ROUTE_CONFIG_REQUEST` action.
 * Allows concurrent fetches.
 *
 */
function* loadRouteConfig() {
  const args = {
    success: 'loadRouteConfigSuccess',
    fail: 'loadRouteConfigFailure',
  };
  yield takeEvery(t.LOAD_ROUTE_CONFIG_REQUEST, fetch, args);
}

export default function* rootSaga() {
  yield all ([
    loadRouteList(),
    loadRouteConfig()
  ])
}
