import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';

export default class MyView extends SiftView {
  constructor() {
    super();

    this.controller.subscribe('footprint', this.onFootprint.bind(this));
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
}

registerSiftView(new MyView(window));
