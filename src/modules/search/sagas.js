import "regenerator-runtime/runtime";
import axios from 'axios';

import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import * as t from './actionTypes';
import * as actions from './actions';
import xml2js from 'xml2js';
import {fetch} from '../../services/httpRequest';

/**
 * Worker Saga: will be fired on LOAD_ROUTE_CONFIG_REQUEST actions
 * @param {object} action - redux action
 */
function* fetchRouteConfig(action) {
  const routeTag = action.payload;
  try {
    const url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=' + routeTag;
    const options = {
      trim: true,
      mergeAttrs: true,
      explicitArray: false,
    };

    const data = parseXML(yield call(fetch, url), options).body.route;
    yield put(actions.loadRouteConfigSuccess(data));

  } catch (e) {
    yield put({type: t.LOAD_ROUTE_CONFIG_FAILURE, message: e.message});
  }
}

/**
 * Worker Saga: will be fired on LOAD_ROUTES_REQUEST actions
 * @param {object} action - redux action
 */
function* fetchRouteList(action) {
  try {
    const url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc';
    const options = {
      trim: true,
      mergeAttrs: true,
      explicitArray: false,
    };

    const data = parseXML(yield call(fetch, url), options).body.route;

    const list = data.map(function(obj) {
      return {
        id: obj.tag,
        title: obj.title,
      }
    });

    // console.log(list);
    yield put(actions.loadRoutesSuccess(list));

  } catch (e) {
    // console.log('asdfasdfasdfasdf');
    yield put(actions.loadRoutesFailure(e));
      // {type: t.LOAD_ROUTES_FAILURE, message: e.message});
  }
}

/**
 * Starts fetchRoutes on each dispatched `LOAD_ROUTES_REQUEST` action.
 * Allows concurrent fetches.
 *
 */
function* loadRouteList() {
  yield takeEvery(t.LOAD_ROUTES_REQUEST, fetchRouteList);
}

/**
 * Starts fetchRouteConfig on each dispatched `LOAD_ROUTE_CONFIG_REQUEST` action.
 * Allows concurrent fetches.
 *
 */
function* loadRouteConfig() {
  yield takeEvery(t.LOAD_ROUTE_CONFIG_REQUEST, fetchRouteConfig);
}

/**
 * Parse an XML string into object.
 * @param {string} data - xml string.
 * @param {object} options - for xml2js
 * @return {object} The parsed object.
 */
function parseXML(data, options) {
  let parsed = {};

  xml2js.parseString(data, options, (err, result) => {
    parsed = result;
  });
  return parsed;
}

export default {loadRouteList, loadRouteConfig};
