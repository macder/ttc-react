import axios from 'axios';

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
  return data;
}
