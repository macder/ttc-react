import axios from 'axios';

/**
 * Fetch a HTTP GET response
 * @param {string} url
 * @return {object} The response.
 */
export function* fetch (url) {
  console.log('fetchTest');
  let data = {};

  yield axios({
    method: 'get',
    url: url,
    responseType: 'text'
  })
    .then(function(response) {
      data = response.data;
  });
  // console.log(data);
  return data;
}

// export default {fetch}