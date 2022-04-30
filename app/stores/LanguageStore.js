import Immutable from 'immutable';
import LanguageActions from 'actions/LanguageActions';
import { fromJSOrdered } from 'utils/immutableHelpers';
import LanguageWebAPIUtils from 'utils/LanguageWebAPIUtils';
import alt from 'altInstance';

class LanguageStore {

    constructor () {

        this.languages = []; //Immutable.Map({});
        this.home = [];
        this.pagedata = []; //Immutable.Map({});
        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);

        this.bindListeners({
            handleDeleteLanguage: LanguageActions.DELETELANGUAGESUCCESS,
            handleAddLanguage: LanguageActions.ADDLANGUAGESUCCESS,
            handleEditLanguage: LanguageActions.EDITLANGUAGESUCCESS,
            handleLanguages: LanguageActions.LANGUAGES
        });
    }

    bootstrap () {
        if (!Immutable.OrderedMap.isOrderedMap(this.pagedata)) {
            this.pagedata = fromJSOrdered(this.pagedata);
        }
        if (!Immutable.OrderedMap.isOrderedMap(this.languages)) {
            this.languages = fromJSOrdered(this.languages);
        }

    }

    handleAddLanguage (data) {
        if(data) {
            LanguageWebAPIUtils.getLanguages()
            .then((response, textStatus) => {
                if (response.status === 'success') {
                    this.languages = [];
                    this.languages = response.languages;
                    this.emitChange();
                }
            }, () => {
                // Dispatch another event for a bad request
            });
        }
    }

    handleEditLanguage (data) {
        if(data) {
            LanguageWebAPIUtils.getLanguages()
            .then((response, textStatus) => {
                if (response.status === 'success') {
                    this.languages = [];
                    this.languages = response.languages;
                    this.emitChange();
                }
            }, () => {
                // Dispatch another event for a bad request
            });
        }
    }

    handleDeleteLanguage (id) {
        if(id) {
            let languages = this.languages;
            for (let i = 0; i < languages.length; i++) {
                let language = languages[i];
                if (language._id === id) {
                    languages.splice(i, 1);
                    this.languages = [];
                    this.languages = languages;
                }
            }
        }
        this.emitChange();
    }

    handleLanguages (data) {
        this.languages = data;
        this.emitChange();
    }


}

export default alt.createStore(LanguageStore, 'LanguageStore');
