import "regenerator-runtime/runtime";
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as t from './actionTypes';

const fetch = () => {
  return [
    /* {text: title, value: tag} */
    {text: '5-Avenue Road', value: '5'},
    {text: '6-Bay', value: '6'},
    {text: '7-Bathurst', value: '7'},
    {text: '8-Broadview', value: '8'},
  ];
}

// worker Saga: will be fired on LOAD_ROUTES_REQUEST actions
function* fetchRoutes(action) {
  console.log('fetchRoutes');
  try {
    // const user = yield call(Api.fetchRoutes, action.payload.userId);
    const list = yield call(fetch)

    yield put({
      type: "LOAD_ROUTES_SUCCESS",
      fetch: false,
      populated: true
    });

  } catch (e) {
    yield put({type: "LOAD_ROUTES_FAILURE", message: e.message});
  }
}

/*
  Starts fetchRoutes on each dispatched `LOAD_ROUTES_REQUEST` action.
  Allows concurrent fetches.
*/
function* loadRouteList() {
  console.log('loadRouteList');
  yield takeEvery(t.LOAD_ROUTES_REQUEST, fetchRoutes);
}

export default loadRouteList;
