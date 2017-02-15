'use strict';

const FLIGHT_NUMBER_REGEX = /Flight number.*?BA(\d{3,4})/i;
const SUBJECT_ROUTE_REGEX = /.*?([A-Z]{3})-([A-Z]{3}).*/i;
const PROVIDER = 'britishairways';

module.exports = function (got) {
  const inData = got['in'];

  let results = [];

  inData.data.map(function (datum) {
    const jmapInfo = JSON.parse(datum.value);

    var routeGroup = SUBJECT_ROUTE_REGEX.exec(jmapInfo.subject);

    if (routeGroup && routeGroup.length === 3) {
      results.push({ name: 'routes',
                     key: jmapInfo.id,
                     value: PROVIDER + '/' + routeGroup[1] + '/' + routeGroup[2] });

      return;
    }

    const body = jmapInfo.strippedHtmlBody || jmapInfo.textBody || '';

    var flightNumberGroup = FLIGHT_NUMBER_REGEX.exec(body);

    if (flightNumberGroup && flightNumberGroup.length === 2) {
      var flightNumber = parseInt(flightNumberGroup[1]).toString();

      results.push({ name: 'flightNumbers',
                     key: jmapInfo.id,
                     value: PROVIDER + '/' + 'BAW' + flightNumber });
    }
  });

  return results;
};
