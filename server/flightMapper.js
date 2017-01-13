'use strict';


const routes = require('./baw_routes.json');

module.exports = function (got) {
  const inData = got['in'];

  let results = [];

  inData.data.map(function (datum) {
    const flightNumber = datum.value.toString();

    const route = routes[flightNumber] || null;

    if (route) {
      results.push({ name: 'routes',
                     key: datum.key,
                     value: route.source + '/' + route.destination });
    }
  });

  return results;
};
