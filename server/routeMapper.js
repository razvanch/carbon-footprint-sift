'use strict';


const footprints = require('./footprints.json');
const airports = require('./airports.json');

module.exports = function (got) {
  const inData = got['in'];

  var totalFootprints = 0;
  var history = [];

  inData.data.forEach((datum) => {
    const route = datum.value.toString().split('/');
    const provider = route[0];
    const source = route[1];
    const destination = route[2];
    const footprint = footprints[source][destination] || 0;

    totalFootprints += footprint;

    history.push({
      'source': {
        'code': source,
        'longitude': airports[source].longitude,
        'latitude': airports[source].latitude
      },
      'destination': {
        'code': destination,
        'longitude': airports[destination].longitude,
        'latitude': airports[destination].latitude
      },
      'footprint': footprint,
      'provider': provider
    });
  });

  return [{ name: 'footprint', key: 'FOOTPRINT', value: totalFootprints },
          { name: 'history', key: 'HISTORY', value: history }];
};
