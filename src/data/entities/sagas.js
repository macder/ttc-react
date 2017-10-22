// import 'regenerator-runtime/runtime';

import { all, call, put, takeEvery } from 'redux-saga/effects';
import { mapRouteEntities } from './models';
import httpGet from '../../services/httpRequest';
import {
  REQUEST_ROUTE_LIST, RECEIVE_ROUTE_LIST,
  REQUEST_ROUTE_CONFIG, RECEIVE_ROUTE_CONFIG,
  receiveRouteList
} from './actions'

/**
 * Worker Saga: will be fired on
 *  REQUEST_ROUTE_LIST and REQUEST_ROUTE_CONFIG actions
 * @param {object} args
 * @param {object} action - redux action
 */
function* fetch(args, action) {
  try {
    const data = yield call(httpGet, action.meta.url);
    const normalized = yield call(args.normalize, data);

    yield put(receiveRouteList(normalized));
  } catch (e) {
    yield put(receiveRouteList(e, true));
  }
}

/**
 * Starts fetch on each dispatched `LOAD_ROUTES_REQUEST` action.
 * Allows concurrent fetches.
 *
 */
function* loadRouteList() {
  const args = {
    nextAction: receiveRouteList,
    normalize: mapRouteEntities,
  };
  yield takeEvery(REQUEST_ROUTE_LIST, fetch, args);
}

/**
 * Starts fetch on each dispatched `LOAD_ROUTE_CONFIG_REQUEST` action.
 * Allows concurrent fetches.
 *
 */
/*function* loadRouteConfig() {
  const args = {
    success: 'loadRouteConfigSuccess',
    fail: 'loadRouteConfigFailure',
    callback: 'test',
  };
  yield takeEvery(t.LOAD_ROUTE_CONFIG_REQUEST, fetch, args);
}*/

export default function* rootSaga() {
  yield all([
    loadRouteList(),
    // loadRouteConfig(),
  ]);
}
