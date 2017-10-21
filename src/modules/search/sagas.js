// import 'regenerator-runtime/runtime';

import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as t from './actionTypes';
import * as actions from './actions';
import { mapRouteEntities } from './model';
import httpGet from '../../services/httpRequest';

/**
 * Worker Saga: will be fired on
 *  LOAD_ROUTES_REQUEST and LOAD_ROUTE_CONFIG_REQUEST actions
 * @param {object} args
 * @param {object} action - redux action
 */
function* fetch(args, action) {
  try {
    const data = yield call(httpGet, action.url);
    const normalized = yield call(args.callback, data.route);

    console.dir(normalized);

    yield put(actions[args.success](normalized));
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
    callback: mapRouteEntities,
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
    callback: 'test',
  };
  yield takeEvery(t.LOAD_ROUTE_CONFIG_REQUEST, fetch, args);
}

export default function* rootSaga() {
  yield all([
    loadRouteList(),
    loadRouteConfig(),
  ]);
}
