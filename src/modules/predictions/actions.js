import * as t from './actionTypes';

/**
 *
 * @return {object}
 */
export const loadPredictionsRequest = (routeId, stopId) => ({
  type: t.LOAD_PREDICTIONS_REQUEST,
  fetching: true,
  visible: true,
  url: `http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&r=${routeId}&s=${stopId}`,
});

/**
 *
 * @return {object}
 */
export const loadPredictionsSuccess = payload => ({
  type: t.LOAD_PREDICTIONS_SUCCESS,
  fetching: false,
  visible: true,
  payload,
});

/**
 *
 * @return {object}
 */
export const loadPredictionsFailure = e => ({
  type: t.LOAD_PREDICTIONS_FAILURE,
  fetching: false,
  visible: false,
  payload: null,
  error: e.message,
});

/**
 *
 * @return {object}
 */
export const clearPredictions = () => ({
  type: t.CLEAR_PREDICTIONS,
  fetching: false,
  visible: false,
  payload: null,
});
