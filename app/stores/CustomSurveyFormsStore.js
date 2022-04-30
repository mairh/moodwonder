import Immutable from 'immutable';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import { fromJSOrdered } from 'utils/immutableHelpers';
import alt from 'altInstance';

class CustomSurveyFormsStore {

    constructor () {

        this.forms = []; // Immutable.Map({});
        this.formid = '';
        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);


        this.bindListeners({
            handleSurveyForms: CustomSurveyActions.SURVEYFORMS,
            handleDeleteAForm: CustomSurveyActions.DELETEAFORM
        });
    }

    bootstrap () {
        if (!Immutable.OrderedMap.isOrderedMap(this.forms)) {
            this.forms = fromJSOrdered(this.forms);
        }
    }

    handleSurveyForms (data) {
        this.forms = data;
        this.emitChange();
    }

    handleDeleteAForm (id) {
        this.formid = id;
        this.emitChange();
    }

}

// Export our newly created Store
export default alt.createStore(CustomSurveyFormsStore, 'CustomSurveyFormsStore');
