import alt from 'altInstance';

class MlangStore {

    constructor () {

        this.multilang = {};//Immutable.Map({});

        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);

        this.bindListeners({});
    }

    bootstrap () {}

}

export default alt.createStore(MlangStore, 'MlangStore');
