import axios from 'axios';
// import { delay } from 'redux-saga'

/**
 * Fetch a HTTP GET response
 * @param {string} url
 * @return {object} The response.
 */
export function* httpGet (url) {
  let data = {};

  yield axios({
    method: 'get',
    url: url,
    responseType: 'text'
  })
    .then(function(response) {
      data = response.data;
  });
  // yield delay(3000);
  return data;
}
