import * as t from './actionTypes';

/**
 *
 * @return {object}
 */
export const loadPredictionsRequest = (routeId, stopId) => ({
    type: t.LOAD_PREDICTIONS_REQUEST,
    fetching: true,
    url: `http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=ttc&r=${routeId}&s=${stopId}`,
    // url: '/data/prediction_2dirs_multi.json',
    // url: '/data/prediction_1dir_single.json',
    // url: '/data/prediction_2dirs_1multi_1single.json',
    // url: '/data/prediction_1dir_multi.json',
    // url: '/data/prediction_nonr.json',

});

/**
 *
 * @return {object}
 */
export const loadPredictionsSuccess = payload => ({
  type: t.LOAD_PREDICTIONS_SUCCESS,
  fetching: false,
  payload,
});

/**
 *
 * @return {object}
 */
export const loadPredictionsFailure = e => ({
  type: t.LOAD_PREDICTIONS_FAILURE,
  fetching: false,
  payload: null,
  error: e.message,
});

/**
 *
 * @return {object}
 */
export const clearPredictions = () => ({
  type: t.CLEAR_PREDICTIONS,
  payload: null,
  error: null,
});
