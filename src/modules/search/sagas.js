import "regenerator-runtime/runtime";
import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as t from './actionTypes';
import * as actions from './actions';

function* fetch () {
  yield delay(1000);
  return [
    {text: '5-Avenue Road', value: '5'},
    {text: '6-Bay', value: '6'},
    {text: '7-Bathurst', value: '7'},
    {text: '8-Broadview', value: '8'},
  ];
}

// worker Saga: will be fired on LOAD_ROUTES_REQUEST actions
function* fetchRoutes(action) {
  try {
    // const list = yield call(Api.fetchRoutes, 'arg1', 'arg2');
    const list = yield call(fetch);

    yield put(actions.loadRoutesSuccess(list));

  } catch (e) {
    yield put({type: t.LOAD_ROUTES_FAILURE, message: e.message});
  }
}

/*
  Starts fetchRoutes on each dispatched `LOAD_ROUTES_REQUEST` action.
  Allows concurrent fetches.
*/
function* loadRouteList() {
  yield takeEvery(t.LOAD_ROUTES_REQUEST, fetchRoutes);
}

export default loadRouteList;
