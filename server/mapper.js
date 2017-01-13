'use strict';

module.exports = function (got) {
  const inData = got['in'];

  let results = [];

  inData.data.map(function (datum) {
    const jmapInfo = JSON.parse(datum.value);

    const body = jmapInfo.strippedHtmlBody || jmapInfo.textBody || '';

    if (jmapInfo.subject.search(/british *airways/i) !== -1) {
      const regex = /Flight number.*?BA(\d{3,4})/i;

      var flightNumberGroup = regex.exec(body);

      if (flightNumberGroup && flightNumberGroup.length === 2) {
        var flightNumber = parseInt(flightNumberGroup[1]).toString();

        results.push({ name: 'flightNumbers',
                       key: jmapInfo.id,
                       value: 'BAW' + flightNumber });
      }
    }

    if (jmapInfo.subject.search(/opodo/i) !== -1) {
      const regex = /depart.*?\(([A-Z]{3})\).*?arriving.*?\(([A-Z]{3})\)/i;

      var routeGroup = regex.exec(body);

      if (routeGroup && routeGroup.length === 3) {
        results.push({ name: 'routes',
                       key: jmapInfo.id,
                       value: routeGroup[1] + '/' + routeGroup[2] });
      }
    }
  });

  return results;
};
