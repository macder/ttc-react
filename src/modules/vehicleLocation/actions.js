import * as t from './actionTypes';

/**
 *
 * @return {object}
 */
export const loadVehLocationRequest = (route) => ({
  type: t.LOAD_VEHICLE_LOCATION_REQUEST,
  fetching: true,
  url: 'http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=ttc&r=300&t=0',
});

/**
 *
 * @param {object} payload.
 * @return {object}
 */
export const loadVehLocationSuccess = payload => ({
  type: t.LOAD_VEHICLE_LOCATION_SUCCESS,
  fetching: false,
  payload,
});

/**
 *
 * @return {object}
 */
export const loadVehLocationFailure = e => ({
  type: t.LOAD_VEHICLE_LOCATION_FAILURE,
  fetching: false,
  payload: null,
  error: e.message,
});
