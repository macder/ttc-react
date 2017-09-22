import 'regenerator-runtime/runtime';

import Immutable from 'immutable';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import * as t from './actionTypes';
import * as actions from './actions';
import { httpGet } from '../../services/httpRequest';
import { parseXML } from '../../services/parsers';

/**
 * Worker Saga: will be fired on
 *  LOAD_PREDICTIONS_REQUEST actions
 * @param {object} args
 * @param {object} action - redux action
 */
function* fetch(args, action) {
  try {
    const options = {
      trim: true,
      mergeAttrs: true,
      explicitArray: false,
    };

    // const data = parseXML(yield call(httpGet, action.url), options).body.predictions;
    const data = yield call(httpGet, action.url);

    // console.dir(data);

    const test = yield call(format, data.predictions);

    console.dir(test);

    // yield put(actions[args.success](data));
  } catch (e) {
    yield put(actions[args.fail](e));
  }
}

function format(payload) {
  // console.dir(payload);

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

  if (payload.direction) {
    // console.log('has predictions');
    //console.dir(payload.direction);
    // const test = Immutable.fromJS(payload.direction);
    // console.dir(test);

    if (Array.isArray(payload.direction)) {
      //console.log('is array');
      //console.dir(payload.direction);

      const data = Immutable.fromJS(payload.direction);

      // console.dir(data);

      return new Immutable.List(data.map(item => {
        //console.dir(item);
        let prediction;

        if(Immutable.Map.isMap(item.get('prediction'))) {
          console.log('is map');
          // const prediction = new Immutable.OrderedSet(item.get('prediction')).map(PredictionRecord);
          // const prediction = item.get('prediction').map(PredictionRecord);
          prediction = new PredictionRecord(item.get('prediction'));
          // console.dir(prediction);
        } else {
          prediction = new Immutable.OrderedSet(item.get('prediction')).map(PredictionRecord);
        }

        // console.dir(prediction);
        // console.dir(item.get('prediction'));

        return new Immutable.Map({
          title: item.get('title'),
          // prediction: new Immutable.OrderedSet(item.get('prediction')).map(PredictionRecord),
          prediction: prediction,
        })
      }));
      // console.dir(lorem);

    }

  }

  return {hello: 'world'}
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
