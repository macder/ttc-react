import * as t from './actionTypes';

/**
 *
 * @return {object}
 */
export const loadPredictionsRequest = (routeId, stopId) => {
  return {
    type: t.LOAD_PREDICTIONS_REQUEST,
    fetching: true,
    url: 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&r=' + routeId +'&s=' + stopId,
  };
};

/**
 *
 * @return {object}
 */
export const loadPredictionsSuccess = (payload) => {
  return {
    type: t.LOAD_PREDICTIONS_SUCCESS,
    fetching: false,
    visible: true,
    payload
  };
};

/**
 *
 * @return {object}
 */
export const loadPredictionsFailure = (e) => {
  return {
    type: t.LOAD_PREDICTIONS_FAILURE,
    fetching: false,
    visible: false,
    payload: null,
    error: e.message,
  };
};

