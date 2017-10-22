// import 'regenerator-runtime/runtime';

import { all, call, put, takeEvery } from 'redux-saga/effects';
import { mapEntitiesFromConfig, mapRouteEntity } from './models';
import httpGet from '../../services/httpRequest';
import {
  REQUEST_ROUTE_LIST, REQUEST_ROUTE_CONFIG,
  receiveRouteList, receiveRouteConfig
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

    yield put(args.nextAction(normalized));
  } catch (e) {
    yield put(args.nextAction(e, true));
  }
}

/**
 * Starts fetch on each dispatched `REQUEST_ROUTE_LIST` action.
 * Allows concurrent fetches.
 *
 */
function* loadRouteList() {
  const args = {
    nextAction: receiveRouteList,
    normalize: mapRouteEntity,
  };
  yield takeEvery(REQUEST_ROUTE_LIST, fetch, args);
}

/**
 * Starts fetch on each dispatched `REQUEST_ROUTE_CONFIG` action.
 * Allows concurrent fetches.
 *
 */
function* loadRouteConfig() {
  const args = {
    nextAction: receiveRouteConfig,
    normalize: mapEntitiesFromConfig,
  };
  yield takeEvery(REQUEST_ROUTE_CONFIG, fetch, args);
}

export default function* rootSaga() {
  yield all([
    loadRouteList(),
    loadRouteConfig(),
  ]);
}
