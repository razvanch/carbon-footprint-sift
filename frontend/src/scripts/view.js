import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';

import { html as geo } from '@redsift/d3-rs-geo';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';


function whiteLine(selection) {
    selection.attr('stroke', 'white') //set colour
             .attr('stroke-width', '1px') //set width
             .attr('stroke-dasharray', '5,3'); //set dash line
}

function displayText(selection) {
  selection.each(function(d, i) {  //parameters: d and i
    let node = select(this)     //select svg element
                 .selectAll('text') //select all the text
                 .data([ d ]);  //iterate through the data

    node = node.enter()  //indicates that data will be added to selection
               .append('text')   //add text
               .attr('stroke', 'white')  //style text
               .attr('stroke-width', '0.9px')
               .style('font-size', '10px')
               .merge(node);     //merge the text to a single array

    node.text(d[2]);      //get the third item in the array
  });
}


export default class MyView extends SiftView {
  constructor() {
    super();

    this.controller.subscribe('footprint', this.onFootprint.bind(this));
    this.controller.subscribe('history', this.onHistory.bind(this));

    this._zoomed = false;
    this._links = [];
    this._points = [];

    this._geo = geo('empty').onClick(this.onClick.bind(this));

    select('#map')
          .datum({ url: 'https://d3js.org/world-110m.v1.json' })
          .call(this._geo);
  }

  onClick(d, i, c) {
    const geo = this._geo;

    console.log(this._points);

    if (this._zoomed) {
      geo.zoom(1).zoomX(null).zoomY(null);
    } else {
      geo.zoom(4).zoomX(c[0]).zoomY(c[1]);
    }

    select('#map').transition().duration(750).call(geo);

    this._zoomed = !this._zoomed;
  }

  presentView(value) {
    console.log('email-demo: presentView: ', value);
    this.onFootprint(value.data);
  };

  willPresentView(value) {
    console.log('email-demo: willPresentView: ', value);
  };

  onFootprint(data) {
    console.log('email-demo: onFootprint: ', data);
    Object.keys(data).forEach((k) => {
      document.getElementById(k).textContent = data[k];
    });
  }

  onHistory(data) {
    const history = JSON.parse(data.history);

    console.log('email-demo: onHistory: ', history);

    var points = [];
    var links = [];

    history.forEach((flight) => {
      links.push([flight.source.longitude,
                  flight.source.latitude,
                  flight.destination.longitude,
                  flight.destination.latitude]);

      points.push([flight.source.longitude,
                   flight.source.latitude,
                   flight.source.code],
                  [flight.destination.longitude,
                   flight.destination.latitude,
                   flight.destination.code]);
    });

    this._links = links;
    this._points = points;

    this._geo.links(links)
             .linksDisplay(whiteLine)
             .points(points)
             .pointsDisplay(displayText);

    select('#map').call(this._geo);
  }
}

registerSiftView(new MyView(window));
