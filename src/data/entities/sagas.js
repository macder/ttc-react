// import 'regenerator-runtime/runtime';

import { all, call, put, takeEvery } from 'redux-saga/effects';
import { mapEntitiesFromConfig, mapRouteEntity } from './models';
import httpGet from '../../services/httpRequest';
import {
  REQUEST_ROUTE_LIST, REQUEST_ROUTE_CONFIG,
  receiveRouteList, receiveRouteConfig,
  addDirection, addRouteList, addStop,
} from './actions'

/**
 * Worker Saga: will be fired on
 *  REQUEST_ROUTE_LIST and REQUEST_ROUTE_CONFIG actions
 * @param {object} args
 * @param {object} action - redux action
 */
function* fetch(callback, action) {
  try {
    const data = yield call(httpGet, action.meta.url);
    yield call(callback, data, action.meta);
  } catch (e) {
    yield call(callback, e, true);
  }
}

function* loadRouteList(payload, meta, error = false) {
  if (!error) {
    yield put(receiveRouteList({fetching: false}));
    yield put(addRouteList(mapRouteEntity(payload)));
  }
  else {
    yield put(receiveRouteList(payload, true));
  }
}

function* loadRouteConfig(payload, meta, error = false) {
  if (!error) {
    yield put(receiveRouteConfig({fetching: false}));
    const data = mapEntitiesFromConfig(payload);
    yield put(addDirection(data.get('direction'), meta.routeId));
    yield put(addStop(data.get('stop')));
  }
  else {

  }
}

/**
 * Starts fetch on each dispatched `REQUEST_ROUTE_LIST` action.
 * Allows concurrent fetches.
 *
 */
function* requestRouteList() {
  yield takeEvery(REQUEST_ROUTE_LIST, fetch, loadRouteList);
}

/**
 * Starts fetch on each dispatched `REQUEST_ROUTE_CONFIG` action.
 * Allows concurrent fetches.
 *
 */
function* requestRouteConfig() {
  const args = {
    nextAction: receiveRouteConfig,
    normalize: mapEntitiesFromConfig,
  };
  yield takeEvery(REQUEST_ROUTE_CONFIG, fetch, loadRouteConfig);
}

export default function* rootSaga() {
  yield all([
    requestRouteList(),
    requestRouteConfig(),
  ]);
}
