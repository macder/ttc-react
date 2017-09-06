import "regenerator-runtime/runtime";

import { all, call, put, takeEvery } from 'redux-saga/effects'

import * as t from './actionTypes';
import * as actions from './actions';
import {httpGet} from '../../services/httpRequest';
import {parseXML} from '../../services/parsers';

/**
 * Worker Saga: will be fired on
 *  LOAD_PREDICTIONS_REQUEST actions
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
    const data = parseXML(yield call(httpGet, action.url), options).body.predictions;
    yield put(actions[args.success](data));

  } catch (e) {
    yield put(actions[args.fail](e));
  }
}

/**
 * Starts fetch on each dispatched `LOAD_PREDICTIONS_REQUEST` action.
 * Allows concurrent fetches.
 *
 */
function* loadPredictions() {
  const args = {
    success: 'loadPredictionsSuccess',
    fail: 'loadPredictionsFailure',
  };
  yield takeEvery(t.LOAD_PREDICTIONS_REQUEST, fetch, args);
}

export default function* rootSaga() {
  yield all ([
    loadPredictions(),
  ])
}
