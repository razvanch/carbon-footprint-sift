'use strict';


const routes = require('./routes.json');

module.exports = function (got) {
  const inData = got['in'];

  let results = [];

  inData.data.map(function (datum) {
    const values = datum.value.toString().split('/');
    const flightNumber = values[1]

    const route = routes[flightNumber] || null;

    if (route) {
      results.push({ name: 'routes',
                     key: datum.key,
                     value: values[0] + '/' + route.source + '/' + route.destination });
    }
  });

  return results;
};
