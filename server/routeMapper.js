'use strict';


const footprints = require('./footprints.json');

module.exports = function (got) {
  const inData = got['in'];

  let totalFootprints = inData.data
    .map(function (datum) {
      const route = datum.value.toString().split('/');
      const source = route[0];
      const destination = route[1];
      
      return footprints[source][destination] || 0;
    })
    .reduce((total, footprint) => total + footprint, 0);

  return [{ name: 'footprint', key: 'FOOTPRINT', value: totalFootprints }];
};
