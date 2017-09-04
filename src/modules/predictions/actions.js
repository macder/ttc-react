import * as t from './actionTypes';

/**
 *
 * @return {object}
 */
export const loadPredictionsRequest = () => {
  return {
    type: t.LOAD_PREDICTIONS_REQUEST,
    fetching: true,
    url: 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&r=7&s=5739'
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
export const loadPredictionsFailure = () => {
  return {
    type: t.LOAD_PREDICTIONS_FAILURE,
    fetching: false,
  };
};
