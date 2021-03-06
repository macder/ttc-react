// import 'regenerator-runtime/runtime';

import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { mapEntitiesFromConfig, mapHttpError, mapPredictions, mapRouteEntity } from './models';
import httpGet from '../../services/httpRequest';
import {
  REQUEST_ROUTE_LIST, REQUEST_ROUTE_CONFIG, REQUEST_PREDICTION,
  receiveRouteList, receiveRouteConfig, receivePrediction,
  addDirection, addRouteList, addStop, addPrediction,
} from './actions';

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
    const error = yield call(mapHttpError, e);
    yield call(callback, error, null, true);
  }
}

function* loadRouteList(payload, meta, error = false) {
  if (!error) {
    yield put(receiveRouteList({ fetching: false }));
    const normalizedMap = yield call(mapRouteEntity, payload);
    yield put(addRouteList(normalizedMap));
  } else {
    yield put(receiveRouteList(payload, true));
  }
}

function* loadRouteConfig(payload, meta, error = false) {
  if (!error) {
    yield put(receiveRouteConfig({ fetching: false }));
    const normalizedMap = yield call(mapEntitiesFromConfig, payload);
    yield put(addDirection(normalizedMap.get('direction'), meta.routeId));
    yield put(addStop(normalizedMap.get('stop')));
  } else {
    yield put(receiveRouteConfig(payload, true));
  }
}

function* loadPredictions(payload, meta, error = false) {
  if (!error) {
    yield put(receivePrediction({ fetching: false }));
    const normalizedMap = yield call(mapPredictions, payload);
    yield put(addPrediction(normalizedMap));
  } else {
    yield put(receivePrediction(payload, true));
  }
}

/**
 * Starts fetch on each dispatched `REQUEST_PREDICTIONS` action.
 * Allows concurrent fetches.
 *
 */
function* requestPredictions() {
  yield takeLatest(REQUEST_PREDICTION, fetch, loadPredictions);
}

/**
 * Starts fetch on each dispatched `REQUEST_ROUTE_LIST` action.
 * Allows concurrent fetches.
 *
 */
function* requestRouteList() {
  yield takeLatest(REQUEST_ROUTE_LIST, fetch, loadRouteList);
}

/**
 * Starts fetch on each dispatched `REQUEST_ROUTE_CONFIG` action.
 * Allows concurrent fetches.
 *
 */
function* requestRouteConfig() {
  yield takeLatest(REQUEST_ROUTE_CONFIG, fetch, loadRouteConfig);
}

export default function* rootSaga() {
  yield all([
    requestRouteList(),
    requestRouteConfig(),
    requestPredictions(),
  ]);
}
