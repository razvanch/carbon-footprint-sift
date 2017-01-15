import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';

export default class MyController extends SiftController {
  constructor() {
    super();
    this._suHandler = this.onStorageUpdate.bind(this);
  }

  loadView(state) {
    console.log('email-demo: loadView', state);

    this.storage.subscribe(['footprint', 'history'], this._suHandler);

    switch (state.type) {
      case 'email-thread':
        let w = 0;
        try {
          w = state.params.detail.words;
        }catch(e){ }
        return { html: 'email-thread.html', data: { words: w } };
      case 'summary':
        return { html: 'summary.html', data: this.getFootprint() };
      default:
        console.error('email-demo: unknown Sift type: ', state.type);
    }
  }

  onStorageUpdate(value) {
    console.log('email-demo: onStorageUpdate: ', value);

    if (value == 'footprint') {
      return this.getFootprint().then((footprint) => {
        this.publish('footprint', footprint);
      });
    } else {
      return this.getHistory().then((history) => {
        this.publish('history', history);
      })
    }
  }

  getFootprint() {
    return this.storage.get({
      bucket: 'footprint',
      keys: ['FOOTPRINT']
    }).then((values) => { 
      return { footprint: values[0].value || 0 };
    });
  }

  getHistory() {
    return this.storage.get({
      bucket: 'history',
      keys: ['HISTORY']
    }).then((values) => {
      return { history: values[0].value || {} };
    });
  }
}
registerSiftController(new MyController());
