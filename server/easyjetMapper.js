'use strict';

const FLIGHT_NUMBER_REGEX = /EZY(\d{3,4})/i;
const PROVIDER = 'easyjet';

module.exports = function (got) {
  const inData = got['in'];

  let results = [];

  inData.data.map(function (datum) {
    const jmapInfo = JSON.parse(datum.value);

    const body = jmapInfo.strippedHtmlBody || jmapInfo.textBody || '';

    var flightNumberGroup = FLIGHT_NUMBER_REGEX.exec(body);

    if (flightNumberGroup && flightNumberGroup.length === 2) {
      var flightNumber = parseInt(flightNumberGroup[1]).toString();

      results.push({ name: 'flightNumbers',
                     key: jmapInfo.id,
                     value: PROVIDER + '/' + 'EZY' + flightNumber });
    }
  });

  return results;
};
