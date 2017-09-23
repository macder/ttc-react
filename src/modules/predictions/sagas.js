import 'regenerator-runtime/runtime';

import Immutable from 'immutable';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import * as t from './actionTypes';
import * as actions from './actions';
import { httpGet } from '../../services/httpRequest';

/**
 * Worker Saga: will be fired on
 *  LOAD_PREDICTIONS_REQUEST actions
 * @param {object} args
 * @param {object} action - redux action
 */
function* fetch(args, action) {
  try {
    const payload = yield call(httpGet, action.url);
    const data = yield call(format, payload.predictions);
    yield put(actions[args.success](data));
  } catch (e) {
    yield put(actions[args.fail](e));
  }
}

/**
 * Formats and converts prediction data to ImmutableJS
 *
 * @param {object} payload
 * @return {immutable}
 */
function format(payload) {
  if (payload.direction) {
    const data = Immutable.fromJS(payload.direction);

    if (Array.isArray(payload.direction)) { // multi directions
      return new Immutable.List(data.map(item =>
        new Immutable.Map({
          title: item.get('title'),
          prediction: formatPrediction(item.get('prediction')),
        })
      ));
    }
    return new Immutable.Map({
      title: data.get('title'),
      prediction: formatPrediction(data.get('prediction')),
    });
  }
  return new Immutable.Map({});
}

/**
 * Formats prediction to immutable records
 *
 * @param {immutable} data
 * @return {immutable}
 */
function formatPrediction(data) {
  const PredictionRecord = new Immutable.Record({
    affectedByLayover: 'false',
    block: '',
    branch: '',
    dirTag: '',
    epochTime: '',
    isDeparture: '',
    minutes: '',
    seconds: '',
    tripTag: '',
    vehicle: '',
  });

  if(Immutable.Map.isMap(data)) { // single prediction
    return new PredictionRecord(data);
  }
  return new Immutable.OrderedSet(data).map(PredictionRecord);
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
  yield all([
    loadPredictions(),
  ]);
}
