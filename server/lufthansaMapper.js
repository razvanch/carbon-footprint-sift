'use strict';

const SUBJECT_ROUTE_REGEX = /.*?([A-Z]{3})-([A-Z]{3}).*/i;
const PROVIDER = 'lufthansa';

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
    }
  });

  return results;
};
