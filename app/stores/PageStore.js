import Immutable from 'immutable';
import PageActions from 'actions/PageActions';
import { fromJSOrdered } from 'utils/immutableHelpers';
import alt from 'altInstance';

class PageStore {

    constructor () {

        this.languages = [];//Immutable.Map({});
        this.home = [];
        this.pagedata = []; //Immutable.Map({});
        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);

        this.bindListeners({
            handleLanguages: PageActions.LANGUAGES,
            handlePage: PageActions.PAGESUCCESS
        });
    }

    bootstrap () {
        if (!Immutable.OrderedMap.isOrderedMap(this.pagedata)) {
            this.pagedata = fromJSOrdered(this.pagedata);
        }
    }

    handleLanguages (data) {
        this.languages = [];
        for (let lng of data) {
            this.languages.push(lng.code);
        }
        this.emitChange();
    }

    handlePage (data) {
        this.pagedata = data;
        this.emitChange();
    }

}

// Export our newly created Store
export default alt.createStore(PageStore, 'PageStore');
