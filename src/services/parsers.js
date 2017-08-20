import xml2js from 'xml2js';

/**
 * Parse an XML string into object.
 * @param {string} data - xml string.
 * @param {object} options - for xml2js
 * @return {object} The parsed object.
 */
export function parseXML(data, options) {
  let parsed = {};

  xml2js.parseString(data, options, (err, result) => {
    parsed = result;
  });
  return parsed;
}