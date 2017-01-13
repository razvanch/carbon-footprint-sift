'use strict';

const ROUTE_REGEX = /depart.*?\(([A-Z]{3})\).*?arriving.*?\(([A-Z]{3})\)/i;

module.exports = function (got) {
  const inData = got['in'];

  let results = [];

  inData.data.map(function (datum) {
    const jmapInfo = JSON.parse(datum.value);

    const body = jmapInfo.strippedHtmlBody || jmapInfo.textBody || '';

    var routeGroup = ROUTE_REGEX.exec(body);

    if (routeGroup && routeGroup.length === 3) {
      results.push({ name: 'routes',
                     key: jmapInfo.id,
                     value: routeGroup[1] + '/' + routeGroup[2] });
    }
  });

  return results;
};
