import axios from 'axios';
// import { delay } from 'redux-saga'

/**
 * Fetch a HTTP GET response
 * @param {string} url
 * @return {object} The response.
 */
export function* httpGet(url) {
  let data = {};

  yield axios({
    method: 'get',
    url,
    responseType: 'text',
  })
    .then((response) => {
      data = response.data;
    });
  // yield delay(1200);
  return data;
}
