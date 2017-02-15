import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';

import { html as pies } from '@redsift/d3-rs-pies';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { presentation10, diagonals, patterns } from '@redsift/d3-rs-theme';

import '@redsift/ui-rs-hero';

import distances from './distances.json';


const BA_COLOR = '#1e5aaf';
const LUFTHANSA_COLOR = '#efae00';
const OPODO_COLOR = '#990000';

const EQUIVALENT_RATIOS = {
  km_personal_car: 6,
  km_public_transport: 12,
  computer: 32,
  plastic_bags: 5,
  plastic_bottles: 2,
  cheeseburgers: 0.33
};


export default class CarbonFootprintView extends SiftView {
  constructor() {
    super();

    this._totalFootprint = 0;

    this._pie = null;
    this._sizeClass = null;
    this._pieData = null;

    this.fill = {
      britishairways: {
        color: presentation10.standard[presentation10.names.blue],
        pattern: this.getPattern(presentation10.names.blue)
      },
      lufthansa: {
        color: presentation10.standard[presentation10.names.orange],
        pattern: this.getPattern(presentation10.names.orange)
      },
      opodo: {
        color: presentation10.standard[presentation10.names.red],
        pattern: this.getPattern(presentation10.names.red)
      },
      easyjet: {
        color: presentation10.standard[presentation10.names.yellow],
        pattern: this.getPattern(presentation10.names.yellow)
      }
    };

    transition();

    this.controller.subscribe('footprint', this.onFootprint.bind(this));
    this.controller.subscribe('history', this.onHistory.bind(this));
  }

  presentView(value) {
    this._sizeClass = value.sizeClass.current;

    console.log('email-demo: presentView: ', value);

    if (value.data) {
      this.onFootprint(value.data[0]);
      this.onHistory(value.data[1]);
      this.updateSections(this._sizeClass);
    }
  };

  willPresentView(value) {
    console.log('email-demo: willPresentView: ', value);
  };

  onFootprint(data) {
    console.log('email-demo: onFootprint: ', data);

    this._totalFootprint = data.footprint;

    document.getElementById('footprint').textContent = this._totalFootprint;
  }

  onHistory(data) {
    const history = JSON.parse(data.history);

    console.log('email-demo: onHistory: ', history);

    let averageFootprint = 0;
    let totalDistance = 0;
    let totalFlights = history.length;

    let companyFootprints = {
      britishairways: 0,
      lufthansa: 0,
      opodo: 0,
      easyjet: 0
    };

    history.forEach((flight) => {
      const source = flight.source.code;
      const destination = flight.destination.code;

      if (distances[source]) {
        totalDistance += distances[source][destination] || 0;
      }

      averageFootprint += flight.footprint / totalFlights;
      companyFootprints[flight.provider] += flight.footprint;
    });

    this._pieData = [companyFootprints.britishairways,
                     companyFootprints.lufthansa,
                     companyFootprints.opodo,
                     companyFootprints.easyjet];

    this.updateStats(totalFlights, Math.round(averageFootprint), totalDistance);
    this.updateEquivalentStats(this._totalFootprint);
    this.callPie(this._pieData, this._sizeClass);
  }

  updateSections(sizeClass) {
    let show = 'none';

    if (!sizeClass.height || sizeClass.height === 520) {
      show = '';
    }

    document.getElementById('airlines-period').style.display = show;
    document.getElementById('facts').style.display = show;
  }

  updateStats(totalFlights, averageFootprint, totalDistance) {
    if (totalFlights) {
      document.getElementById('flightscount-period').textContent = '' + totalFlights;
    }

    if (averageFootprint) {
      document.getElementById('averagefootprint-period').textContent = '' + averageFootprint;
    }

    if (totalDistance) {
      document.getElementById('totaldistance-period').textContent = totalDistance;
    }
  }

  updateEquivalentStats(totalFootprint) {
    if (!totalFootprint) {
      return;
    }

    Object.keys(EQUIVALENT_RATIOS).forEach((id) => {
      document.getElementById(id).textContent = Math.round(this._totalFootprint * EQUIVALENT_RATIOS[id]);
    });
  }

  callPie(data, sizeClass) {    
    let margin = 26;
    let height = 300;
    let legend = ['British Airways', 'Lufthansa', 'Opodo', 'EasyJet'];

    if (sizeClass.width === 230) {
      margin = 13;
      height = 200;
    }

    if (sizeClass.height === 230) {
      height = 200;
    }

    let width = document.getElementById('stats-period').clientWidth - (2 * margin);
    let chartContainer = select('#pie').datum(data);

    if (this._pie) {
      chartContainer.transition()
                    .call(this.getPieChart(width, height, margin, legend));
    }
    else {
      chartContainer.call(this.getPieChart(width, height, margin, legend))
                    .select('svg')
                    .call(this.fill.britishairways.pattern)
                    .call(this.fill.lufthansa.pattern)
                    .call(this.fill.opodo.pattern)
                    .call(this.fill.easyjet.pattern);
    }
  }

  getPieChart(width, height, margin, legend) {
    if (!this._pie) {
      // Create a base one if one doesn't already exist
      this._pie = pies().fill([this.fill.britishairways.color,
                               this.fill.lufthansa.color,
                               this.fill.opodo.color,
                               this.fill.easyjet.color])
                        .displayValue((v) => {
                          if (!this._totalFootprint || !this._pieData) {
                            return 'Connect your email!';
                          }

                          return (100 * v / this._totalFootprint).toFixed(0) + '%';
                        });
    }

    return this._pie.width(width).height(height).outerRadius(height / 3).legend(legend).margin(margin);
  }

  getPattern(color) {
    let p = diagonals('highlight-fill-' + color, patterns.diagonal1);
    p.foreground(presentation10.lighter[color]);
    p.background(presentation10.darker[color]);
    return p;
  }
}

registerSiftView(new CarbonFootprintView(window));
