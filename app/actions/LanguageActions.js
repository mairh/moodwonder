import alt from 'altInstance';
import LanguageWebAPIUtils from 'utils/LanguageWebAPIUtils';

class LanguageActions {

    addLanguage (data) {
        this.dispatch();
        LanguageWebAPIUtils.addLanguage(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.addlanguagesuccess(true);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    addlanguagesuccess (data) {
        this.dispatch(data);
    }

    editLanguage (id, data) {
        this.dispatch();
        LanguageWebAPIUtils.editLanguage(id, data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.editlanguagesuccess(true);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    editlanguagesuccess (data) {
        this.dispatch(data);
    }

    getLanguages () {
        this.dispatch();
        LanguageWebAPIUtils.getLanguages()
        .then((response, textStatus) => {
            if (response.status === 'success') {
                this.actions.languages(response.languages);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    languages (data) {
        this.dispatch(data);
    }

    deleteLanguage (id) {
        this.dispatch();
        LanguageWebAPIUtils.deleteLanguage(id)
        .then((response, textStatus) => {
            if (response.status === 'success') {
                this.actions.deletelanguagesuccess(id);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    deletelanguagesuccess (id) {
        this.dispatch(id);
    }

}

export default alt.createActions(LanguageActions);
