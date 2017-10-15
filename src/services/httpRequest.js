import axios from 'axios';
// import { delay } from 'redux-saga'

/**
 * Fetch a HTTP GET response
 * @param {string} url
 * @return {object} The response.
 */
export default function* httpGet(url) {
  // yield delay(1200);
  return yield axios({
    method: 'get',
    url,
    responseType: 'json',
  }).then(response => response.data);
}
